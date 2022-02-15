import { Router } from "express"
import { AuthenticateClientController } from "./modules/account/authenticateClient/authenticateClientController"
import { CreateClientController } from "./modules/clients/useCases/createClient/createClientController"
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController"
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/authenticateDeliverymanController"

const routes = Router()

const authenticateClientController = new AuthenticateClientController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()
const createClientController = new CreateClientController()
const createDeliverymanController = new CreateDeliverymanController()

routes.post('/client/authenticate', authenticateClientController.handle)
routes.post('/deliveryman/authenticate', authenticateDeliverymanController.handle)
routes.post('/client/', createClientController.handle)
routes.post('/deliveryman/', createDeliverymanController.handle)

export {routes}