import React, { Component } from 'react';
import AppSettingsService from './AppSettingsService';

export default class SelectBackgroundColor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: AppSettingsService.getSetting("bgColor") || AppSettingsService.bgColors[0]
    }
  }

  changeHandler = (event) => {
    let color = event.target.value;

    AppSettingsService.applyClass(document.body, AppSettingsService.bgColors, color);
    AppSettingsService.persistSetting("bgColor", color);

    this.setState({
      selected: color
    })
    this.props.triggerRender();
  }

  render() {
    return (
      <form>
        <div className='form-group'>
          <label>Select background color:</label>
          <select className={this.props.styles}
            value={this.state.selected}
            onChange={this.changeHandler}>
            {AppSettingsService.bgColors.map(
              (color) => {
                return (<option key={color.name} value={color.class}>{color.name}</option>);
              }
            )}
          </select>
        </div>
      </form>
    );
  }
}
