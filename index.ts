import { config } from 'dotenv';
import Server from "./models/server";

//dotenv config
config();

//server init

const server = new Server();

server.listen();
