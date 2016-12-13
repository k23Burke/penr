var router = require('express').Router();
var fs = require('fs');
var path = require('path');

import usersRoute from './users'
import thingsRoute from './things'

const ensureAdminAuthenticated = (req, res, next) => {
  if(req.decoded) next()
  else res.status(401).end()
};

// //anything below this users need to be authenticated
router.use('/', ensureAdminAuthenticated)

router.use('/users', usersRoute)
router.use('/things', thingsRoute)


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});

export default router