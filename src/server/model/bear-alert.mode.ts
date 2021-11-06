import mongoose from "../db/db";
import {Schema} from "mongoose";

const bearAlertSchema = new Schema({
    latitude: Number,
    longitude: Number,
    contact: String
})

export const BearAlertModel = mongoose.model("BearAlert", bearAlertSchema)

export class BearAlert {
    _id: number;
    latitude: number;
    longitude: number;
    contact: string;
}