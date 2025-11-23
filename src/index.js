import dotenv from "dotenv";
dotenv.config();

import app from "./app.js"
import connectDB from "./config/db.js"

connectDB().then(()=>{
    const port = process.env.port;
    app.listen(port,()=>{
        console.log(`Server started , listening at ${port}`)
    })
}).catch((err)=>{
    console.error(`Caution : ${err.message}`);
    process.exit(1);
})