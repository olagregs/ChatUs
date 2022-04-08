import { Router } from 'express';

import { CreateUsersController } from './src/controller/CreateUsersController';
import { CreateMessagesController } from './src/controller/CreateMessagesController';
import { ListMessagesController } from './src/controller/ListMessagesController';
import { CreateSettingsController } from './src/controller/CreateSettingsController';
import { ListSettingsController } from './src/controller/ListSettingsController';
import { CreateConnectionsController } from './src/controller/CreateConnectionsController';
import { ListUsersController } from './src/controller/ListUsersController';
import { UpdateSocketIdController } from './src/controller/UpdateSocketIdController';
import { FindConnectionsController } from './src/controller/FindConnectionsController';

const routes = Router();

const createUsersController = new CreateUsersController();
const createMessagesController = new CreateMessagesController();
const listMessagesController = new ListMessagesController();
const createSettingsController = new CreateSettingsController();
const listSettingsController = new ListSettingsController();
const createConnectionsController = new CreateConnectionsController();
const listUsersController = new ListUsersController();
const updateSocketIdController = new UpdateSocketIdController();
const findConnectionsController = new FindConnectionsController();

routes.post("/users", createUsersController.execute);
routes.get("/users", listUsersController.execute);

routes.post("/messages", createMessagesController.execute);
routes.get("/messages/:user_id", listMessagesController.execute);

routes.post("/settings", createSettingsController.execute);
routes.get("/settings/:user", listSettingsController.execute);

routes.post("/connections", createConnectionsController.execute);
routes.patch("/connections", updateSocketIdController.execute);
routes.get("/connections/list", findConnectionsController.execute);

export { routes }