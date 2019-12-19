import React from 'react';
import Const from './Constants';
import AjaxService from './AjaxService'
import BeanContextAware from './BeanContextAware'
import ReactDOM from 'react-dom';
import Header from '../building-blocks/header';
import store from '../store'

class PollService extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      last_activity_date: null,
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
    //  console.log(data);
      this.getUpdates()
      this.startPoll();
    }).catch((e) => {
      console.log(e);
    })
  }

  mergeUpdates = (store, updates) => {
    let matches = updates.data.matches;
    for (let i = 0; i < matches.length; i++) {
      let matchUpdate = matches[i];
      let oldMatch = store.getMatchById(matchUpdate._id);
      //merge brand new objects:
      if (!oldMatch) {
        store.getStore().update.data.matches.push(matchUpdate);
      //  continue;
      }

      //merge new messages:
      let newMsgs = matchUpdate.messages;
      let newMsgsCount = newMsgs.length;
      for (let y = oldMatch.messages.length-1; 0 <= newMsgsCount || 0 <= y; y--, newMsgsCount--) {
        if (oldMatch.messages[y] && !oldMatch.messages[y]._id) {
          oldMatch.messages.splice(y,1);
        }
      }
      oldMatch.messages = oldMatch.messages.concat(newMsgs);

      /// merge seen:
      let lastSeenMsg = matchUpdate.seen ? matchUpdate.seen.last_seen_msg_id : null;
      if (lastSeenMsg) {
        if ( !oldMatch.seen) {
          oldMatch.seen = {};
        }
        oldMatch.seen.last_seen_msg_id = lastSeenMsg;
      }
    }
  }
///"matches":[{"seen":{"match_seen":true,"last_seen_msg_id":"5dfb961aaee4f0010041db9b"},"_id":"5b6cb323bda62dd93231bc685ddb4b7f765537010078d6f4","messages":[],"readreceipt":{"enabled":false}}],"blocks":[],"inbox":[],"liked_messages":[],"harassing_messages":[],"lists":[],"goingout":[],"deleted_lists":[],"squads":[],"last_activity_date":"2019-12-19T15:43:50.478Z","poll_interval":{"standard":2000,"persistent":60000}}
  markLastUneadMessages = (store, updates) => {
    let matches = updates.data.matches;
  //  console.log(matches);
    for (let i = 0; i < matches.length; i++) {
      let matchUpdate = matches[i];
      let oldMatch = store.getMatchById(matchUpdate._id);

      let newLastSeenMsgId = matchUpdate.seen ? matchUpdate.seen.last_seen_msg_id : null;
      let oldLastSeenMsgId = oldMatch.seen ? oldMatch.seen.last_seen_msg_id : null;
      var localUser = store.profile.data;
    //      console.log(newLastSeenMsgId + oldLastSeenMsgId + localUser);
      if (!newLastSeenMsgId || !localUser) {
        continue;
      }
      let newMsgs = matchUpdate.messages;
      console.log(matches);
      for (var ind = newMsgs.length-1; 0 <= ind; ind--) {
        let msg = newMsgs[ind];
          console.log(msg);
    console.log(localUser);
        if (msg.from && localUser._id && localUser._id !== msg.from) {
              console.log("inside");
              console.log(oldLastSeenMsgId !== newLastSeenMsgId);
          if (oldLastSeenMsgId !== newLastSeenMsgId) {
            this.addToUnreadMessagesBadge(oldMatch);
              console.log("msg");
                console.log(msg);
            break;
          }
        }
      }
    }
  }

  addToUnreadMessagesBadge = (mtch) => {
    let header = BeanContextAware.get('header1');
    console.log(mtch);
    if (header) {
    //  console.log(mtch);
      header.addMsgMatch(mtch)
    }
  }
  getUpdates = (lastDate) => { /// String requestJson = "{\"last_activity_date\": \"2019-11-11T01:58:00.404Z\"}";
    let header = BeanContextAware.get('header1');
    let chat1 = BeanContextAware.get('chat1');
    let data = {
      "last_activity_date": lastDate
    }
    let promise = AjaxService.doPost(Const.URLS.UPDATES, data, {});
    promise.then((data) => {
      if (store.update) {
        this.mergeUpdates(store, data);
        console.log(data.data);
      } else {
        store.addToStore('update', null);
        store.addToStore('update', data);
      //  this.mergeUpdates(store, data);
      }

      this.markLastUneadMessages(store, data);

      this.state.last_activity_date= data.data.last_activity_date;

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
        this.getUpdates(this.state.last_activity_date);
      }, 20000
    );
  }

}
export default new PollService();
