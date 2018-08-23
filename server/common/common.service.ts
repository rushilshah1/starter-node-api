import { Request, Response, NextFunction } from 'express';
import L from './logger';
import { ABError } from './../model/ABError';
import { ErrorHandler } from "./../model/ErrorHandler";
import { ValidationError } from 'class-validator';
const errorHandler = new ErrorHandler();

export class ControllerCommonService {

    constructor() { }

    handleError(err: any, res: Response) {
        if (!(err instanceof ABError)) {
            err = errorHandler.handleError(err);
        }
        res.status(err.status).json(err);
    }
}

export default new ControllerCommonService();