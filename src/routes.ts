import { Router } from "express"

import { CreateClientController } from "./modules/clients/useCases/createClient/createClientController"
import { AuthenticateClientController } from "./modules/account/authenticateClient/authenticateClientController"
import { FindAllDeliveriesController } from "./modules/clients/useCases/deliveries/findAllDeliveriesController"
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient"

import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController"
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/authenticateDeliverymanController"
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman"

import { CreateDeliveryController } from "./modules/deliveries/UseCases/createDelivery/CreateDeliveryController"
import { FindAllAvailableController } from "./modules/deliveries/UseCases/findAllAvailable/findAllAvailableController"
import { FindAllDeliveriesDeliverymanController } from "./modules/deliveryman/useCases/deliveries/FindAllDeliveriesDeliverymanController"
import { UpdateDeliverymanController } from "./modules/deliveries/UseCases/updateDeliveryman/UpdateDeliverymanController"
import { UpdateEndDateController } from "./modules/deliveries/UseCases/updateEndDate/UpdateEndDateController"

const routes = Router()

//Client
const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()
const findAllDeliveriesClient = new FindAllDeliveriesController()

//Deliveryman
const createDeliverymanController = new CreateDeliverymanController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()

//Delivery
const createDeliveryController = new CreateDeliveryController()
const findAllAvailableController = new FindAllAvailableController()
const findAllDeliveriesDeliveryman = new FindAllDeliveriesDeliverymanController()
const updateDeliverymanController = new UpdateDeliverymanController()
const updateEndDateController = new UpdateEndDateController()


//Client
routes.post('/client/', createClientController.handle)
routes.post('/client/authenticate', authenticateClientController.handle)
routes.get('/client/deliveries', ensureAuthenticateClient, findAllDeliveriesClient.handle)

//Deliveryman
routes.post('/deliveryman/', createDeliverymanController.handle)
routes.post('/deliveryman/authenticate', authenticateDeliverymanController.handle)
routes.get('/deliveryman/deliveries', ensureAuthenticateDeliveryman, findAllDeliveriesDeliveryman.handle)

//Delivery
routes.post('/delivery/', ensureAuthenticateClient, createDeliveryController.handle)
routes.get('/delivery/available', ensureAuthenticateDeliveryman, findAllAvailableController.handle)
routes.put('/delivery/updateDeliveryman/:id', ensureAuthenticateDeliveryman, updateDeliverymanController.handle)
routes.put('/delivery/updateEndDate/:id', ensureAuthenticateDeliveryman, updateEndDateController.handle)


export {routes}