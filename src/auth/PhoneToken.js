import React from 'react';
import Const from '../services/Constants';
import CashService from '../services/CashService';
import PollService from '../services/PollService';
import AppSettingsService from '../settings/AppSettingsService';
import RenderForm from '../building-blocks/RenderForm';
import { withRouter } from 'react-router-dom';

class PhoneToken extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      token: ''
    };
  }

  handleChange = event => {
    this.state.phone = event.target.value;
  };

  handleChangeToken = event => {
    this.state.token = event.target.value;
  };

  doAuth = function (authToken, phone) {
    let onSuccess = () => {
      CashService.setToken(authToken);
      CashService.persistToken(authToken);
      this.props.history.push('/user');
    }

    let onFailure = () => {
      window.alert('The provided token: ' + authToken
      + ' is expired... phone: ' +phone);
      this.props.history.push('/phone-token');
    }

    let headers = {
      [Const.AUTH_HEADER_NAME] : authToken
    }

    PollService.checkIfLogged(headers, onSuccess, onFailure);
  }

  handleSubmit = event => {
    event.preventDefault();

    let phone = this.state.phone;
    let authToken = this.state.token

    let promise = CashService.loadAll(phone);
    CashService.setPhone(phone);
    promise.then((data) => {

      let settings = data?.data?.settings;
      if (settings) {
        CashService.setSettings(settings);
        AppSettingsService.applyDesignSettings();
      }
      let bookmarks = data?.data?.bookmarks;
      if (bookmarks) {
        CashService.setBookmarks(bookmarks);
      }

      this.doAuth(authToken, phone)

    }).catch((e) => {
      console.error(e);
    })
  }

  render() {
    const optns = {
      handleSubmit: this.handleSubmit,
      fields: [
        { name: 'Phone number', label: 'Phone number', placeholder: 'phone number..', onChange: this.handleChange },
        { name: 'X-token', label: 'X-token', placeholder: 'auth token..', noCash: true, onChange: this.handleChangeToken }
      ]
    }

    return (
      <div autoComplete="new-password">
        <RenderForm autoComplete="new-password" options={optns} />
      </div >
    )
  }
}
export default withRouter(PhoneToken);
