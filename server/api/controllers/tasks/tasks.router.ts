import * as express from 'express';
import controller from './tasks.controller';
import validator from './tasks.validator';
import * as expressValidator from 'express-validator';

export default express.Router()
    .use(expressValidator())
    .get('/', controller.getAllTasks)
    .get('/:id', validator.validateID, controller.getTaskByID)
    .post('/', validator.validateTask, controller.createTask)
    .put('/:id', validator.validateID, controller.updateTask)
    .delete('/:id', validator.validateID, controller.deleteTask);