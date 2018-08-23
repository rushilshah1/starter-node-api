import { prop, Typegoose, ModelType, InstanceType } from 'typegoose';

interface ITask {
    name?: string;
    description?: string;
    completed?: boolean;
}

export class Task extends Typegoose {
    /* Uses typegoose decorators because it is linked with mongoose */
    @prop({ required: true, unique: true })
    name: string;

    @prop({ required: true })
    description: string;

    @prop({ required: true })
    completed: boolean;

    constructor(task?: ITask) {
        super();
        this.name = task && task.name || null;
        this.description = task && task.description || null;
        this.completed = task && (typeof task.completed !== 'undefined' && task.completed) || false;
    }
}

const taskModel = new Task().getModelForClass(Task, {schemaOptions: {timestamps: true}});
export default taskModel;
