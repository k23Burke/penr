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


router.get('/:id/releases', (req, res, next) => {
	User
	.findOne({where: {id: req.params.id}})
	.then(user => {
		user.getThings()
		.then(releases => {
			console.log('%%%%%^% RELEASES %^%%%%%')
			console.log(releases.dataValues)
			res.json(releases)

		})
	})
})

export default router