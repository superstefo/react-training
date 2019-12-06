import React from 'react';
import Const from '../Constants';
import AjaxService from '../AjaxService'
import RenderForm from '../basic/RenderForm'
import './index.css';
import {withRouter}from 'react-router-dom'

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

  handleSubmit = event => {
    event.preventDefault();

    let { history } = this.props;

    let promise = AjaxService.doPost(Const.URLS.AUTH.PHONE, {
      'phone': this.state.phone
    }, {});

    promise.then(() => {
       history.push('/confirm-token');
    })
    return false;
  }

  render() {
    const optns = {
      handleSubmit : this.handleSubmit,
      fields: [
        {name: 'Phone number', placeholder: 'Please, fill in ur phone number', onChangeFun :this.handleChange },
        {name: 'Test field', placeholder: 'test field...', onChangeFun : (arg) =>{console.log("name333 - hone333");}}
      ]
    }

   return (
     <div>
      <RenderForm options={optns}/>
     </div >
   )
  }
}
export default  withRouter(PhoneForm)
