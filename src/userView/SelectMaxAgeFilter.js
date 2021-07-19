import React from 'react'
import AppSettingsService from '../settings/AppSettingsService';

export default class SelectMaxAgeFilter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ageFilterMax: props.ageFilterMax || 1000
    }
    this.parentObject = props.parentObject;
  }

  changeHandler = (e) => {
    console.log(e.target.value)
    let int = parseInt(e.target.value)
    this.parentObject.changeState({ ageFilterMax: int })
  }

  render() {
    let cssClasses = AppSettingsService.getInputStyleClasses()
    let optionTags = [];
    for (let value = 18; value < 55; value++) {
      optionTags.push(<option key={value} value={value}>{value}</option>);
    }
    optionTags.push(<option key={1000} value={1000}>{"55+"}</option>);
    return (
      <form>
        <div className='form-group'>
          <label>Max age:</label>
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
