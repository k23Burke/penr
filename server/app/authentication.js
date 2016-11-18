'use strict';
var path = require('path');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var SequelizeStore = require('connect-session-sequelize')(session.Store);
import jwt from 'jsonwebtoken'

module.exports = function (app, db) {
  const User = db.model('user')

  app.post('/login', function(req, res, next) {

    User.findOne({ where: { email: req.body.username } })
      .then( user => {
        if (!user || !user.correctPassword(req.body.password)) {
          res.status(401).json({
            success: false,
            message: 'No authenticated user.'
          })
        } else {
          var token = jwt.sign(user.sanitize(), app.getValue('env').SESSION_SECRET, {
            expiresIn: "1m"
          }, (err, token) => {
            res.json({
              success: true,
              message: 'Enjoy your token!',
              token
            })
          })
        }
      })
      .catch(() => {
        let err
        err = new Error('No authenticated user.');
        err.status = 401;
        next(err)
      })

  })

  app.use(function(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, app.getValue('env').SESSION_SECRET, function(err, decoded) {
        if (err) {
          res.status(401).json({
            success: false,
            message: 'Failed to authenticate token.'
          })
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      })
    } else {
      res.status(403).json({
        success: false,
        message: 'No token provided.'
      });

    }
  })
}
