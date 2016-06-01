import React, { PropTypes, Component } from 'react'

class ValuationsInput extends Component {
	handleChange(e) {
		const text = parseInt(this.refs.myInput.value.trim(), 10)
		this.props.editInfo(text, this.props.name, this.props.section)
	}

	render() {
		return (
			<div className={'form-group'}>
				<label htmlFor={this.props.name} className={'col-sm-3 col-xs-12'}>{this.props.name}</label>
				<div className={'col-sm-6 col-xs-12 pull-right'}>
					<input type="number" ref="myInput" className={'form-control'} defaultValue={this.props.value.toString()} name={this.props.name} onChange={e => this.handleChange(e)} />
				</div>
			</div>
		)
	}
}

export default ValuationsInput