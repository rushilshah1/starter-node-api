import { Application } from 'express';
import examplesRouter from './api/controllers/examples/router'
import taskRouter from './api/controllers/tasks/tasks.router'
import usersRouter from './api/controllers/users/users.router';


const bodyParser = require('body-parser');

export default function routes(app: Application): void {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use('/api/v1/examples', examplesRouter);
  app.use('/api/v1/tasks', taskRouter);
  app.use('/api/v1/users', usersRouter);
};