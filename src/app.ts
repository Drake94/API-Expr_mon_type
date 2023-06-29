//Diego Ortega
//17/05/2023
//diegoo@acl.cl
import express, { Router } from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser'
import cargo  from './routes/cargo'
import medic from './routes/medicoLab'
import sample from './routes/muestra'
import paciente from './routes/paciente';
import resultado from './routes/resultado'
import statu from './routes/statusSample'
import sampletype from './routes/tipoMuestra'
import './db/mongoDB';

//swagger
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from'swagger-jsdoc';
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "CrudExMon API",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:8081"
            }
        ]
    },
    apis: [`${path.join(__dirname, "./routes/*.ts")}`],
};
//init
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));//directorio publico archivos e imagenes
app.use(express.urlencoded({extended: false}))

app.use("/admin-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))
app.use('/public', express.static(`${__dirname}/storage/imgs`))

//app.use('/admin' )
app.use('/admin', paciente.route)
app.use('/admin', medic.route)
app.use('/admin', resultado.route)
app.use('/admin', sample.route)
app.use('/admin', sampletype.route)
app.use('/admin', cargo.route)
app.use('/admin', statu.route)

export default app