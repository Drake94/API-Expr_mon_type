import mongoose from "mongoose";


 function connectDB ({host, port, dbName}:any)  {
   try {
        const uri = `${host}${port}/${dbName}`
        mongoose.connect(uri)
        mongoose.connection.on('open', () => console.log('DB connected'))    
   } catch (error) {
        console.log('Error al conectar a MongoDB', error);
   }
}

export default connectDB;