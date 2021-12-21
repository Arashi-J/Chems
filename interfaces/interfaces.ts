export interface User {
    name: string;
    password: string;
    email: string;
    role: string
    status: boolean;
    areas?: string[];
}

export interface Role {
    name: string;
}

export interface Area {
    name: string;
    status: boolean;
    chemicals?: Chemical[];
}

export interface Chemical {
    name: string;
    hazards?: Hazard[]
    phrases?: Phrase[];
    ppe?: PPE[];
    fsms: boolean;
    ems: boolean;
    oshs: boolean;
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
export interface PPE{
    ppe: string;
    img: string;
}