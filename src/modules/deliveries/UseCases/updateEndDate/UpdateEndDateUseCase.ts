import { prisma } from "../../../../database/prismaClient"

prisma

interface IUpdateEndDate {
    id_delivery: string,
    id_deliveryman: string
}

export class UpdateEndDateUseCase {
    async execute({ id_delivery, id_deliveryman}: IUpdateEndDate) {
        const result = await prisma.deliveries.updateMany({
            where: {
                id: id_delivery,
                id_deliveryman
            },
            data: {
                end_at: new Date()
            }
        })

        //Melhorando o retorno da função
        if (result.count > 0) {
            const delivery = prisma.deliveries.findFirst({
                where: {
                    id: id_delivery
                }
            })
            return delivery

        } else {
            throw new Error('Check your parameters, delivery not updated!')

        }     
    }
}