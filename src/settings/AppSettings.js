import React from 'react';
import { withRouter } from 'react-router-dom'
import store from '../store'
import BeanContextAware from '../services/BeanContextAware';
import PollService from '../services/PollService'
import SelectPollInterval from './SelectPollInterval'
import Const from '../services/Constants';


class AppSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pollInterval: 20000//,
    //  numberMsgShown: 10

    };
  }

  onSelectPollInterval = (val) => {
    PollService.startUpdatePoll(val);
    this.setState({
      pollInterval: val
    })
  }
  changeTextColor = (event) => {
    let body = document.body;
    let colors = ['text-muted', 'text-white', 'text-dark', 'text-body'];
console.log(event.target.value);

    colors.forEach(color => {
      body.classList.remove(color);
    });
    body.classList.add(event.target.value);

    // console.log(event.target.value);
    // document.body.classList.add('bg-dark');
    // document.body.classList.add('text-muted');
    // console.log(document.body);
  }

  render() {


    return (
      <div><SelectPollInterval onSelectPollInterval={this.onSelectPollInterval}/>
        <div>
          <div>
          <div onChange={this.changeTextColor}>
            <input type="radio" value="text-muted" name="text-muted"/> Muted
            <input type="radio" value="text-white" name="text-white"/> White
            <input type="radio" value="text-dark" name="text-dark"/> Dark
            <input type="radio" value="text-body" name="text-body"/> Body
          </div>
          </div>
          <br />
        </div>
      </div>
    )
  }
}
export default withRouter(AppSettings);
