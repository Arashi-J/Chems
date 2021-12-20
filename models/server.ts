import express, { Application } from "express";
import cors from 'cors';
import { dbConnection } from "../database/config.db";

export class Server {
    private app: Application;
    private port: string;
    private apiPaths = {

    }

    constructor() {
        this.app = express();
        this.port = '8080';

        //Initial methods
        this.dbConnect();
        this.middlewares();
        this.routes();

    }

    async dbConnect() {
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Body parsing
        this.app.use(express.json());

        //Public dir
        this.app.use(express.static('public'));

    }

    routes(){

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ' + this.port);
        });
    }
}

export default Server;
