import Sequelize from 'sequelize'
import express from 'express'

import Thing from '../../db/models/thing'

let router = express.Router()

router.get('/:id', (req, res, next) => {
	Thing
	.findOne({where: {id: req.params.id}})
	.then(thing => {
		console.log(thing.dataValues)
		res.json(thing)
	})
})

export default router