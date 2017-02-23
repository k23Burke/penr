import Sequelize from 'sequelize'
import express from 'express'
import User from '../../db/models/user'
// import Thing from '../../db/models/thing'

let router = express.Router()

router.get('/:id', (req, res, next) => {
	User
	.findOne({where: {id: req.params.id}})
	.then(user => {
		console.log(user.dataValues)
		res.json(user)
	})
})


router.get('/:id/things', (req, res, next) => {
	User
	.findOne({where: {id: req.params.id}})
	.then(user => {
		user.getThings()
		.then(things => {
			console.log('%%%%%^% THINGS %^%%%%%')
			console.log(things.dataValues)
			res.json(things)

		})
	})
})

export default router