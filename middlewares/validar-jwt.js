const { response } = require('express')
const jwt = require('jsonwebtoken');


const validarJWT = ( req = require, res = response, next ) => {
    const token =  req.header('x-token')

    
    // Confirmar que viene token
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    //Validacion Token

    try {

        const {uid, name} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
            
        )
        req.uid = uid;
        req.name = name;

        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido  '
        })
    }

    next();
}

module.exports = {
    validarJWT  // exportamos la funcion para usarla en otros ficheros
}