import React from 'react';
import Const from '../services/Constants';
import AjaxService from '../services/AjaxService';
import PollService from '../services/PollService';
import CashService from '../services/CashService';
import RenderForm from '../building-blocks/RenderForm';
import { withRouter } from 'react-router-dom';

class ConfirmCode extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      confirmToken: ''
    };
  }

  handleChange = event => {
    this.state.confirmToken = event.target.value;
    //this.setState({confirmToken: event.target.value});
  };

  handleSubmit = event => {
    event.preventDefault();
    let phoneNumber = CashService.getPhone();
    if (!phoneNumber) {
      throw new Error("CashService[Const.PHONE_HEADER_NAME] is not allowed to be " + phoneNumber);
    }
    let { history } = this.props;

    let promise = AjaxService.doGet(Const.URLS.AUTH.GET_TOKEN + this.state.confirmToken + "/" + phoneNumber);

    promise.then(function (value) {
      if (value && value.status === 200 && value.data) {
        let token = value.data[Const.AUTH_HEADER_NAME];

        let headers = {
          [Const.AUTH_HEADER_NAME] : token
        }

        let onSuccess = function() {
          CashService.setToken(token);
          CashService.persistToken(token);
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
        { name: 'Confirmation code', label: 'Confirmation code', placeholder: 'confirmation code...', 
        noCash: true, onChangeFun: this.handleChange }
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
