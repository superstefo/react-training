import React, { Component } from 'react'
import BeanContextAware from '../services/BeanContextAware'

export default class Select extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numberMsgShown: 10,
      getStyles: props.getStyles
    }
  }

  changeHandler = (e) => {
    let chat1 = BeanContextAware.get('chat1');
      this.setState({
        numberMsgShown: e.target.value
      })
      if (chat1) {
        chat1.changeState({ numberMsgShown: parseInt(e.target.value)});
      }
  }

  render() {
    return (
      <form>
        <div className='form-group'>
          <label>Number of messages to show:</label>
          <select
            className={this.state.getStyles()}
            value={this.state.numberMsgShown}
            onChange={this.changeHandler}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="70">70</option>
          </select>
        </div>
      </form>
    );
  }
}
