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
}

export interface Area {
    area: string;
    status: boolean;
    chemicals?: Chemical[];
}

export interface Chemical {
    name: string;
    hazards?: Hazard[]
    pPhrases?: Phrase[];
    hPhrases?: Phrase[];
    ppe?: PPE[];
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
export interface PPE{
    ppe: string;
    img: string;
}