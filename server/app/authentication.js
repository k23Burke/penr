'use strict';
var path = require('path');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var SequelizeStore = require('connect-session-sequelize')(session.Store);


module.exports = function (app, db) {

    var dbStore = new SequelizeStore({ db })
    dbStore.sync();
    var User = db.model('user');

    // set/read sessions from request
    app.use(session({
        secret: app.getValue('env').SESSION_SECRET,
        store: dbStore,
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());


    // When we give a cookie to the browser, it is just the userId (encrypted with our secret).
    passport.serializeUser((user, done) => { done(null, user.id) })

    // When we receive a cookie from the browser, we use that id to set our req.user
    // to a user found in the database.
    passport.deserializeUser(function (id, done) {
      User.findById(id)
        .then(function (user) {
            done(null, user);
        })
        .catch(done);
    });

    // We provide a simple GET /session in order to get session information directly.
    // This is used by the browser application (Angular) to determine if a user is
    // logged in already.
    app.get('/session', function (req, res, next) {
        var err;
        if (req.user) {
            res.send({ user: req.user.sanitize() });
        } else {
            err = new Error('No authenticated user.');
            err.status = 401;
            next(err);
        }
    });

    // use local auth
    // passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, (email, password, done) => {
    passport.use(new LocalStrategy(function (username, password, done) {
      User.findOne({ where: { email: username } })
        .then( user => {
          if (!user || !user.correctPassword(password)) done(null, false)
          else done(null, user)
        })
        .catch(done)
    }))

    // login request
    app.post('/login', (req, res, next) => {
      var authCb = function (err, user) {
        if (err) return next(err);
        if (!user) {
          var error = new Error('Invalid login credentials.');
          error.status = 401;
          return next(error);
        }

        // establish session
        req.logIn(user, function (loginErr) {
          if (loginErr) return next(loginErr)
          res.status(200).send({ user: user.sanitize() })
        })
      }

      passport.authenticate('local', authCb)(req, res, next);
    })

    // Simple /logout route.
    app.get('/logout', function (req, res) {
        req.logout();
        res.status(200).end();
    });

    // // Each strategy enabled gets registered.
    // ENABLED_AUTH_STRATEGIES.forEach(function (strategyName) {
    //     require(path.join(__dirname, strategyName))(app, db);
    // });

}
