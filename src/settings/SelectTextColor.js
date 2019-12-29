import React, { Component } from 'react'
import AppSettingsService from './AppSettingsService';

export default class SelectTextColor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: AppSettingsService.getSetting("textColor") || AppSettingsService.textColors[0]
    }
  }

  changeHandler = (event) => {
    let color = event.target.value;

    AppSettingsService.applyClass(document.body, AppSettingsService.textColors, color);
    AppSettingsService.persistSetting("textColor", color);

    this.setState({
      selected: color
    })
    this.props.triggerRender();
  }

  render() {
    return (
      <form>
        <div className='form-group'>
          <label>Select text color:</label>
          <select
            className={this.props.styles}
            value={this.state.selected}
            onChange={this.changeHandler}>
            {AppSettingsService.textColors.map(
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