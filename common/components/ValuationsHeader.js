import React, { PropTypes, Component } from 'react'

export default class ValuationsHeader extends Component {

	handleSubmit(e) {		
		e.preventDefault()

		const { push } = this.props
		const company = this.refs.headerInput.value.trim()
		push(`/company/${company}`)
	}

	handleClick(e) {
		e.preventDefault()
		const { push } = this.props
		push('/')
	}

  render() {
  	const { push } = this.props
    return (
      <header className='vHeader'>
          <a href='#' onClick={this.handleClick.bind(this)} className='vHeader__logo'>Valuations</a>
          <form className='vHeader__search' onSubmit={this.handleSubmit.bind(this)}>
          	<input type='text' ref='headerInput' name='headerInput' className='vHeader__input' placeholder='search for ticker' />
          	<input type="submit" value="Submit" />
          </form>
      </header>
    )
  }
}

ValuationsHeader.propTypes = {
  
}
