import chalk  from 'chalk'
import httpProxy from 'http-proxy'
import bundle from './dev-bundle'

import db from './db'
import ExpressApp from './app'

const isProduction = process.env.NODE_ENV === 'production'
const port = (process.env.PORT || 3000)


const startServer = () => {
	const app = ExpressApp(db)

	if (!isProduction) {
		console.log('---------- NOT PRODUCTION -------------')
		const proxy = httpProxy.createProxyServer({changeOrigin: true})
		bundle()

		app.use('/dist/*', (req, res) => {
			proxy.web(req, res, { target: 'http://localhost:8080'})
		})

		proxy.on('error', function(e) {
		  console.log('Could not connect to proxy, please try again...')
		})
	} else {
		console.log('######### - IS PRODUCTION - #########')
	}


	app.listen(port, () => {
		console.log(chalk.green(`Server locked in at port ${port}`))
	})
}

db.sync()
.then(startServer)
.catch((err) => {
	console.log(chalk.red(err.stack))
})
