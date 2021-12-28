export interface User {
    name: string;
    password: string;
    email: string;
    role: string
    status: boolean;
    areas?: string[];
}

export interface Role {
    role: string;
    role_name: string;
}

export interface Area {
    area: string;
    status: boolean;
    chemicals?: Chemical[];
}

export interface Chemical {
    chemical: string;
    hazards?: Hazard[];
    providers: string[];
    manufacturers: string[];
    pPhrases?: Phrase[];
    hPhrases?: Phrase[];
    ppes?: Ppe[];
    fsms: boolean;
    ems: boolean;
    oshms: boolean;
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