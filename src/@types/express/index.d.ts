//Adicionando informação/propriedade no Request
declare namespace Express {
    export interface Request {
        id_client: string,
        id_deliveryman: string
    }
}