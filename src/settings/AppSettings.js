import React from 'react';
import { withRouter } from 'react-router-dom'
import store from '../store'
import BeanContextAware from '../services/BeanContextAware'
import SelectPollInterval from './SelectPollInterval'
import Const from '../services/Constants';


class AppSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pollInterval: 20000,
      numberMsgShown: 10,

    };
  }

  componentDidMount() {
    BeanContextAware.add(this);
  }

  componentWillUnmount() {
    BeanContextAware.remove(this);
  }

  getPollInterval = () => {
    return this.state.pollInterval;
  }

  changeState = (obj) => {
    this.setState(obj)
  }

  onSelectPollInterval = (val) => {
    console.log("kooooooooooorrrrrrrrrrr  " + val);
    
    this.setState({
      pollInterval: val
    })
  }


  render() {


    return (
      <div><SelectPollInterval onSelectPollInterval={this.onSelectPollInterval}/>
        <div>

          <div>
        
          </div>
          <br />
        </div>
      </div>
    )
  }
}
export default withRouter(AppSettings);
