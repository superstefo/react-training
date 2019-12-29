import React, { Component } from 'react'
import BeanContextAware from '../services/BeanContextAware';
import AppSettingsService from './AppSettingsService';
//import PollService from '../services/PollService';

export default class SelectPollInterval extends Component {
  constructor(props) {
    super(props)

    this.state = {
      interval: AppSettingsService.updatePollInterval,
      styles: this.getLocalStyles()
    }
  }

  changeHandler = (e) => {
    this.setState({
      interval: e.target.value,
      styles: this.getLocalStyles()
    })
    AppSettingsService.updatePollInterval = e.target.value;
    this.props.onSelectPollInterval(e.target.value);
  }

  getLocalStyles = () => {
    let textColor = AppSettingsService.getSetting("textColor") || "";
    let bgColor = AppSettingsService.getSetting("bgColor") || "";

    return "form-control " + bgColor + " " + textColor;
  }

  render() {
    return (
      <form>
        <div className='form-group'>
          <label>Poll interval for getting updates to be every:</label>
          <select
            className={this.state.styles}
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
