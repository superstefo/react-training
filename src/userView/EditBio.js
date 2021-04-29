import React from 'react';
import { withRouter } from 'react-router-dom'
import "react-table/react-table.css"
import AjaxService from '../services/AjaxService';
import Const from '../services/Constants';
import AppSettingsService from '../settings/AppSettingsService';

class EditBio extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      value: props?.data?.profile?.data?.bio || ''
    }
    this.getStyles = AppSettingsService.getInputStyleClasses;
  }

  goToFriendsView = () => {
    this.props.history.push('/pals');
  }

  saveProfile = () => {
    let data = {
      'json': JSON.stringify({
        user: { bio: this.state.value }
      })
    }
    let promise = AjaxService.doPost(Const.URLS.BASE_URL + "v2/profile", data, {})

    promise.then(() => {
      this.goToFriendsView();
    }).catch((e) => {
      console.error(e);
    })
  }

  onChange = (e) => {
    var elem = e.srcElement || e.target;
    this.setState({ value: elem.value })
  }

  render() {
    console.log(this.getStyles());
    let inputProps = {
      value: this.state.value,
      onChange: this.onChange,
      className: this.getStyles()
    }

    return (
      <div>
        <br></br>
        <input {...inputProps} type="text" />
        <br></br>
        <button type="button" className="btn btn-primary" onClick={this.saveProfile}> Save </button>
        <button type="button" className="btn btn-danger ml-2 float-right" onClick={this.goToFriendsView}> Cancel </button>
      </div>
    )
  }
}

export default withRouter(EditBio);