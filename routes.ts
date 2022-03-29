import { Router } from 'express';

import { CreateUsersController } from './src/controller/CreateUsersController';
import { CreateMessagesController } from './src/controller/CreateMessagesController';
import { ListMessagesController } from './src/controller/ListMessagesController';
import { CreateSettingsController } from './src/controller/CreateSettingsController';
import { ListSettingsController } from './src/controller/ListSettingsController';

const routes = Router();

const createUsersController = new CreateUsersController();
const createMessagesController = new CreateMessagesController();
const listMessagesController = new ListMessagesController();
const createSettingsController = new CreateSettingsController();
const listSettingsController = new ListSettingsController();


routes.post("/users", createUsersController.execute);

routes.post("/messages", createMessagesController.execute);
routes.get("/messages/:user_id", listMessagesController.execute);

routes.post("/settings", createSettingsController.execute);
routes.get("/settings/:user", listSettingsController.execute);

export { routes }