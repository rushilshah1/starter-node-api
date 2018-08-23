import TaskService from '../../services/tasks.service'
import { Task } from '../../../model/Task';
import { Request, Response } from 'express';
import commonService from '../../../common/common.service';
import { ABError } from '../../../model/ABError';
import { User } from '../../../model/User';
import userService from '../../services/users.service';
import { validate } from 'class-validator';

export class Controller {

    async getAllUsers(req: Request, res: Response) {
        try {
            const users: Array<User> = await userService.getAllUsers();
            res.send(users);
        } catch (error) { commonService.handleError(error, res); } //Pass error into common service to ensure consistent formatting
    }

    async createUser(req: Request, res: Response) {
        try {
            const createdUser: User = await userService.createUser(new User(req.body));
            res.send(createdUser);
        } catch (error) {
            const abErr = new ABError({ "message": error.message, "status": 409, "error": error.message });
            commonService.handleError(error, res);
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const updatedUser: User = await userService.updateUser(req.params.id, new User(req.body));
            res.send(updatedUser);
        } catch (error) { commonService.handleError(error, res); }
    }

    async removeUser(req: Request, res: Response) {
        try {
            const user: User = await userService.removeUser(req.params.id);
            res.send(user);
        } catch (error) { commonService.handleError(error, res); }
    }

}
export default new Controller();