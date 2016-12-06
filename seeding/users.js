import db from '../server/db/index'

// get models for seeding
import User from '../server/db/models/user.js'
import Release from '../server/db/models/release.js'

User.create({email: 'blah', password: 'blah'})