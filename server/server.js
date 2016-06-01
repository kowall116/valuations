import path from 'path'
import Express from 'express'
import serialize from 'serialize-javascript'
import qs from 'qs'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createMemoryHistory, match, RouterContext } from 'react-router'

import { configureValuationsStore } from '../common/store/configureStore'
import { syncHistoryWithStore } from 'react-router-redux'

import routes from '../common/routes/routes'
import Valuations from '../common/containers/Valuations'
import ValuationsCompanyPage from '../common/containers/ValuationsCompanyPage'

const app = new Express()
const port = 5001

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

// This is fired every time the server side receives a request
app.use( function (req, res) {
	const memoryHistory = createMemoryHistory(req.url)
  const store = configureValuationsStore(memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store)

	match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const content = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps}/>
        </Provider>
      )

      res.send('<!doctype html>\n' + renderToString(<HTML content={content} store={store}/>))
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
  	</head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: content }}/>
      <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${serialize(store.getState())};` }}/>
      <script src="/static/bundle.js"/>
    </body>
  </html>
)

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})