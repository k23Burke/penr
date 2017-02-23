import Sequelize from 'sequelize'
import express from 'express'

import Thing from '../../db/models/thing'

let router = express.Router()

// router.get('/:id', (req, res, next) => {
// 	Thing
// 	.findOne({where: {id: req.params.id}})
// 	.then(thing => {
// 		console.log(thing.dataValues)
// 		res.json(thing)
// 	})
// })

router.post('/', (req, res, next) => {
	Thing.create({
		name: req.body.name,
		userId: req.decoded.id
	})
	.then(thing => { res.json(thing) })
	.catch(err => {
		let error = err
		error.status = 500
		next(error)
	})
})

router.get('/', (req, res, next) => {
	Thing.findAll()
	.then(things => {
		if(things) {
			console.log(things.dataValues)
			res.json(things)
		} else {
			res.json([])
		}
	})
})

export default router