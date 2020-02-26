#!/usr/bin/env node

/**
 * Module dependencies.
 */

import debugLib from 'debug'
import http from 'http'

import app from '../app'
import config from '../config'
import dbClient from '../db/client'

import indexRouter from '../routes/index'
import recipesRouter from '../routes/recipes'

const debug = debugLib('nice-cream-backend:server')

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '8000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
dbClient.getDb(config.dbUrl, config.dbName)
  .then(db => {
    const dbMiddleware = (req, res, next) => {
      req.db = db
      next()
    }
    app.use(dbMiddleware)
    initializeRoutes(app)
    
    server.listen(port)
    server.on('error', onError)
    server.on('listening', onListening)
  })
  .catch(err => {
    console.error(`An error occurred: ${err}`)
    process.exit(1)
  })


const initializeRoutes = _app => {
  _app.use('/', indexRouter)
  _app.use('/recipes', recipesRouter)
}

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
