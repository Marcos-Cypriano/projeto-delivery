import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
    sub: string
}

export async function ensureAuthenticateDeliveryman(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({
            message: "Token missing!"
        })
    }

    const [, token ] = authHeader.split(' ')

    try {
        const { sub }  = verify(token, "f58fd21e84af505a65b83bc7217b3090") as IPayload
        
        req.id_deliveryman = sub

        return next()

    } catch {
        return res.status(401).json({
            message: "Invalid token!"
        })
    }
}