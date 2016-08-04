import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import routes from '../common/routes/routes'

import configureValuationsStore from '../common/store/configureStore'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
// import '../public/bootstrap.min.css'
// import '../common/style/bundle.scss'

const store = configureValuationsStore(browserHistory, window.__initialState__)
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history} routes={routes(store)} />
  </Provider>,
  document.getElementById('root')
)