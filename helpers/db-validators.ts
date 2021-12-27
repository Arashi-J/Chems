import { AreaModel } from '../models/area';
import { RoleModel } from '../models/role';
import { UserModel } from '../models/user';
import { ChemicalModel } from '../models/chemical';

export const existingUserId = async (id: string) => {
    const existingUser = await UserModel.findById(id);
    if (!existingUser) {
        throw new Error(`Èl usuario con id ${ id } no existe`);
    }
}

export const existingAreaId = async (id: string) => {
    const existingArea = await AreaModel.findById(id);
    if (!existingArea) {
        throw new Error(`Èl área con id ${ id } no existe`);
    }
}

export const existingChemicalId = async (id: string) => {
    const existingChemical = await ChemicalModel.findById(id);
    if (!existingChemical) {
        throw new Error(`Èl químico con id ${ id } no existe`);
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

export const existingChemical = async (chemical: string) => {

    const existingChemical = await ChemicalModel.findOne({ chemical });

    if (existingChemical) {
        throw new Error(`La sustancia química con nombre: ${ chemical } ya existe`);
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

export const validChemicals = async (chemicals: string[]) => {
    if (chemicals === []) {
        return
    } else {
        for (const chemicalId of chemicals) {
            if (chemicalId.length !== 24) {
                throw new Error(`El valor ${ chemicalId } no es un id de MongoDB válido`);
            }
            const validChemical = await ChemicalModel.findById(chemicalId)
            if(!validChemical){
                throw new Error(`El sustancia química con el id ${ chemicalId } no existe en el catalogo`);
            }
        }
    }
}