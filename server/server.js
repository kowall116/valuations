import express from 'express'
import path from 'path'
import logger from 'morgan'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import expressValidator from 'express-validator'
import dotenv from 'dotenv'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import request from 'request'
import sass from 'node-sass-middleware'
import webpack from 'webpack'
import config from '../webpack.config'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import serialize from 'serialize-javascript'
import * as fs from 'fs'

// Load environment variables from .env file
dotenv.load()

// ES6 Transpiler
import 'babel-core/register'
import 'babel-polyfill'

// Models
// var User = require('./models/User')

// React and Server-Side Rendering
import routes from '../common/routes/routes'
import configureStore from '../common/store/configureStore'

const app = express()

const compiler = webpack(config)

mongoose.connect(process.env.MONGODB)
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.')
  process.exit(1)
})
app.set('views', path.join(__dirname, 'views'))
app.set('port', process.env.PORT || 3000)
app.use(compression())
console.log(path.join(__dirname, '..', 'public'))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())
app.use(cookieParser())
app.use('/css', sass({
  root: path.join(__dirname, '..'),
  src: path.join('common', 'style'), 
  dest: path.join('public'), 
  debug: true,
  force: true
}), express.static(path.join(__dirname, '..', 'public')))

app.use(function(req, res, next) {
  req.isAuthenticated = function() {
    const token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
      return false;
    }
  }

  if (req.isAuthenticated()) {
    const payload = req.isAuthenticated();
    User.findById(payload.sub, function(err, user) {
      req.user = user
      next()
    })
  } else {
    next()
  }
});

if (app.get('env') === 'development') {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

// React server rendering
app.use(function(req, res) {
  const initialState = {
    valuations: {},
    company: {}
  };

  const store = configureStore(initialState)
  match({ routes: routes(store), location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const content = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps}/>
        </Provider>
      )
      res.send('<!doctype html>\n' + renderToString(<HTML content={content} store={store}/>))
    } else {
      res.sendStatus(404);
    }
  })
})

const HTML = ({ content, store }) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <title>Valuations</title>
      <meta name="description" content="" / >
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" type="text/css" href="/css/bundle.css" />
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: content }}/>
      <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${serialize(store.getState())}` }}/>
      <script src="/static/bundle.js"/>
    </body>
  </html>
)

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.sendStatus(err.status || 500)
  })
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'))
})

module.exports = app
