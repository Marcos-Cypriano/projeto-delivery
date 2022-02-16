import { Router } from "express"
import { AuthenticateClientController } from "./modules/account/authenticateClient/authenticateClientController"
import { CreateClientController } from "./modules/clients/useCases/createClient/createClientController"
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController"
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/authenticateDeliverymanController"
import { CreateDeliveryController } from "./modules/deliveries/UseCases/createDelivery/CreateDeliveryController"
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient"
import { FindAllAvailableController } from "./modules/deliveries/UseCases/findAllAvailable/findAllAvailableController"
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman"
import { UpdateDeliverymanController } from "./modules/deliveries/UseCases/updateDeliveryman/UpdateDeliverymanController"
import { FindAllDeliveriesController } from "./modules/clients/useCases/deliveries/findAllDeliveriesController"

const routes = Router()

//Client
const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()
const findAllDeliveriesClient = new FindAllDeliveriesController()

//Deliveryman
const createDeliverymanController = new CreateDeliverymanController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()
const updateDeliverymanController = new UpdateDeliverymanController()

//Delivery
const createDeliveryController = new CreateDeliveryController()
const findAllAvailableController = new FindAllAvailableController()


//Client
routes.post('/client/', createClientController.handle)
routes.post('/client/authenticate', authenticateClientController.handle)
routes.get('/client/deliveries', ensureAuthenticateClient, findAllDeliveriesClient.handle)

//Deliveryman
routes.post('/deliveryman/', createDeliverymanController.handle)
routes.post('/deliveryman/authenticate', authenticateDeliverymanController.handle)

//Delivery
routes.post('/delivery/', ensureAuthenticateClient, createDeliveryController.handle)
routes.get('/delivery/available', ensureAuthenticateDeliveryman, findAllAvailableController.handle)
routes.put('/delivery/updateDeliveryman/:id', ensureAuthenticateDeliveryman, updateDeliverymanController.handle)


export {routes}