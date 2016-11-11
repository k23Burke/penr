var router = require('express').Router();
var fs = require('fs');
var path = require('path');

import usersRoute from './users'




// var ensureAdminAuthenticated = function(req, res, next) {
//     if(req.isAuthenticated()) {
//         next();
//     } else {
//         res.status(401).end();
//     }
// };

// //anything below this users need to be authenticated
// router.use('/', ensureAdminAuthenticated);

// router.use('/users', require('./users'));
router.use('/users', usersRoute);
// router.use('/projects', require('./projects'));
// router.use('/aws', require('./aws'));
// router.use('/forks', require('./forks'));



// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});

export default router