import mongoose from "mongoose";
import { setTimeout } from "node:timers";
require('dotenv').config();

const dbUrl: string = process.env.DB_URL || "";

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl).then((data: any) => {
            console.log(`Database connected to ${data.connection.host}`);
        })
    } catch (error:any) {
        console.log(error);
        setTimeout(connectDB, 5000);
    }
}

export default connectDB;