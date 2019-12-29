import React, { Component } from 'react'
import BeanContextAware from '../services/BeanContextAware'
import AppSettingsService from './AppSettingsService';

export default class SelectBackgroundColor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: AppSettingsService.getSetting("bgColor") || AppSettingsService.bgColors[0],
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
    
    AppSettingsService.applyClass(document.body, AppSettingsService.bgColors, color);
    AppSettingsService.persistSetting("bgColor", color);

    this.setState({
      selected: color,
      styles : this.getLocalStyles()
    })
    this.props.triggerRender();
  }

  render() {

    return (
      <form>
        <div className='form-group'>
          <label>Select background color:</label>
          <select className={this.state.styles}
            value={this.state.selected} onChange={(clazz) => this.changeHandler(clazz)}>
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
