import { Router } from "express"
import { AuthenticateClientController } from "./modules/account/authenticateClient/authenticateClientController"
import { CreateClientController } from "./modules/clients/useCases/createClient/createClientController"
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController"
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/authenticateDeliverymanController"
import { CreateDeliveryController } from "./modules/deliveries/UseCases/createDelivery/CreateDeliveryController"
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient"
import { FindAllAvailableController } from "./modules/deliveries/UseCases/findAllAvailable/findAllAvailableController"
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman"

const routes = Router()

const authenticateClientController = new AuthenticateClientController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()

const createClientController = new CreateClientController()
const createDeliverymanController = new CreateDeliverymanController()
const createDeliveryController = new CreateDeliveryController()

const findAllAvailableController = new FindAllAvailableController

routes.post('/client/authenticate', authenticateClientController.handle)
routes.post('/deliveryman/authenticate', authenticateDeliverymanController.handle)

routes.post('/client/', createClientController.handle)
routes.post('/deliveryman/', createDeliverymanController.handle)
routes.post('/delivery/', ensureAuthenticateClient, createDeliveryController.handle)

routes.get('/delivery/available', ensureAuthenticateDeliveryman, findAllAvailableController.handle)

export {routes}