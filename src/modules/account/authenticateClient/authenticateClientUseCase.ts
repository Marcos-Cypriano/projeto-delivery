import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"


interface IAuthtenticateClient {
    username: String,
    password: String
}

export class AuthenticateClientUseCase {
    async execute({username, password}: IAuthtenticateClient) {
        //Recebendo username e password
        

        //Verificar se o username é cadastrado
        const client = await prisma.clients.findFirst({
            where: {
                username
            }
        })

        if (!client) {
            throw new Error("Invalid username!")
        }

        //Verificando senha
        const passwordMatch = await compare(password, client.password)

        if (!passwordMatch) {
            throw new Error("Invalid password!")
        }

        //Gerar token
        const token = sign({username}, "f58fd21e84af505a58b83bc7217b3090", {
            subject: client.id,
            expiresIn: "1d"
        })

        return token
    }
}