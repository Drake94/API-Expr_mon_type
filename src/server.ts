//Diego Ortega
//17/05/2023
//diegoo@acl.cl
import connectDB from './db/mongoDB';
import config  from'../config';
import app from './app'
import { strict } from 'assert';

    
function iniApp(appConfig:any, dbConfig:any){
    try {
        connectDB(config.dbConfig);
        app.listen(config.appConfig.port, () => console.log(`Servidor funcionando en ${config.appConfig.host}${config.appConfig.port}`));
    } catch (e) {
        console.error(e)
        process.exit(0) 
        
    }
}

iniApp(config.appConfig, config.dbConfig)

export default iniApp