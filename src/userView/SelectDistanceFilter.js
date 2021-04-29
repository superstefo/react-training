import React from 'react'
import AppSettingsService from '../settings/AppSettingsService';

export default class SelectDistanceFilter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      radius: props.initialRadius || 0
    }
    this.parentObject = props.parentObject;
  }

  changeHandler = (e) => {
    this.parentObject.setState({ distanceFilter: e.target.value })
  }

  render() {
    let cssClasses = AppSettingsService.getInputStyleClasses()
    let optionTags = [];
    for (let value = 1; value < 100; value++) {
      optionTags.push(<option key={value} value={value}>{value}</option>)
    }
    return (
      <form>
        <div className='form-group'>
          <label>Distance (miles):</label>
          <select
            className={cssClasses}
            value={this.state.radius}
            onChange={this.changeHandler}>
            {optionTags}
          </select>
        </div>
      </form>
    );
  }
}
