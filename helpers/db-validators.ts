import { AreaModel } from '../models/area';
import { RoleModel } from '../models/role';
import { UserModel } from '../models/user';

export const existingUserId = async (id: string) => {
    const existingUser = await UserModel.findById(id);
    if (!existingUser) {
        throw new Error(`Èl usuario con id ${ id } no existe`)
    }
}

export const existingEmail = async (email: string) => {

    const existingEmail = await UserModel.findOne({ email });

    if (existingEmail) {
        throw new Error(`El correo electrónico ${ email } ya se encuentra en uso`);
    }
}

export const existingArea = async (area: string) => {

    const existingArea = await AreaModel.findOne({ area });

    if (existingArea) {
        throw new Error(`El área ${ area } ya existe`);
    }
}


export const validRole = async (role: string) => {
    const validRole = await RoleModel.findOne({ role });
    if (!validRole) {
        throw new Error(`El rol de usuario ${ role } no es válido`);
    }
}

export const validAreas = async (areas: string[]) => {

    if (areas === []) {
        return
    } else {

        for (const areaId of areas) {

            if (areaId.length !== 24) {
                throw new Error(`El valor ${ areaId } no es un id de MongoDB válido`);
            }

            const validArea = await AreaModel.findById(areaId);

            if (!validArea) {
                throw new Error(`El área con el id ${ areaId } no existe en el catalogo`);
            }
        }
    }

}