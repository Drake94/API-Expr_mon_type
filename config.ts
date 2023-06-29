import 'dotenv/config'
import { type } from 'os';
const config = {
    appConfig: {
        host: process.env.APP_HOST, 
        port: process.env.APP_PORT
    },
    dbConfig: {
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        dbName: process.env.DB_NAME
    },
    userLogin:{
    secret: process.env.SECRET!.toString()
    },
    dbConfigTest: {
        port: process.env.DB_URI_TEST_PORT!.toString(),
        host: process.env.DB_URI_TEST_HOST!.toString(),
        dbName: process.env.DB_NAME_TEST!.toString()
    }



}
export default config;