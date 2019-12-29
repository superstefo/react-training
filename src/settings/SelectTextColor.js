import React, { Component } from 'react'
//import BeanContextAware from '../services/BeanContextAware'
import AppSettingsService from './AppSettingsService';

export default class SelectTextColor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected:   AppSettingsService.getSetting("textColor") || AppSettingsService.textColors[0],
      styles : this.getLocalStyles()
    }
  }

  getLocalStyles = () => {
    let textColor = AppSettingsService.getSetting("textColor") || "";
    let bgColor = AppSettingsService.getSetting("bgColor") || ""; 
    
    return "form-control " + bgColor + " " + textColor;
  }

  changeHandler = (event) => {
    let color = event.target.value;

    AppSettingsService.applyClass(document.body, AppSettingsService.textColors, color);
    AppSettingsService.persistSetting("textColor", color);

    this.setState({
      selected: color,
      styles : this.getLocalStyles()
    })
  }

  componentDidMount() {
  }

  render() {
    return (
      <form>
        <div className='form-group'>
          <label>Select text color:</label>
          <select
            className={this.state.styles}
            value={this.state.selected}
            onChange={(clazz) => this.changeHandler(clazz)}>
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