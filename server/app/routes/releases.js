import Sequelize from 'sequelize'
import express from 'express'

import Release from '../../db/models/release'

let router = express.Router()

router.get('/:id', (req, res, next) => {
	Release
	.findOne({where: {id: req.params.id}})
	.then(release => {
		console.log(release.dataValues)
		res.json(release)
	})
})

export default router