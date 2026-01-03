import mongoose from "mongoose"
import mogoose from "mongoose"

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "RESTAURANT"
    }).then(() => {
        console.log("Connected to database Successfully!");
    }).catch(err=>{
        console.log(`Some error Occured while connecting to database. ${err}`);
    });
};