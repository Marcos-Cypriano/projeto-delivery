import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt"


interface ICreateClient {
    username: String,
    password: String
}

export class CreateClientUseCase {
    async execute({password, username}: ICreateClient) {
    
        //VERIFICANDO SE O NOVO USERNAME JÁ EXISTE
        const clientExist = await prisma.clients.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive"
                }
            }
        })

        if(clientExist){
            throw new Error("Client already exists!");
        }

        //CRIPTOGRAFANDO SENHA
        const hashPassword = await hash(password, 10)

        //CRIANDO NOVO CLIENT
        const client = await prisma.clients.create({
            data: {
                username,
                password: hashPassword
            }
        })

        return client
    }
}