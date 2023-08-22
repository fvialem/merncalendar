const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEventos, actualizarEventos, borrarEventos } = require('../controllers/eventsController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = Router();
router.use( validarJWT )

//Obtener Eventos
router.get('/', getEventos)

// Crear evento
router.post(
    '/',
    [
        check('title','El titulo es obligatorio').notEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de termino es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEventos
)

//Actualizar Evento

router.put(
    '/:id',
    [
        check('title','El titulo es obligatorio').notEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de termino es obligatoria').custom( isDate ),
        validarCampos
    ],
    actualizarEventos
)

// Borrar  evento

router.delete('/:id', borrarEventos)


module.exports = router;