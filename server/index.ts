import './common/env';
import Server from './common/server';
import routes from './routes';
import L from './common/logger';
import "reflect-metadata";

const port = parseInt(process.env.PORT);
const app = new Server();

L.info("In index.ts");

app.router(routes);
app.connectToDB().then(() => app.listen(port));

export default app;
