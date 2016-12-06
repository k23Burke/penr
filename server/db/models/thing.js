import crypto from 'crypto'
import Sequelize from 'sequelize'

import db from '../_db'

export default db.define('thing', {
  name: Sequelize.STRING,
  userId: Sequelize.INTEGER
})
