import React from 'react';
import Const from '../services/Constants';
import AjaxService from '../services/AjaxService';
import PollService from '../services/PollService';
import CashService from '../services/CashService';
import RenderForm from '../building-blocks/RenderForm';
import './index.css';
import { withRouter } from 'react-router-dom';
import store from '../store';

class ConfirmCode extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      confirmToken: ''
    };
  }

  componentDidMount() {
  }

  handleChange = event => {
    this.state.confirmToken = event.target.value;
    //this.setState({confirmToken: event.target.value});
  };


  handleSubmit = event => {
    event.preventDefault();
    let phoneNumber = CashService[Const.PHONE_HEADER_NAME];
    if (!phoneNumber) {
      throw new Error("CashService[Const.PHONE_HEADER_NAME] is not allowed to be " + phoneNumber);
    }
    let { history } = this.props;
    let ls = CashService.getLocalStorage();
    let promise = AjaxService.doGet(Const.URLS.AUTH.GET_TOKEN + this.state.confirmToken + "/" + phoneNumber);

    promise.then(function (value) {
      console.log(value);
      if (value && value.status === 200 && value.data) {
        console.log(value);
        let token = value.data[Const.AUTH_HEADER_NAME];
        console.log(token);

        if (!ls[phoneNumber]) {
          ls[phoneNumber] = {};
        }

        let headers = {
          [Const.AUTH_HEADER_NAME] : token
        }

        let onSuccess = function() {
          ls[phoneNumber][Const.AUTH_HEADER_NAME] = token;
          CashService.setLocalStorage(ls);
          CashService[Const.AUTH_HEADER_NAME] = token;
          history.push('/user');
        }

        let onFailure = function() {
          history.push('/phone');
        }

        PollService.checkIfLogged(headers, onSuccess, onFailure);
      }
    }).catch((e) => {
      // delete cash[store.phoneNumber];
      // delete store.phoneNumber;
      // localStorage.setItem(cashVarName, JSON.stringify(cash));
      console.log(e);
    })

  }

  render() {
    const optns = {
      handleSubmit: this.handleSubmit,
      fields: [
        { name: 'Confirmation code', placeholder: 'Please, enter your confirmation code:', onChangeFun: this.handleChange }
      ]
    }
    return (
      <div >
        <RenderForm options={optns} />
      </div>
    );
  }
}
export default withRouter(ConfirmCode)
