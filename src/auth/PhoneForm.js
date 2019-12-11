import React from 'react';
import Const from '../services/Constants';
import AjaxService from '../services/AjaxService'
import RenderForm from '../building-blocks/RenderForm'
//import './index.css';
import { withRouter } from 'react-router-dom'

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
