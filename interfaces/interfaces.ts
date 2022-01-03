import { Request } from "express";
import { Date, ObjectId } from "mongoose";

export interface User {
    _id: ObjectId;
    name: string;
    password: string;
    email: string;
    role: string;
    status: boolean;
    areas?: ObjectId[];
    lastUpdatedBy?: ObjectId;
    lastUpdateDate?: Date;
}

export interface Role {
    role: string;
    role_name: string;
}

export interface Area {
    area: string;
    status: boolean;
    chemicals?: ObjectId[];
    lastUpdatedBy?: ObjectId;
    lastUpdateDate?: Date;
}

export interface Chemical {
    chemical: string;
    hazards?: ObjectId[];
    providers?: string[];
    manufacturers?: string[];
    pPhrases?: Phrase[];
    hPhrases?: Phrase[];
    ppes?: ObjectId[];
    fsms?: object;
    ems?: object;
    oshms?: object;
    status: boolean;
    lastUpdatedBy?: ObjectId;
    lastUpdateDate?: Date;
}

export interface Hazard {
    code: string
    hazard: string;
    status: boolean;
    description: string;
    precaution: string;
    pictogram: string;
}
export interface Phrase {
    code: string;
    description: string;
}
export interface Ppe {
    ppe: string;
    img: string;
}
export interface ExtRequest extends Request {
    user: User
}