import crypto from 'crypto'
import * as _ from 'lodash'
import Sequelize from 'sequelize'

import db from '../_db'

export default db.define('release', {
  name: Sequelize.STRING,
  userId: Sequelize.INTEGER
})
