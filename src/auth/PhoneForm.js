import React from 'react';
import Const from '../services/Constants';
import AjaxService from '../services/AjaxService'
import RenderForm from '../building-blocks/RenderForm'
//import './index.css';
import { withRouter } from 'react-router-dom';
import store from '../store';

class PhoneForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: ''
    };
  }

  handleChange = event => {
    this.state.phone = event.target.value;
    //  this.setState({phone: event.target.value});
  };

  handleSubmit = event => {
    event.preventDefault();

    let { history } = this.props;


    console.log(this.state.phone);


    let cashVarName = Const.LOCAL_CASH_VAR_NAME;

    let cash = localStorage.getItem(cashVarName);
    //console.log(cash);
    cash = JSON.parse(cash);
    //console.log(cash);
    if (cash[this.state.phone]) {

      let isToUseCurrent = window.confirm('A session with this phone numer: ' + this.state.phone + ' already exists.\nUse current session?')
      console.log(isToUseCurrent);
      if (isToUseCurrent) {
        // set phone to store.phone and x-auth-token
        // start poll if check
        //  history.push('/confirm-token');
        return;
      } else {
        console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");

        // set phone to store.phone
        // set phone to localStorage
      }
    } else {
      // cash[this.state.phone] = {}
      // localStorage.setItem(cashVarName, cash)
      // console.log(localStorage.getItem(cashVarName));
    }

    console.log(localStorage.getItem(cashVarName));

    let promise = AjaxService.doPost(Const.URLS.AUTH.PHONE, {
      'phone': this.state.phone
    }, {});

    promise.then(() => {
      console.log("promise - then  ");
      store.phoneNumber = this.state.phone;
      cash[this.state.phone] = {};
      localStorage.setItem(cashVarName, JSON.stringify(cash));
      history.push('/confirm-token');
    }).catch((e) => {
      delete store.phoneNumber;
      delete cash[this.state.phone];
      localStorage.setItem(cashVarName, JSON.stringify(cash));
      console.log(e);
    })
    return false;
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
export default withRouter(PhoneForm)
