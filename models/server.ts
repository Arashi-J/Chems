import cors from 'cors';
import express, { Application } from "express";

import { dbConnection } from "../database/config.db";

import areasRoutes from '../routes/areas.routes';
import authRoutes from '../routes/auth.routes';
import chemicalsRoutes from '../routes/chemicals.routes';
import hazardsRoutes from '../routes/hazards.routes';
import ppesRoutes from '../routes/ppes.routes';
import searchRoutes from '../routes/search.routes';
import usersRoutes from '../routes/users.routes';

export class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        areas: '/api/areas',
        auth: '/api/auth',
        chemicals: '/api/chemicals',
        hazards: '/api/hazards',
        ppes: '/api/ppes',
        search: '/api/search',
        users: '/api/users',
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8090';

        //Initial methods
        this.dbConnect();
        this.middlewares();
        this.routes();

    }

    async dbConnect() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Body parsing
        this.app.use(express.json());

        //Public dirs
        this.app.use(express.static('public'));
        this.app.use('/assets',express.static('assets'));

    }

    routes() {
        this.app.use(this.apiPaths.areas, areasRoutes);
        this.app.use(this.apiPaths.auth, authRoutes);
        this.app.use(this.apiPaths.chemicals, chemicalsRoutes);
        this.app.use(this.apiPaths.hazards, hazardsRoutes);
        this.app.use(this.apiPaths.ppes, ppesRoutes);
        this.app.use(this.apiPaths.search, searchRoutes);
        this.app.use(this.apiPaths.users, usersRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ' + this.port);
        });
    }
}

export default Server;
