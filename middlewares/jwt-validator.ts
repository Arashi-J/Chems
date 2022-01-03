import { NextFunction, Response } from 'express';
import { verify } from "jsonwebtoken";

import { UserModel } from "../models/user";

export const jwtValidator = async (req: any, res: Response, next: NextFunction) => {
    const token = req.header('jtkn');
    if (!token) {
        return res.status(401).json({
            msg: 'There is no token in the request'
        });
    }
    try {
        const { uid } = (verify(token, process.env.JWTK!) as any);

        const user = await UserModel.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'Usuario no encuentrado en Base de Datos'
            });
        }
        if (!user.status) {
            return res.status(401).json({
                msg: 'Usuario inahibilitado'
            });
        }
        req.user = user;

        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token inválido'
        });
    }
}
