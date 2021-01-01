import { Router } from 'express';

import UserController from './app/controllers/UserController';
import LoginController from './app/controllers/LoginController';
import PetController from './app/controllers/PetController';

import authMiddeleware from './app/middelwares/auth';

const routes = new Router();

routes.post('/user', UserController.store);
routes.put('/change-password/:id', UserController.update);
routes.post('/login', LoginController.store);

routes.post('/pet', authMiddeleware, PetController.store);
routes.get('/pets', authMiddeleware, PetController.petForUser);

export default routes;