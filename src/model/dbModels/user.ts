import { ObjectId } from "../../../deps.ts";

export interface User   {
    _id: ObjectId;
    name: string;
    edad: number;
    email: string
}

export interface UserInput {
    name: string;
    edad: number;
    email: string
}