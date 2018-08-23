import { Entity, ObjectID, Column, ObjectIdColumn, Unique, Index, Check } from "typeorm";
import {validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, IsNotEmpty, IsDefined, IsEmpty, MaxLength, MinLength} from "class-validator";
import { ValidationError } from "mongoose";

interface IUser {
    firstName?: string;
    lastName?: string;
    jobTitle?: string;
    salary?: number;
}

@Entity()
export class User {

    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    @Index({unique: true})
    @MinLength(3, {
        message: "$property is too short. Minimal length is $constraint1 characters"
    })
    @IsNotEmpty()
    firstName: string;

    @Column()
    @IsNotEmpty()
    lastName: string;

    @Column()
    @IsNotEmpty()
    jobTitle: string;

    @Column("int")
    @Min(100)
    @Max(100000)
    @IsInt()
    @IsNotEmpty()
    salary: number;

    constructor(user?: IUser) {
        this.firstName = user && user.firstName || null;
        this.lastName = user && user.lastName || null;
        this.jobTitle = user && user.jobTitle || null;
        this.salary = user && user.salary || null;
    }

    async validate(): Promise<Boolean> {
        const errors = await validate(this);
        if(errors.length > 0) throw errors;
        return true;
    }
}
