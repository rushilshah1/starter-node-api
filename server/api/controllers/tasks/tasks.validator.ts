import { NextFunction } from "express";
import { Request, Response } from 'express';
import * as ExpressValidator from 'express-validator';

export class Validator {

    validateID(req: Request, res: Response, next: NextFunction) {
        req.checkParams('id', 'ID needs to be a valid mongo id').isMongoId();
        const errors = req.validationErrors();
        if (errors) res.status(400).send(errors);
        else next();
    }
    validateTask(req: Request, res: Response, next: NextFunction) {
        let body = req.body;
        req.checkBody('name', 'Name is a required field').notEmpty();
        req.checkBody('description', 'Description is a required field').notEmpty();
        req.checkBody('completed', 'Completed is a required field').notEmpty();
        req.checkBody('completed', 'Completed must be true/false').isBoolean();

        const errors = req.validationErrors();
        if (errors) res.status(400).send(errors);
        else next();
    }
}

export default new Validator();