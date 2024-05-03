import express, { Application } from 'express';
import userRouter from '../routes/usuario';
import cors from 'cors';
import db from '../db/connection';

class Server{
    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';

        // Metodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    //Conectar la base de datos
    async dbConnection(){
        try {
            await db.authenticate();
            console.log('database online');
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    }
    



    middlewares() {
        //CORS
        this.app.use( cors() );

        //Lectura del body
        this.app.use(express.json());

        //Carpeta publica
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use( this.apiPaths.usuarios, userRouter);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server corriendo en puerto: ' + this.port);
        });
    }
 
}

export default Server;