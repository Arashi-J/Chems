import bcryptjs from 'bcryptjs';
import { Request, Response } from 'express';

import { jwtGenerator } from '../helpers/jwt-generator';

import { UserModel } from '../models/user';

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user || user.status === false) {
            return res.status(400).json({
                msg: 'Usuario y/o contraseña inválidos'
            });
        }
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario y/o contraseña inválidos'
            });
        }
        const token = await jwtGenerator(user._id);

        res.status(202).json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Internal Error'
        });
    }
}

