import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

//Forçar o sub a ser uma string
interface IPayload {
    sub: string
}

export async function ensureAuthenticateClient(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    //Tratando falta do token
    if (!authHeader) {
        return res.status(401).json({
            message: "Token missing!"
        })
    }

    const [, token ] = authHeader.split(' ')

    //Verificando validade do token
    try {
        const { sub }  = verify(token, "f58fd21e84af505a58b83bc7217b3090") as IPayload
        
        req.id_client = sub

        return next()

    } catch {
        return res.status(401).json({
            message: "Invalid token!"
        })
    }
}