import React, { Component } from 'react'
import BeanContextAware from '../services/BeanContextAware'

export default class SelectPollInterval extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      interval: 20000
    }
    this.changeHandler = this.changeHandler.bind(this)
  }

  changeHandler(e) {
    this.setState({
      interval: e.target.value
    })

    this.props.onSelectPollInterval(e.target.value)
  }

  render() {
    return (
      <form>
        <div className='form-group'>
          <label>Poll interval for getting updates to be every:</label>
          <select
            className='form-control'
            value={this.state.interval}
            onChange={this.changeHandler}>
            <option value="10000">10 sec</option>
            <option value="20000">20 sec</option>
            <option value="40000">40 sec</option>
            <option value="50000">50 sec</option>
            <option value="60000">1 min</option>
            <option value="300000">5 min</option>
            <option value="600000">10 min</option>
          </select>
        </div>
      </form>
    );
  }
}
