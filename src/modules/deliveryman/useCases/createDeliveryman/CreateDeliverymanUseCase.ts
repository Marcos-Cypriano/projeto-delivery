import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt"

interface ICreateDeliveryman {
    username: String,
    password: String
}

export class CreateDeliverymanUseCase {
    async execute({password, username}: ICreateDeliveryman) {
    
        //VERIFICANDO SE O NOVO USERNAME JÁ EXISTE
        const deliverymanExist = await prisma.deliveryman.findFirst({
            where: {
                username: {
                    mode: "insensitive"
                }
            }
        })

        if(deliverymanExist){
            throw new Error("Deliveryman already exists!");
        }

        //CRIPTOGRAFANDO SENHA
        const hashPassword = await hash(password, 10)

        //CRIANDO NOVO CLIENT
        const deliveryman = await prisma.deliveryman.create({
            data: {
                username,
                password: hashPassword
            }
        })

        return deliveryman
    }
}