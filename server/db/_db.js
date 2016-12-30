import Sequelize from 'sequelize'

const db = new Sequelize('postgres://localhost:5432/penr', {
  logging: process.env.NODE_ENV != 'production' ? console.log : false,
  native: false
});

export default db