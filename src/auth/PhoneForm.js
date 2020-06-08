import React from 'react';
import Const from '../services/Constants';
import AjaxService from '../services/AjaxService';
import CashService from '../services/CashService';
import PollService from '../services/PollService';
import AppSettingsService from '../settings/AppSettingsService';
import RenderForm from '../building-blocks/RenderForm';
import { withRouter } from 'react-router-dom';

class PhoneForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: ''
    };
  }

  handleChange = event => {
    this.state.phone = event.target.value;
  };

  phoneNumAuth = function (phone) {
    let promise = AjaxService.doPost(Const.URLS.AUTH.PHONE, {
      'phone': phone
    }, {});

    promise.then(() => {
      CashService.setPhone(phone);
      this.props.history.push('/confirm-token');
    }).catch((e) => {
      CashService.setPhone(null);
      console.error(e);
    })
  }

  ifNotLogged = (phone) => {
    CashService.setToken(null);
    this.phoneNumAuth(phone);
  }

  handleSubmit = event => {
    event.preventDefault();

    let phone = this.state.phone;

    let promise = CashService.loadAll(phone);
    CashService.setPhone(phone);
    promise.then((data) => {
      console.log(data?.data);

      let settings = data?.data?.settings;
      if (settings) {
        CashService.setSettings(settings);
        AppSettingsService.applyDesignSettings();
      }
      let bookmarks = data?.data?.bookmarks;
      if (bookmarks) {
        CashService.setBookmarks(bookmarks);
      }
      let authToken = data?.data?.[Const.AUTH_HEADER_NAME]?.token;
      this.processAuth(authToken, phone);
    }).catch((e) => {
      console.error(e);
    })
  }

  processAuth = (authToken, phone) => {
    if (authToken) {

      let isToUseCurrent = window.confirm('A session with this phone numer: '
        + phone + ' already exists.\nUse current session?');

      if (isToUseCurrent) {
        console.log("use current session:");
        CashService.setToken(authToken);
        PollService.checkIfLogged({},
          () => { this.props.history.push('/user') },
          () => { this.ifNotLogged(phone) });
      } else {
        this.phoneNumAuth(phone);
      }

    } else {
      CashService.persistAll(phone, CashService.cashStructureTemplate);
      this.phoneNumAuth(phone);
    }
  }

  render() {
    const optns = {
      handleSubmit: this.handleSubmit,
      fields: [
        { name: 'Phone number', placeholder: 'Please, fill in ur phone number', onChangeFun: this.handleChange }
      ]
    }

    return (
      <div>
        <RenderForm options={optns} />
      </div >
    )
  }
}
export default withRouter(PhoneForm);
