import type { DotaGSIClient } from "./dotagsi.types.ts";


declare global {
	namespace Express {
		interface Request {
			client?: DotaGSIClient
		}
	}
}