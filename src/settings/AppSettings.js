import React from 'react';
import store from '../store';
import BeanContextAware from '../services/BeanContextAware';
import PollService from '../services/PollService';
import SelectPollInterval from './SelectPollInterval';
import AppSettingsService from './AppSettingsService';
import SelectTextColor from './SelectTextColor';
import SelectBackgroundColor from './SelectBackgroundColor';

class AppSettings extends React.Component {
  constructor(props) {
    super(props);
console.log("-------------------------------------------------AppSettings constructor");

    this.state = {
    //  pollInterval: 20000//,
      //  numberMsgShown: 10
    };
  }

  onSelectPollInterval = (val) => {
    PollService.startUpdatePoll(val);
    this.setState({
      pollInterval: val
    })
  }

  triggerRender = () => {
    let val = this.state.pollInterval;
    this.setState({
      pollInterval: val
    })
  }

  render() {
    return (
      <div>
        <SelectPollInterval onSelectPollInterval={this.onSelectPollInterval} />
        <SelectBackgroundColor triggerRender={this.triggerRender}/>
        <SelectTextColor />
        <br />
      </div>
    )
  }
}
export default AppSettings;
