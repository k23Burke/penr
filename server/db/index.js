// 'use strict';
// var Promise = require('bluebird');
// var path = require('path');
// var chalk = require('chalk');

// var DATABASE_URI = require(path.join(__dirname, '../env')).DATABASE_URI;

// var mongoose = require('mongoose');
// var db = mongoose.connect(DATABASE_URI).connection;

// // Require our models -- these should register the model into mongoose
// // so the rest of the application can simply call mongoose.model('User')
// // anywhere the User model needs to be used.
// require('./models');

// var startDbPromise = new Promise(function (resolve, reject) {
//     db.on('open', resolve);
//     db.on('error', reject);
// });

// console.log(chalk.yellow('Opening connection to MongoDB . . .'));
// startDbPromise.then(function () {
//     console.log(chalk.green('MongoDB connection opened!'));
// });

// module.exports = startDbPromise;


const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/uploader';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', () => { client.end(); });