import { Request, Response } from 'express';
import { UserModel } from '../models/user';
import bcryptjs from 'bcryptjs';

//List Users
export const getUsers = async (req: Request, res: Response) => {

    const { resultsLimit = 10, searchFrom = 0, userStatus = 'all' } = req.query;

    let query = userStatus === 'active' ? { status: true } :
                userStatus === 'inactive' ? { status: false } : {}

    const users = await UserModel.find(query)
        .skip(Number(searchFrom))
        .limit(Number(resultsLimit));

    const totalUsers = await UserModel.countDocuments(query);
    
    return res.status(200).json({
        users,
        totalUsers
    });

}

//Look for user by id
export const getUser = async (req: Request, res: Response) => {

    const { id } = req.params;

    const user = await UserModel.findById(id);

    if(user) {
        return res.status(200).json({
            user
        })
    }

    return res.status(404).json({
        msg: 'Usuario no encontrado'
    });
}

//Create user
export const createUser = async (req: Request, res: Response) => {

    const { name, password, email, role, areas } = req.body;

    const user = new UserModel({ name, password, email, role, areas });

    //Password Hash
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    return res.status(201).json({
        user
    });

}

//Update User
export const updateUser = async (req: Request, res: Response) => {

    const { id } = req.params;

    return res.status(200).json({
        ok: true,
        id
    });

}

