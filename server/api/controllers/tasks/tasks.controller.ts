import TaskService from '../../services/tasks.service'
import { Task } from '../../../model/Task';
import { Request, Response } from 'express';
import commonService from '../../../common/common.service';
import { ABError } from '../../../model/ABError';

export class Controller {

  async getAllTasks(req: Request, res: Response) {
    try {
      const taskList: Array<Task> = await TaskService.getTasks();
      res.send(taskList);
    } catch (err) { commonService.handleError(err, res); }
  }

  async getTaskByID(req: Request, res: Response) {
    try {
      const task: Task = await TaskService.getTaskByID(req.params.id);
      res.send(task);
    } catch (err) { commonService.handleError(err, res); }
  }

  async createTask(req: Request, res: Response) {
    try {
      const task: Task = new Task({ "name": req.body.name, "description": req.body.description, "completed": req.body.completed });
      const newTask: Task = await TaskService.createTask(task);
      res.send(newTask);
    } catch (err) {
      const abErr = new ABError({"message": err.message,"status": 409, "error": err.message});
      commonService.handleError(abErr, res);
    } 
  }

  async updateTask(req: Request, res: Response) {
    try {
      const task: Task = new Task({ "name": req.body.name, "description": req.body.description, "completed": req.body.completed });
      const updateTask: Task = await TaskService.updateTask(req.params.id, task);
      res.send(updateTask);
    } catch (err) { commonService.handleError(err, res); }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const task: Task = await TaskService.deleteTask(req.params.id);
      res.send(task);
    } catch (err) { commonService.handleError(err, res); }
  }

}
export default new Controller();