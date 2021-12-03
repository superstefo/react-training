import React from 'react';
import { withRouter } from 'react-router-dom'
import "react-table/react-table.css"
import AjaxService from '../services/AjaxService';
import Const from '../services/Constants';
import AppSettingsService from '../settings/AppSettingsService';

class EnterUserId extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
    this.getStyles = AppSettingsService.getInputStyleClasses;
  }

  goToView = (args) => {
    this.props.history.push({
      pathname: '/remote-user',
      state: args
    })
  }

  getUserData = () => {
    let promise = AjaxService.doGet(Const.URLS.USER + this.state.value, {});
    promise.then((data) => {
      let user = data?.data?.results;
      this.goToView(user);
    }).catch((e) => {
      console.error(e);

    })
  }

  onChange = (e) => {
    var elem = e.srcElement || e.target;
    this.setState({ value: elem.value })
  }

  render() {
    let inputProps = {
      value: this.state.value,
      onChange: this.onChange,
      className: this.getStyles() + " d-inline w-25"
    }

    return (
      <div>
        <br />
        <input {...inputProps} type="text" />
      
        <button type="button" className="btn btn-primary" onClick={this.getUserData}> Sее </button>
      </div>
    )
  }
}

export default withRouter(EnterUserId);