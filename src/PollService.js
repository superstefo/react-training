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
      pollInterval: null
    };
  };

  checkIfLogged = () => {

    let promise = AjaxService.doGet(Const.URLS.PROFILE, {})
    promise.then((data) => {
      store.profile = data;
      this.getUpdates()
    })
  }

  getUpdates = () => {

    let promise = AjaxService.doGet(Const.URLS.UPDATES, {})
    promise.then((data) => {
      store.update = data;
      // history.push('/confirm-token');
    })
  }

  componentDidMount = () => {
    // this.checkIfLogged()
    // this.startPoll();
  }

  startPoll = () => {
    this.pollInterval = setInterval(
      () => {
        this.getUpdates();
      }, 20000
    );
  }

  componentWillUnmount = () => {
    if (this.pollInterval) {
      clearTimeout(this.pollInterval)
    }
  }

}
export default new PollService();
