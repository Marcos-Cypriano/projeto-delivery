//Facilitar importação em outros arquivos
import { PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

export { prisma }