import React from 'react';
import PollService from '../services/PollService';
import SelectPollInterval from './SelectPollInterval';
import AppSettingsService from './AppSettingsService';
import SelectTextColor from './SelectTextColor';
import SelectBackgroundColor from './SelectBackgroundColor';

class AppSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      styles: AppSettingsService.getInputStyleClasses()
    };
  }

  onSelectPollInterval = (val) => {
    PollService.startUpdatePoll(val);
    this.setState({
      pollInterval: val
    })
  }

  triggerRender = () => {
    this.setState({
      styles: AppSettingsService.getInputStyleClasses()
    })
  }

  render() {
    return (
      <div>
        <SelectPollInterval styles={this.state.styles} onSelectPollInterval={this.onSelectPollInterval} />
        <SelectBackgroundColor styles={this.state.styles} triggerRender={this.triggerRender} />
        <SelectTextColor styles={this.state.styles} triggerRender={this.triggerRender} />
      </div>
    )
  }
}
export default AppSettings;
