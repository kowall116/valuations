import React from 'react'
import {Route, IndexRoute} from 'react-router'

import Valuations from '../containers/Valuations'
import ValuationsCompanyPage from '../containers/ValuationsCompanyPage'

export default function routes(store) {
  // const ensureAuthenticated = (nextState, replace) => {
  //   if (!store.getState().auth.token) {
  //     replace('/login');
  //   }
  // };
  // const skipIfAuthenticated = (nextState, replace) => {
  //   if (store.getState().auth.token) {
  //     replace('/');
  //   }
  // };
  // const clearMessages = () => {
  //   store.dispatch({
  //     type: 'CLEAR_MESSAGES'
  //   });
  // };
  return (
    <Route path="/" component={Valuations}>
		  <Route path="company/:company" component={ValuationsCompanyPage}/>
		</Route>
  );
}