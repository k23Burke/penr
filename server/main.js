import chalk  from 'chalk'
import http from 'http'

import db from './db'
import app from './app'

const server = http.createServer()
const port = (process.env.PORT || 3000)

const createApplication = () => {
	const appPipeline = app(db)
	server.on('request', appPipeline)
}

const startServer = () => {
	server.listen(port, () => console.log(chalk.green(`Server locked in at port ${port}`)))
}

db.sync()
.then(createApplication)
.then(startServer)
.catch((err) => {
	console.log(chalk.red(err.stack))
})