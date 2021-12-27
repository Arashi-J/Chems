import { config } from 'dotenv';
import Server from "./models/server";

//dotenv config
config();

//server init

const server = new Server();

server.listen();

 //TODO: when you inactivate an area, dont show it in users response, do it with chems in areas response