const { request, response } = require('express')
const connection = require('../conexion')

const getCarreras = (req = request, res = response) => {

    const knex = require('knex')(connection)

    knex
        .select('*')
        .from('tblCarrera')
        .then(carreras => {
            return res.status(200).json(carreras)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Por Favor hable con el administrador'
            })
        })
        .finally(() => {
            knex.destroy();
        })
}

const getCarrera = (req = request, res = response) => {

    const knex = require('knex')(connection)

    const IdCarrera = req.params.id

    knex
        .select('*')
        .from('tblCarrera')
        .where('IdCarrera', IdCarrera)
        .then(([carrera]) => {
            return res.status(200).json(carrera)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Por Favor hable con el administrador'
            })
        })
        .finally(() => {
            knex.destroy();
        })
}

const postCarrera = (req = request, res = response) => {

    const knex = require('knex')(connection)

    const newBeneficio = req.body

    knex
        .insert(newBeneficio)
        .into("tblCarrera")
        .then(([beneficio]) => {
            return res.status(201).json({
                ok: true,
                msg: `Se creo el beneficio con id ${beneficio}`,
                id: beneficio
            })
        })
        .catch((error) => {
            console.log(error)
            res.status(400).json({
                ok: false,
                msg: 'No se pudo crear el beneficio, Carrera no existe'
            })
        })
        .finally(() => {
            knex.destroy();
        })

}

const putCarrera = (req = request, res = response) => {

    const knex = require('knex')(connection)

    const IdBeneficio = req.params.id
    const editBeneficio = req.body

    knex('beneficio')
        .where("IdBeneficio", IdBeneficio)
        .update(editBeneficio)
        .then((beneficio) => {
            if (!beneficio) {
                return res.status(400).json({
                    ok: false,
                    msg: `Beneficio ${IdBeneficio} no existe`
                })
            }

            return res.status(200).json({
                ok: true,
                msg: `Beneficio ${IdBeneficio} editado`
            })
        })
        .catch((error) => {
            console.log(error)
            res.status(400).json({
                ok: false,
                msg: 'Por Favor hable con el administrador'
            })
        })
        .finally(() => {
            knex.destroy();
        })

}

const deleteCarrera = (req = request, res = response) => {

    const knex = require('knex')(connection)

    const IdBeneficio = req.params.id

    knex('beneficio')
        .where("IdBeneficio", IdBeneficio)
        .del()
        .then((beneficio) => {
            if (!beneficio) {
                return res.status(400).json({
                    ok: false,
                    msg: `Beneficio ${IdBeneficio} no existe`
                })
            }

            return res.status(200).json({
                ok: true,
                msg: `Beneficio ${IdBeneficio} eliminado`
            })
        })
        .catch((error) => {
            console.log(error)
            res.status(400).json({
                ok: false,
                msg: 'Por Favor hable con el administrador'
            })
        })
        .finally(() => {
            knex.destroy();
        })
}

module.exports = {
    getCarreras,
    getCarrera,
    postCarrera,
    putCarrera,
    deleteCarrera
}