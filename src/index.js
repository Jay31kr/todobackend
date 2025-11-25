import dotenv from "dotenv";
dotenv.config();

console.log("Loaded ENV:", process.env.ACCESS_TOKEN_SECRET);

import app from "./app.js"
import connectDB from "./config/db.js"

connectDB().then(()=>{
    const port = process.env.PORT;
    app.listen(port,()=>{
        console.log(`Server started , listening at ${port}`)
    })
}).catch((err)=>{
    console.error(`Caution : ${err.message}`);
    process.exit(1);
})