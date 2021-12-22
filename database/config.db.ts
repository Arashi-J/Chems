import {connect} from "mongoose";

export const dbConnection = async () => {
    try {

        
        await connect( process.env.BD_CNN!, {
            
        });
        
        
        console.log('Base de datos online')

    }catch(error){
        console.error(error);
        throw new Error('Error con la conexión con la base de datos');
    }
}

