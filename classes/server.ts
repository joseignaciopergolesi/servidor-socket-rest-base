import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';

export default class Server {

    private static _intance: Server;
    public app: express.Application;
    public port: number;

    public io: socketIO.Server; //se encarga de los eventos de los socket
    private httpServer: http.Server;

    private constructor() {

        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server( this.app );
        this.io = socketIO( this.httpServer );

        this.escucharSockets();
    }

    //implemento el patron singleton para evitar tener multiples instancias de Server
    public static get instance(){
        return this._intance || ( this._intance = new this() );
        //este return lo que hace es si existe una instancia la regresa y si no existe o es la primera vez que se llama a esa funcion entonces crea una nueva instancia
    }

    private escucharSockets(){
        
        console.log("escuchando sockets");

        this.io.on('connection', cliente => {
            console.log('Nuevo cliente conectado');

            // esta pendiente de los mensajes
            socket.mensaje( cliente, this.io);

            // DESCONECTAR 
            socket.desconectar( cliente );
        });


    }

    start( callback: Function ){
        this.httpServer.listen( this.port, callback );
    }


}

