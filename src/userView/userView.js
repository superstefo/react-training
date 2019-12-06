import React from 'react';
import Const from '../Constants';
import AjaxService from '../AjaxService'
import RenderForm from '../basic/RenderForm'
import Friends from './friends'

import {withRouter}from 'react-router-dom'
import store from '../store'
import {Provider } from 'react-redux'


class UserView extends React.Component {
  constructor(props) {
    super(props);
  //  var { data } = this.props;
  //  console.log(data);
    // this.state = {
    //   phone: ''
    // };
  }


  render() {

  let { data } = this.props;
  // console.log("----------------------------- UserView");
  // global.tostr(data)
   return (
     <div> <h3>This is your user view </h3>
        <Friends data={data}/>
     </div >
   )
  }
}
export default withRouter(UserView)
