import React from 'react';
import Const from '../services/Constants';
import AjaxService from '../services/AjaxService'
import PollService from '../services/PollService'
import RenderForm from '../building-blocks/RenderForm'
import './index.css';
import { withRouter } from 'react-router-dom'
import store from '../store'

class ConfirmCode extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      confirmToken: ''
    };
  }

  componentDidMount() {
    //  localStorage.getItem('state')
    //  localStorage.setItem('state', 'off'); 
  }

  handleChange = event => {
    this.state.confirmToken = event.target.value;
    //this.setState({confirmToken: event.target.value});
  };

  // getUpdates = () => {

  //   let { history } = this.props;

  //   let promise = AjaxService.doGet(Const.URLS.UPDATES);

  //   promise.then((value) => {
  //     if (value && value.status === 200 && value.data) {

  //       let data = value.data;
  //       store.updates = data;
  //       history.push('/user');
  //     }
  //   })
  // };

  handleSubmit = event => {
    event.preventDefault();
    console.log("----------confirm code----------------------handleSubmit---------");
    if (!store.phoneNumber) {
      throw new Error("store.phoneNumber is null");
    }
    let promise = AjaxService.doGet(Const.URLS.AUTH.GET_TOKEN + this.state.confirmToken + "/" + store.phoneNumber);

    let cashVarName = Const.LOCAL_CASH_VAR_NAME;
    var cash = localStorage.getItem(cashVarName);
    cash = JSON.parse(cash);

    promise.then(function (value) {
      console.log(value);
      if (value && value.status === 200 && value.data) {
        console.log(value);
        console.log(value.data["X-Auth-Token"]);
        //  throw "errrrrrrrrrrr"
        if (!cash) {
          cash = {};
        }
        if (!cash[store.phoneNumber]) {
          cash[store.phoneNumber] = {};
        }

        cash[store.phoneNumber]["X-Auth-Token"] = value.data["X-Auth-Token"];

        localStorage.setItem(cashVarName, JSON.stringify(cash));
        store["X-Auth-Token"] = value.data["X-Auth-Token"];
        PollService.checkIfLogged();
      }
    }).catch((e) => {
      delete cash[store.phoneNumber];
      delete store.phoneNumber;
      localStorage.setItem(cashVarName, JSON.stringify(cash));
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
