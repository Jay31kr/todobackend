import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors({
          origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
    }))
app.use(express.json())
app.use(express.urlencoded({extented:true}))
app.use(cookieParser());

import userRoutes from "./routes/user.routes.js"
import todoRoutes from "./routes/todo.routes.js"

app.get("/ping", (req, res) => res.send("PONG"));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/todos", todoRoutes);


app.use(errorHandler);

export default app;