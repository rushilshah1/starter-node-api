import { MongooseDocument } from "mongoose";
import { prop, Typegoose, ModelType, InstanceType } from 'typegoose';
import TaskModel, { Task } from '../../model/Task';
import { ABError } from './../../model/ABError';

export class TaskService {
    /* Uses Mongoose for simple queries */
    async getTasks(): Promise<Array<Task>> {
        const taskList: Array<Task> = await TaskModel.find({});
        return taskList;
    }

    async getTaskByID(id: string): Promise<Task> {
        const task: Task = await TaskModel.findById(id);
        if (!task) throw new ABError({ "status": 404, "error": `Could not retrieve task with id ${id}` });
        return task;
    }

    async updateTask(id: string, updatedTask: Task): Promise<Task> {
        const task: Task = await TaskModel.findByIdAndUpdate(id, updatedTask, { new: true });
        if (!task) throw new ABError({ "status": 404, "error": `Could not retrieve task with id ${id}` });
        return task;
    };

    async createTask(task: Task): Promise<Task> {
        const taskModel: InstanceType<Task> = new TaskModel(task);
        const newTask: Task = await taskModel.save();
        return newTask;
    }

    async  deleteTask(id: string): Promise<Task> {
        const task: Task = await TaskModel.findByIdAndRemove(id);
        if (!task) throw new ABError({ "status": 404, "error": `Could not delete task with id ${id}` });
        return task;
    }

}
export default new TaskService();