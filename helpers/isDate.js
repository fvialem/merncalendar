const moment = require('moment')

const isDate = ( value ) => {

    if (!value) {
        return false
    }
    
    const fecha = moment( value )
    if ( fecha.isValid() ) {
        return true;
    } else{
        // console.log("Fecha no valida")
        return false;
    }
}
module.exports = { isDate }