import React from 'react';
import Const from './Constants';
import AjaxService from './AjaxService'
import store from '../store'

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
      this.getUpdates()
      this.startPoll();
    }).catch((e) => {
      console.log(e);
    })
  }

  getUpdates = () => {
    let promise = AjaxService.doGet(Const.URLS.UPDATES, {})
    promise.then((data) => {
      store.addToStore('update', null);
      store.addToStore('update', data);
      // history.push('/confirm-token');
    }).catch((e) => {
      console.log(e);
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
        console.log("poll");
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
