import * as express from 'express';
import { Application } from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import * as cookieParser from 'cookie-parser';
import swaggerify from './swagger';
import l from './logger';
import db from './db';

const app = express();
export const database = new db();

export default class ExpressServer {
  constructor() {
    const root = path.normalize(__dirname + '/../..');
    app.set('appPath', root + 'client');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(express.static(`${root}/public`));
  }

  router(routes: (app: Application) => void): ExpressServer {
    swaggerify(app, routes)
    return this;
  }

  // makes connection to db
  async connectToDB(): Promise<boolean> {
    try {
      const connection: boolean = await database.connectTypeORM();
      await database.connectMongoose();
      l.info("Has connected to database");
      return true;
    }
    catch (err) {
      l.fatal(`Error connecting to database. Please make sure database is running. ${err}`);
    }
  }

  listen(port: number = parseInt(process.env.PORT)): Application {
    const welcome = port => () => l.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${port}}`);
    http.createServer(app).listen(port, welcome(port));
    return app;
  }
}