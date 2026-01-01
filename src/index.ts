import EventEmitter from 'node:events'
import bodyParser from 'body-parser'
import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import winston, { format } from 'winston'
import type { DotaGSIClients, DotaGSIConfig, DotaGSIInterface } from './types/dotagsi.types.js'
import { diffObjects, type DeepPartial } from './utils/diff.js'
import type { GSIEvent } from './types/gsi-structure.js'


type SubscriptionMask<T> = {
	[K in keyof T]?: T[K] extends object ? SubscriptionMask<T[K]> | true : boolean
}

export class DotaGSI implements DotaGSIInterface {
	private readonly emitter = new EventEmitter()
	private readonly server: Express

	private readonly logger: winston.Logger = winston.createLogger({
		transports: [new winston.transports.Console()],
		format: format.combine(format.splat(), format.simple(), format.colorize()),
	})

	private readonly config: DotaGSIConfig = {}
	private clients: DotaGSIClients = {}

	constructor(config: DotaGSIConfig) {
		this.config.port = config.port ?? 3000
		this.server = express()
		this.initServer()
	}

	private defaultServerStartCallback(error?: Error | undefined) {
		if (error) {
			this.logger.error(`Error while starting the server - ${error}`)
			throw error
		}
		this.logger.info(`DotaGSI server successfully started on ${this.config.port} port`)
	}

	private initServer(onServerStart?: (error?: Error | undefined) => void) {
		const serverStartCallback = onServerStart ?? this.defaultServerStartCallback
		const port = this.config.port

		this.server.use(bodyParser.json())
		this.server.use(bodyParser.urlencoded({ extended: true }))

		this.server.post(
			'/',
			this.authMiddleware.bind(this),
			this.registerClientMiddleware.bind(this),
			this.handleStateChangesMiddleware.bind(this),
			(req: Request) => {

			},
		)

		this.server.listen(port, serverStartCallback.bind(this))
	}

	private authMiddleware(req: Request, res: Response, next: NextFunction) {
		const requestToken = req.body.auth?.token
		if (!this.config.clientTokens) return next()
		if (!requestToken || !this.config.clientTokens.includes(requestToken)) {
			this.logger.debug('A request with an invalid token was received.')
			res.end()
			return
		}
		next()
	}

	private registerClientMiddleware(req: Request, res: Response, next: NextFunction) {
		const clientIp = req.ip
		const clientAuth = req.body.auth
		if (!clientIp) return next()

		const existedClient = this.clients[clientIp]

		if (existedClient) {
			req.client = existedClient
			return next()
		}

		this.clients[clientIp] = { auth: clientAuth }
		req.client = this.clients[clientIp]

		this.logger.info(`New DotaGSI client connected; IP - ${clientIp}`)
		next()
	}

	private handleStateChangesMiddleware(req: Request, res: Response, next: NextFunction) {
		const client = req.client
		if (!client) {
			this.logger.error(`Client with IP ${req.ip} was not registered`)
			res.status(500).send(`Client with IP ${req.ip} was not registered`)
			return
		}

		const newState: GSIEvent = structuredClone(req.body)
		const previousState = client.state

		if (previousState) {
			const changes = diffObjects(previousState, newState)
			client.changes = changes
			if (changes) {
				this.emitter.emit('changes', changes)
			}
		}

		client.state = newState
		next()
	}

	/**
	 * Подписка на изменения по маске
	 * @param mask - объект с булевыми значениями, повторяющий структуру GSIEvent
	 * @param listener - callback для изменений
	 */
	public on(mask: SubscriptionMask<GSIEvent>, listener: (changes: DeepPartial<GSIEvent>) => void) {
		this.emitter.on('changes', (changes: DeepPartial<GSIEvent>) => {
			const filtered = this.filterChanges(changes, mask)
			if (filtered && Object.keys(filtered).length > 0) {
				listener(filtered)
			}
		})
	}

	/**
	 * Фильтруем изменения по маске
	 */
	filterChanges<T extends Record<string, any>>(
		changes: DeepPartial<T>,
		mask: SubscriptionMask<T>
	): DeepPartial<T> | undefined {
		const result: Record<string, any> = {}

		for (const key in mask) {
			const maskValue = mask[key]
			const changeValue = changes[key]

			if (changeValue === undefined) continue

			if (maskValue === true) {
				// отдаём всё, что есть в changes[key], примитив или объект
				result[key] = changeValue
			} else if (typeof maskValue === 'object' && maskValue !== null) {
				if (typeof changeValue === 'object' && changeValue !== null) {
					const nested = this.filterChanges(changeValue, maskValue)
					if (nested && Object.keys(nested).length > 0) {
						result[key] = nested
					}
				}
			}
		}

		return Object.keys(result).length > 0 ? (result as DeepPartial<T>) : undefined
	}
}
