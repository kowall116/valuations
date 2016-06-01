import * as types from '../constants/ValuationActions'
import { CALL_API } from 'redux-api-middleware'

export const VALUATION_REQUEST = 'VALUATION_REQUEST'
export const VALUATION_SUCCESS = 'VALUATION_SUCCESS'
export const VALUATION_FAILURE = 'VALUATION_FAILURE'

export function editInfo(value, name, section) {
  return { type: types.EDIT_INFO, value, name, section }
}

export function fetchValuation(company = 'AAPL') {
	return {
		[CALL_API]: {
		    endpoint: `https://services.last10k.com/v1/company/${company}/balancesheet`,
		    method: 'GET',
		    headers: { 'Ocp-Apim-Subscription-Key': 'bb0fa2feb7c94b7c852172c2c57952be' },
		    types: [VALUATION_REQUEST, VALUATION_SUCCESS, VALUATION_FAILURE]
		}
	}
}