import React from 'react';
import Const from './Constants';
import AjaxService from './AjaxService'
import BeanContextAware from './BeanContextAware'
import ReactDOM from 'react-dom';
import store from '../store'

class PollService extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      last_activity_date: "2019-11-11T01:58:00.404Z",
      showDate: false,
      pollInterval: null,
      isLogged: false,
      funcCallbacks: []
    };
    this.checkIfLogged();
  };

  checkIfLogged = () => {
    let promise = AjaxService.doGet(Const.URLS.PROFILE, {})
    promise.then((data) => {
      store.addToStore('profile', data);
      console.log(data);
      this.getUpdates()
      this.startPoll();
    }).catch((e) => {
      console.log(e);
    })
  }

  getUpdates = (lastDate) => { /// String requestJson = "{\"last_activity_date\": \"2019-11-11T01:58:00.404Z\"}";
    let header = BeanContextAware.get('header1');
    let chat1 = BeanContextAware.get('chat1');
    let data = {
      "last_activity_date": lastDate
    }
    let promise = AjaxService.doPost(Const.URLS.UPDATES, data, {});
    promise.then((data) => {
      console.log(data);
    //  console.log(data.data.last_activity_date);
    //if (!store.update) {
      store.addToStore('update', null);
      store.addToStore('update', data);
    //}
    //  this.state.last_activity_date= data.data.last_activity_date ;
      if (chat1) {
        chat1.triggerRenderFunc();
      }
      if (header) {
        header.changeButtonVisibility({ isVisible: true});
      }
    }).catch((e) => {
      if (header) {
        console.log("get updates errror ");
        header.changeButtonVisibility({ isVisible: false})
        if (this.pollInterval) {
          clearTimeout(this.pollInterval)
        }
      }
      console.log(e);
    })
  }

  startPoll = () => {
    this.pollInterval = setInterval(
      () => {
        console.log(this.state.last_activity_date);
        this.getUpdates( this.state.last_activity_date);
      }, 20000
    );
  }

}
export default new PollService();
