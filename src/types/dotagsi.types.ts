import type { Request } from "express"
import type { GSIEvent } from "./gsi-structure.js"
import type { DeepPartial } from "../utils/diff.js"

export type DotaGSIClient = {
    auth: string
    state?: GSIEvent
    changes?: DeepPartial<GSIEvent> | undefined
}

export type DotaGSIClients = Record<string, DotaGSIClient>

export interface DotaGSIConfig {
    port?: number
    clientTokens?: string[]
}

export type DotaGSIInterface = {}


export type RequestWithDotaGSIClient = Request & {
    client: DotaGSIClient
}

export type GSIEventMask<T> = {
    [K in keyof T]?: T[K] extends object
    ? GSIEventMask<T[K]>
    : boolean
}
