const { response, request } = require("express");
const Evento = require("../models/Evento");

const getEventos = async ( req, res = response ) => {

    const eventos = await Evento.find()
                                .populate('user','name email')

    return res.json(
        {
            ok: true,
            eventos
        }
    )
};

const crearEventos = async ( req = request, res = response ) => {

    const evento = new Evento(req.body)
    console.log(req.body)

    try {

        evento.user = req.uid; 

        const eventoSaved = await evento.save()

        return res.json({
            ok: true,
            evento: eventoSaved
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }


    // return res.json(
    //     {
    //         ok: true,
    //         msg: 'crearEventos'
    //     }
    // )
};

const actualizarEventos = async ( req = request, res = response ) => {

    const eventoId = req.params.id;

    try {

        const evento = await Evento.findById(eventoId)
        console.log(eventoId)

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado con el id proporcionado'
            });
        }

        if (evento.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg:'No tienes permisos para editar este evento.'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: req.uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, {new: true} )
        
        res.json({
            ok:true,
            evento: eventoActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

};

const borrarEventos = async (req = request, res = response) => {

    const eventoId = req.params.id;

    try {

        const evento = await Evento.findById(eventoId)

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado con el id proporcionado'
            });
        }

        if (evento.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tienes permisos para borrar este evento.'
            });
        }

        await Evento.findByIdAndDelete(eventoId);
        
        res.json({
            ok:true,
            msg: 'Evento eliminado'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};

module.exports = {
    getEventos,
    crearEventos,
    actualizarEventos,
    borrarEventos
}

// {
//     ok: true,
//     msg: 'getEventos'
// }