import React from 'react';
import Const from '../services/Constants';
import AjaxService from '../services/AjaxService'
import RenderForm from '../building-blocks/RenderForm'
import './index.css';
import {withRouter}from 'react-router-dom'
import store from '../store'

class ConfirmCode extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      confirmToken: ''
    };
  }

  handleChange = event => {
    this.state.confirmToken = event.target.value;
  };

  getUpdates = () => {
  //  global.tostr(store)
    let { history } = this.props;

    let promise = AjaxService.doGet(Const.URLS.UPDATES);

    promise.then((value) => {
      if (value && value.status === 200 && value.data) {

        let data = value.data;
    //    console.log(data);
        store.updates = data;
        history.push('/user');
      }
    })
  };

  handleSubmit = event => {
    var that = this;
    event.preventDefault();

    let { history } = this.props;

    let promise = AjaxService.doGet(Const.URLS.AUTH.GET_TOKEN + this.state.confirmToken);

    promise.then(function(value) {
      if (value && value.status === 200 && value.data) {
          that.getUpdates()
      }
    //  console.log(value); // 1
          //   history.push('/user');

    });

  }

  render() {
    const optns = {
      handleSubmit : this.handleSubmit,
      fields: [
        {name: 'Confirmation code', placeholder: 'Please, enter your confirmation code:', onChangeFun :this.handleChange }
      ]
    }
   return (
    <div >
      <RenderForm options={optns}/>
    </div>
   );
  }
}
export default withRouter(ConfirmCode)
