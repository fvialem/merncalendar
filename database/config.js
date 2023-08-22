const mongoose = require('mongoose');



const dbConnection = async() => {

    await mongoose.connect(process.env.DB_CNN);

    console.log('DB Online');

    try {
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar BD');
    }

}

module.exports = {
    dbConnection
};