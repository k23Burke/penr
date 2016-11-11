import path from 'path'
import Sequelize from 'sequelize'
import db from './_db'

import User from './models/user'
import Release from './models/release'

// test
db
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });


User.hasMany(Release)
Release.belongsTo(User)

// User.create({ email: 'asd@asd', password: 'asdf' })
// const release = Release.create({ name: 'blah'}) //, ownerId: 1 })

// let theRelease;

// Release
// 	.findOne({where: {userId: 1}})
// 	.then(release => {
// 		  			console.log(release.dataValues)
// 		// User
// 		//   .findOne({where: {email: 'asd@asd'} })
// 		//   .then(user => {
// 		//     console.log(user.dataValues)
// 		//   	// user.setReleases([release]).then( () => {
// 		//   		// console.log('RELEASES SAVED')
// 		//   		user.getReleases().then(releases => {
// 		//   		})
// 		//   	// })
// 		//   })
// 	})





export default db

