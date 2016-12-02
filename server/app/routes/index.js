var router = require('express').Router();
var fs = require('fs');
var path = require('path');

import usersRoute from './users'
import releasesRoute from './releases'




const ensureAdminAuthenticated = (req, res, next) => {
	console.log("decoded", req.decoded)
    if(req.decoded) {
        next();
    } else {
        res.status(401).end();
    }
};

router.use('/users', usersRoute)
// //anything below this users need to be authenticated
router.use('/', ensureAdminAuthenticated)

router.use('/releases', releasesRoute)


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});

export default router