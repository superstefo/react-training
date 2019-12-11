import React from 'react';
import {withRouter}from 'react-router-dom'

class UserView extends React.Component {
  
  render() {
    let { data } = this.props;
     return (
       <div>
        <h3>This is your user view </h3>
        <h3>This is your user view </h3>
        <h3>This is your user view </h3>
        <h3>This is your user view </h3>
        <h3>This is your user view </h3>
        <h3>This is your user view </h3>
       </div >
     )
  }
}
export default withRouter(UserView)
