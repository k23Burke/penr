import Sequelize from 'sequelize'
import env  from '../env'

const db = new Sequelize(env.DATABASE_URI, {
  logging: env.LOGGING ? console.log : false,
  native: false
});

export default db