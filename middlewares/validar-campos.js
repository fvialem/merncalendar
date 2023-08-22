const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = ( req, res = response, next ) => {

    const errors = validationResult( req );
    console.log(errors)
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            msg:'Error en los datos',
            errors : errors.array()
        });
    };

    next()
}

module.exports = {
    validarCampos,
}


