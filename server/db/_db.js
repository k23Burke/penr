import Sequelize from 'sequelize'

// const DATABASE_URI = require(path.join(__dirname, '../env')).DATABASE_URI;
// TODO: this
const DATABASE_URI = process.env.DATABASE_URL || 'postgres://localhost:5432/uploader';

const db = new Sequelize('postgres://localhost:5432/uploader', {
	// TODO: fix this
  logging: console.log,// env.LOGGING ? console.log : false,
  native: false //true // env.NATIVE
});

export default db