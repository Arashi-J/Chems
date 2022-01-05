import { Request, Response } from 'express';
import { UserModel } from '../models/user';
import bcryptjs from 'bcryptjs';
import { titleCase } from '../helpers/text-normalizers';

//List Users
export const getUsers = async (req: Request, res: Response) => {

    const { resultsLimit = 10, searchFrom = 0, userStatus = 'all' } = req.query;

    const query = userStatus === 'active' ? { status: true } :
        userStatus === 'inactive' ? { status: false } : {}

    const users = await UserModel.find(query)
        .skip(Number(searchFrom))
        .limit(Number(resultsLimit))
        .populate('areas', 'area')
        .populate('lastUpdatedBy', 'name');


    const totalUsers = await UserModel.countDocuments(query);

    return res.status(200).json({
        users,
        totalUsers
    });
}

//Look for user by id
export const getUser = async (req: Request, res: Response) => {

    const { id } = req.params;

    const user = await UserModel.findById(id)
        .populate('areas', 'area',)
        .populate('lastUpdatedBy', 'name');

    return res.status(200).json({
        user
    })
}

//Create user
export const createUser = async (req: any, res: Response) => {

    const { name, password, email, role, areas } = req.body;

    const user = new UserModel({
        name: titleCase(name.trim()),
        password,
        email: email.trim().toLowerCase(),
        role: role.trim().toLowerCase(),
        areas,
        lastUpdatedBy: req.user._id
    });

    //Password Hash
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    return res.status(201).json({
        user
    });

}

//Update User
export const updateUser = async (req: any, res: Response) => {

    const { id } = req.params;
    const { _id, password, __v, ...newUserData } = req.body;



    if (!password && Object.keys(newUserData).length === 0) {
        return res.status(400).json({
            msg: 'No se recibieron datos para actualizar'
        });
    }

    newUserData.lastUpdatedBy = req.user._id;
    newUserData.lastUpdateDate = Date.now();

    if (password) {
        const salt = bcryptjs.genSaltSync();
        newUserData.password = bcryptjs.hashSync(password, salt);
    }

    if (newUserData.name) {
        newUserData.name = titleCase(newUserData.name.trim())
    }


    const user = await UserModel.findByIdAndUpdate(id, newUserData, { new: true })
        .populate('areas', 'area')
        .populate('lastUpdatedBy', 'name');

    return res.status(202).json({
        user
    });

}

