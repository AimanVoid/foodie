import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js"
import {errorMiddleware} from "./error/error.js";
import reservationRouter from './routes/reservationRoute.js'


const app = express();
dotenv.config({path: "./config/config.env"});

// connecting frontend with backend
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST"], // data will send only
    credentials: true
}));


app.use(express.json());  // converts json string into object
app.use(express.urlencoded({ extended: true })); //means which type of data
app.use('/api/v1/reservation', reservationRouter)

dbConnection();

app.use(errorMiddleware);

export default app;
