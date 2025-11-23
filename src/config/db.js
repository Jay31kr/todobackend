import mongoose from "mongoose";

const connectDB=async ()=>{
    try{
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`MONGO DB is connected on ${conn.connection.host}`)
        return conn;
    }catch(err){
        console.error(`Can't connect to the MongoDB : ${err.message}`);
        process.exit(1);
    }
}

export default connectDB;