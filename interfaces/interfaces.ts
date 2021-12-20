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
}

export interface Hazard {
    name: string;
}