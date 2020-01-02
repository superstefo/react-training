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

  sendPhoneNum = function (phone) {
    let promise = AjaxService.doPost(Const.URLS.AUTH.PHONE, {
      'phone': phone
    }, {});

    promise.then(() => {
      CashService[Const.PHONE_HEADER_NAME] = phone;
      this.props.history.push('/confirm-token');
    }).catch((e) => {
      CashService[Const.PHONE_HEADER_NAME] = null;
      console.error(e);
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    let { history } = this.props;
    let phone = this.state.phone;

    let ls = CashService.getLocalStorage();
    if (this.isToUseCurrentSession(phone)) {
      console.log("use current session:");
      CashService[Const.PHONE_HEADER_NAME] = phone;
      CashService[Const.AUTH_HEADER_NAME] = ls[phone][Const.AUTH_HEADER_NAME];
      AppSettingsService.applySettingsFromLocalStorage();
      PollService.checkIfLogged({}, () => { history.push('/user') }, () => { history.push('/confirm-token') });
    } else {
      //do not use current session:
      console.log("do not use current session:");
      CashService[Const.PHONE_HEADER_NAME] = phone;
      if (ls && ls[phone] && ls[phone][Const.AUTH_HEADER_NAME]) {
        delete ls[phone][Const.AUTH_HEADER_NAME];
        CashService.setLocalStorage(ls);
        AppSettingsService.applySettingsFromLocalStorage();
      } 
      this.sendPhoneNum(phone);
    }
  }

  isToUseCurrentSession = (phone) => {
    let ls = CashService.getLocalStorage();

    if (!ls[phone] || !ls[phone][Const.AUTH_HEADER_NAME]) {
      return false;
    }

    let isToUseCurrent = window.confirm('A session with this phone numer: ' + phone
      + ' already exists.\nUse current session?');
    return isToUseCurrent;
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
