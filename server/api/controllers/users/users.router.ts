import * as express from 'express';
import controller from './users.controller';

export default express.Router()
    .get('/', controller.getAllUsers)
    .post('/', controller.createUser)
    .put('/:id', controller.updateUser)
    .delete('/:id', controller.removeUser);