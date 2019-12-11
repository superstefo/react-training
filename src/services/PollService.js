import React from 'react';
import Const from './Constants';
import AjaxService from './AjaxService'
import BeanContextAware from './BeanContextAware'
import ReactDOM from 'react-dom';
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
    let header = BeanContextAware.get('header1');
    let chat1 = BeanContextAware.get('chat1');
    let promise = AjaxService.doGet(Const.URLS.UPDATES, {})
    promise.then((data) => {
      store.addToStore('update', null);
      store.addToStore('update', data);

      if (chat1) {
        chat1.triggerRenderFunc();
      }
      if (header) {
        header.changeButtonVisibility({ isVisible: true});
      }
    }).catch((e) => {
      if (header) {
        header.changeButtonVisibility({ isVisible: false})
      }
      console.log(e);
    })
  }

  startPoll = () => {
    this.pollInterval = setInterval(
      () => {
        this.getUpdates();
          this.state.funcCallbacks.map((func) =>{
          func()
        })
      }, 60000
    );
  }

  componentWillUnmount = () => {
    if (this.pollInterval) {
      clearTimeout(this.pollInterval)
    }
  }
}
export default new PollService();
