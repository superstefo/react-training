import React from 'react'
import AppSettingsService from '../settings/AppSettingsService';

export default class SelectMaxAgeFilter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ageFilterMax: props.ageFilterMax || 0
    }
    this.parentObject = props.parentObject;
  }

  changeHandler = (e) => {
    this.parentObject.setState({ ageFilterMax: e.target.value })
  }

  render() {
    let cssClasses = AppSettingsService.getInputStyleClasses()
    let optionTags = [];
    for (let value = 18; value < 1000; value++) {
      optionTags.push(<option key={value} value={value}>{value}</option>);
    }
    return (
      <form>
        <div className='form-group'>
          <label>Max age filter (mi):</label>
          <select
            className={cssClasses}
            value={this.state.ageFilterMax}
            onChange={this.changeHandler}>
            {optionTags}
          </select>
        </div>
      </form>
    );
  }
}
