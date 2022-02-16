import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt"

interface ICreateDeliveryman {
    username: string,
    password: string
}

export class CreateDeliverymanUseCase {
    async execute({password, username}: ICreateDeliveryman) {
    
        //VERIFICANDO SE O NOVO USERNAME JÁ EXISTE
        const deliverymanExist = await prisma.deliveryman.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive"
                }
            }
        })

        //Tratando usuário já existente
        if(deliverymanExist){
            throw new Error("Deliveryman already exists!");
        }

        //CRIPTOGRAFANDO SENHA
        const hashPassword = await hash(password, 10)

        //CRIANDO NOVO DELIVERYMAN
        const deliveryman = await prisma.deliveryman.create({
            data: {
                username,
                password: hashPassword
            }
        })

        return deliveryman
    }
}