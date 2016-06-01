import React, { PropTypes, Component } from 'react'
import ValuationsInput from './ValuationsInput'

class ValuationInputList extends Component {

	getValuationsInputs(valuations, section) {
		let filteredList = valuations.filter( obj =>
			obj.section === section
		)

		return filteredList.map((obj, index) =>
			<ValuationsInput editInfo={this.props.editInfo} section={obj.section} name={obj.name} key={index} value={obj.value} />
		)
	}

	getCalculation(valuations, section, math = 'add') {

		let filteredValuations = valuations.filter( obj =>
			obj.section === section
		)

		let mappedValuations = filteredValuations.map( obj =>
			isNaN(obj.value) ? 0: obj.value
		)

		switch(math) {
			case 'add':
				return mappedValuations.reduce((prev, curr) => 
					prev + curr
				)
			default:
				return
		}
	}

	render() {

		const { 
			valuations
		} = this.props

		const currentAssets = this.getValuationsInputs(valuations, 'current-assets')
		const currentLiablities = this.getValuationsInputs(valuations, 'current-liablities')
		const positiveAssets = this.getValuationsInputs(valuations, 'positive-assets')
		const negativeAssets = this.getValuationsInputs(valuations, 'negative-assets')

		this.getCalculation(valuations, 'current-assets', 'add')

		const totalCurrentAssets = this.getCalculation(valuations, 'current-assets', 'add')
		const totalCurrentLiabilities = this.getCalculation(valuations, 'current-liablities', 'add')
		const totalPositiveAssets = this.getCalculation(valuations, 'positive-assets', 'add')
		const totalNegativeAssets = this.getCalculation(valuations, 'negative-assets', 'add')


		return (
			<div className={'row'}>
				<form className={'form-horizontal'}> 
					<section className={'col-sm-6'}>
						<section>
							{currentAssets}
							<div>{totalCurrentAssets}</div>
						</section>
						<section>
							{currentLiablities}
							<div>{totalCurrentLiabilities}</div>
						</section>
						<section>{totalCurrentAssets - totalCurrentLiabilities}</section>
					</section>
					<section className={'col-sm-6'}>
						<section>
							{positiveAssets}
							<div>{totalPositiveAssets}</div>
						</section>
						<section>
							{negativeAssets}
							<div>{totalNegativeAssets}</div>
						</section>
						<section>{totalPositiveAssets - totalNegativeAssets}</section>
					</section>
				</form>
			</div>
		)
	}
}

export default ValuationInputList