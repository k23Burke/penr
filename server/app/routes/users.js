// var router = require('express').Router();
import Sequelize from 'sequelize'
import express from 'express'
import User from '../../db/models/user'
import Release from '../../db/models/release'

let router = express.Router()


// router.get('/', (req, res, next) => {
// 	User
// 	.findOne({where: {id: 1}})
// 	.then(user => {
// 		console.log(user.dataValues)
// 		res.json(user)
// 	})
// })

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
		user.getReleases()
		.then(releases => {
			console.log('%%%%%^% RELEASES %^%%%%%')
			console.log(releases.dataValues)
			res.json(releases)

		})
	})
})

export default router