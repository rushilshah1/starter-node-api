import * as mongoose from "mongoose";
import * as bluebird from "bluebird";
import L from "./logger";
import { createConnections, createConnection } from "typeorm";
import { User } from "../model/User";

export default class Database {
    constructor() { }

    //Connecting to db via TypeORM library
    async connectTypeORM(): Promise<boolean> {

        const MONGO_USER = process.env.MONGO_USER;
        const MONGO_PASS = process.env.MONGO_PASS;
        const MONGO_HOST = process.env.MONGO_HOST;
        const MONGO_PORT = process.env.MONGO_PORT;
        const MONGO_DB = process.env.MONGO_DB;

        const connections = await createConnections([
            {
                name: "UsersMongoDB",
                type: "mongodb",
                host: MONGO_HOST,
                port: +MONGO_PORT,
                database: MONGO_DB,
                entities: [
                    User
                ],
                synchronize: true,
                logging: false
            }
        ]);

        return true;
    }

    //Connecting to db via Mongoose library
    async connectMongoose(): Promise<boolean> {
        const MONGO_USER = process.env.MONGO_USER;
        const MONGO_PASS = process.env.MONGO_PASS;
        const MONGO_HOST = process.env.MONGO_HOST;
        const MONGO_PORT = process.env.MONGO_PORT;
        const MONGO_DB = process.env.MONGO_DB;

        const userPassCombination = (MONGO_USER && MONGO_PASS) ? `${MONGO_USER}:${MONGO_PASS}@` : "";

        const mongoUrl = `mongodb://${userPassCombination}${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
        console.log(mongoUrl);
        await mongoose.connect(mongoUrl);

        L.info(`Connected to mongodb at ${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`);
        return true;
    }

}
