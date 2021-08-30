import React from 'react'
import AppSettingsService from '../settings/AppSettingsService';

export default class SelectMinAgeFilter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ageFilterMin: props.ageFilterMin || 18
    }
    this.parentObject = props.parentObject;
  }

  changeHandler = (e) => {
    let int = parseInt(e.target.value)
    this.parentObject.changeState({ ageFilterMin: int })
  }

  render() {
    let cssClasses = AppSettingsService.getInputStyleClasses()
    let optionTags = [];
    for (let value = 18; value < 50; value++) {
      optionTags.push(<option key={value} value={value}>{value}</option>);
    }
    return (
      <form>
        <div className='form-group'>
          <label>Min age:</label>
          <select
            className={cssClasses}
            value={this.state.ageFilterMin}
            onChange={this.changeHandler}>
            {optionTags}
          </select>
        </div>
      </form>
    );
  }
}
