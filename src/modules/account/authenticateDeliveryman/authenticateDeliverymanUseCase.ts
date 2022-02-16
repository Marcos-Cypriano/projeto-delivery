import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"


interface IAuthtenticateDeliveryman {
    username: string,
    password: string
}

export class AuthenticateDeliverymanUseCase {
    async execute({username, password}: IAuthtenticateDeliveryman) {
        //Recebendo username e password
        

        //Verificar se o username é cadastrado
        const deliveryman = await prisma.deliveryman.findFirst({
            where: {
                username
            }
        })

        //Tratando usuário não cadastrado
        if (!deliveryman) {
            throw new Error("Invalid username!")
        }

        //Verificando senha
        const passwordMatch = await compare(password, deliveryman.password)

        if (!passwordMatch) {
            throw new Error("Invalid password!")
        }

        //Gerar token
        const token = sign({username}, "f58fd21e84af505a65b83bc7217b3090", {
            subject: deliveryman.id,
            expiresIn: "1d"
        })

        return token
    }
}