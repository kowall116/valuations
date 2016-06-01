import React from 'react'
import {Route, IndexRoute} from 'react-router'

import Valuations from '../containers/Valuations'
import ValuationsCompanyPage from '../containers/ValuationsCompanyPage'

const routes = <Route path="/" component={Valuations}>
  <Route path="company/:company" component={ValuationsCompanyPage}/>
</Route>

export default routes