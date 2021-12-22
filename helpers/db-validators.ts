import { AreaModel } from '../models/area';
import { RoleModel } from '../models/role';
import { UserModel } from '../models/user';

export const existingEmail = async (email: Object) => {

    const existingEmail = await UserModel.findOne({ email });

    if (!existingEmail) {
        throw new Error(`El correo electrónico ${ email } ya se encuentra en uso`);
    }
}

export const existingArea = async (area: Object) => {

    const existingArea = await AreaModel.findOne({ area });

    if (!existingArea) {
        throw new Error(`El área ${ area } ya existe`);
    }
}




export const validRole = async (role: Object) => {
    const validRole = await RoleModel.findOne({ role });
    if (!validRole) {
        throw new Error(`El rol de usuario ${ role } no es válido`);
    }
}

export const validArea = (areas: Object[]) => {

    areas.forEach(async (area) => {
        const validArea = await AreaModel.findOne({ area });

        if (!validArea) {
            throw new Error(`El área ${ area } no existe en el catalogo`);
        }
    });



}