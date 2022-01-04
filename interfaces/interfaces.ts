import { Request } from "express";
import { Date, ObjectId } from "mongoose";

export interface User {
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
    leader?: string; 
    lastUpdatedBy?: ObjectId;
    lastUpdateDate?: Date;
}

export interface Chemical {
    chemical: string;
    hazards?: ObjectId[];
    providers?: string[];
    manufacturers?: string[];
    pPhrases?: [{
        code: string;
        description: string;
    }];
    hPhrases?: [{
        code: string;
        description: string;
    }];
    ppes?: ObjectId[];
    sds: {
        status: boolean;
        language: string;
        link: string
    };
    fsms: {
        approval: boolean;
        approver: ObjectId;
        approvalDate: Date;
    };
    ems: {
        approval: boolean;
        approver: ObjectId;
        approvalDate: Date;
    };
    oshms: {
        approval: boolean;
        approver: ObjectId;
        approvalDate: Date;
    };
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
export interface Ppe {
    ppe: string;
    img: string;
}
