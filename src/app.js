import express from 'express';
import routes from './routes';
import cors from 'cors';

import './config/connection';

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());

        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", 'GET, PUT, POST, DELETE');
            res.header("Access-Control-Allow-Headers", 'X-PINGOTHER, Content-Type');
            this.app.use(cors());
            next();
        })
    }
    routes() {
        this.app.use(routes);
    }
}

export default new App().app;