import React from 'react';
import Const from './Constants';
import AjaxService from './AjaxService'
import store from './store'

class PollService extends React.Component {

  constructor(props) {
    super(props);
    this.checkIfLogged();
    this.state = {
      showDate: false,
      pollInterval: null,
      isLogged: false,
      funcCallbacks: []
    };
  };

  checkIfLogged = () => {
    let promise = AjaxService.doGet(Const.URLS.PROFILE, {})
    promise.then((data) => {
      store.addToStore('profile', data);
      //store.profile = data;
      this.getUpdates()
      this.startPoll();
    })
  }

  getUpdates = () => {
    let promise = AjaxService.doGet(Const.URLS.UPDATES, {})
    promise.then((data) => {
      store.update = null
      store.update = data;
    //  store.addToStore('update', data);
      //store.update = data;
      // history.push('/confirm-token');
    })
  }


  registerCallback = (func) => {
    // this.checkIfLogged()
    // this.startPoll();
    this.state.funcCallbacks.push(func)
  }
  componentDidMount = () => {
    // this.checkIfLogged()
    // this.startPoll();
  }

  startPoll = () => {
    this.pollInterval = setInterval(
      () => {
        this.getUpdates();
          this.state.funcCallbacks.map((func) =>{
          func()
        })
      }, 10000
    );
  }

  componentWillUnmount = () => {
    if (this.pollInterval) {
      clearTimeout(this.pollInterval)
    }
  }

}
export default new PollService();
