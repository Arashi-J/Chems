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
    name: String;
    status: boolean;
}

export interface Chemmical {
    name: String;
}

export interface Hazard {
    name: String;
}