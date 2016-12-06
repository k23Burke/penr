import path from 'path'
import Sequelize from 'sequelize'
import db from './_db'

import User from './models/user'
import Things from './models/thing'

// test
db
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });


User.hasMany(Things)

export default db

