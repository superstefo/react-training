import React from 'react';

export default class Checkbox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      condition: props.condition
    }

    this.changeHandler = props.changeHandler;
    this.defaultChecked = props.defaultChecked;
    this.label = props.label;
  }

  doChangeState = (e) => {
    this.changeHandler(e);
    this.setState({
      condition: e.target.checked
    })
  }

  render() {
    return (
      <div className="form-check">
        <input className="form-check-input" type="checkbox" checked={this.state.condition} onChange={this.doChangeState} /> 
        <label className="form-check-label"> {this.label} </label>
      </div>
    )
  }
}