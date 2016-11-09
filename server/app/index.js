import chalk from 'chalk'
import path  from 'path'
import util from 'util'
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import routes from './routes/index'

const rootPath = path.join(__dirname, '../../')
const indexPath = path.join(rootPath, './dist/index.html')
const faviconPath = path.join(rootPath, './server/app/views/favicon.png')
const env = require(path.join(rootPath, './server/env'))
const app = express()

const AppPipeline = (db) => {
  //
  app.setValue = app.set.bind(app)
  app.getValue = (path) => app.get(path)
  app.setValue('env', env)
  app.setValue('projectRoot', rootPath)
  app.setValue('indexHTMLPath', indexPath)
  // app.setValue('faviconPath', faviconPath)
  app.setValue('log', logMiddleware)

  // TODO: get this going properly
  // if (process.env.NODE_ENV !== 'testing') {
    app.use(app.getValue('log'));
  // }

  // Static stuff
  // app.use(favicon(app.getValue('faviconPath')));
  app.use(express.static(path.join(rootPath, './dist')));

  // Parsing
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // require('./authentication')(app, db);

  app.use('/api', routes)
  app.use(ErrorCatchingMiddleWare)
  console.log(chalk.blue('set up indexHTMLPath!!!!!!!!!'))
  app.get('/*', (req, res) => { res.sendFile(app.get('indexHTMLPath')) })

  app.use(ErrorCatchingEndWare)

  return app
}


const logMiddleware = (req, res, next) => {
    util.log(('---NEW REQUEST---'))
    console.log(util.format(chalk.red('%s: %s %s'), 'REQUEST ', req.method, req.path))
    console.log(util.format(chalk.yellow('%s: %s'), 'QUERY   ', util.inspect(req.query)))
    console.log(util.format(chalk.cyan('%s: %s'), 'BODY    ', util.inspect(req.body)))
    next()
}

// 404s for asset files not found
const ErrorCatchingMiddleWare = (req, res, next) => {
  if(path.extname(req.path).length > 0) {
    let err = new Error('File Not Found')
    err.status = 404
    next(err)
  } else {
    next()
  }
}

const ErrorCatchingEndWare = (db) => {
  app.use((err, req, res, next) => {
    console.log(chalk.red(err))
    console.log(chalk.red(err.stack))
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

export default AppPipeline