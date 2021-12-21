import { RoleModel } from '../models/role';
import { UserModel } from '../models/user';

export const existingEmail = async(email: Object) => {
    
    const existingEmail = await UserModel.findOne({email});

    if (!existingEmail){
        throw new Error(`El correo electrónico ${email} ya se encuentra en uso`);
    }
}
export const validRole = async(role: Object) => {
    const validRole = await RoleModel.findOne({role});
    if(!validRole){
        throw new Error(`El rol de usuario ${role} no es válido`);
    }
}