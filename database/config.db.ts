import {connect} from "mongoose";

export const dbConnection = async () => {
    try {
        await connect('mongodb+srv://J:e6UKkF8ic4Axa9U8@jcluster.zpyqs.mongodb.net/Chem_DB' , {
    
        });

        console.log('Base de datos online')

    }catch(error){
        console.error(error);
        throw new Error('Error con la conexión con la base de datos');
    }
}

