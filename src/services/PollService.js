import React from 'react';
import Const from './Constants';
import AjaxService from './AjaxService'
import CashService from './CashService';
import BeanContextAware from './BeanContextAware'
import ReactDOM from 'react-dom';
import Header from '../building-blocks/header';
import store from '../store'


//let appSettings1 = BeanContextAware.get('appSettings1');

  // if (appSettings1) {
  //   appSettings1.changeState({ numberMsgShown: 33});
  // }


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
    //this.checkIfLogged();
  };

  checkIfLogged = (headers, onSuccess, onFailure) => {
    let promise = AjaxService.doGet(Const.URLS.PROFILE, headers)
    promise.then((data) => {
      store.addToStore('profile', data);
      onSuccess()
      this.getUpdates()
      this.startUpdatePoll(60000);

    }).catch((e) => {
      console.error(e);
      onFailure()
    })
  }

  mergeUpdates = (store, updates) => {
    let matches = updates.data.matches;
    for (let i = 0; i < matches.length; i++) {
      let matchUpdate = matches[i];
      let oldMatch = store.getMatchById(matchUpdate._id);
      //merge brand new matches:
      if (!oldMatch) {
        store.getStore().update.data.matches.push(matchUpdate);
      }

      //merge new messages:
      let newMsgs = matchUpdate.messages;
      let newMsgsCount = newMsgs.length;
      for (let y = oldMatch.messages.length - 1; 0 <= newMsgsCount || 0 <= y; y-- , newMsgsCount--) {
        if (oldMatch.messages[y] && !oldMatch.messages[y]._id) {
          oldMatch.messages.splice(y, 1);
        }
      }
      oldMatch.messages = oldMatch.messages.concat(newMsgs);

      /// merge seen:
      let lastSeenMsg = matchUpdate.seen ? matchUpdate.seen.last_seen_msg_id : null;
      if (lastSeenMsg) {
        if (!oldMatch.seen) {
          oldMatch.seen = {};
        }
        oldMatch.seen.last_seen_msg_id = lastSeenMsg;
      }

      /// merge last_activity_date:
      let lastActivityDate = matchUpdate.last_activity_date ? matchUpdate.last_activity_date : null;
      if (lastActivityDate) {
        oldMatch.last_activity_date = lastActivityDate;
      }
    }
  }

  markLastUneadMessages = (store, updates) => {
    let matches = updates.data.matches;

    for (let i = 0; i < matches.length; i++) {
      let matchUpdate = matches[i];
      let oldMatch = store.getMatchById(matchUpdate._id);

      let newLastSeenMsgId = matchUpdate.seen ? matchUpdate.seen.last_seen_msg_id : null;
      let oldLastSeenMsgId = oldMatch.seen ? oldMatch.seen.last_seen_msg_id : null;
      var localUser = store.profile.data;

      newLastSeenMsgId = newLastSeenMsgId || oldLastSeenMsgId;
      if (!newLastSeenMsgId || !localUser || !localUser._id) {
        continue;
      }
      let newMsgs = matchUpdate.messages;

      for (var ind = newMsgs.length - 1; 0 <= ind; ind--) {
        let msg = newMsgs[ind];

        if (!msg.from) {
          continue;
        }

        if (localUser._id !== msg.from) {

          if (msg._id !== newLastSeenMsgId) {
            this.addToUnreadMessagesBadge(oldMatch);
          }
          break;
        }
      }
    }
  }

  addToUnreadMessagesBadge = (mtch) => {
    let header = BeanContextAware.get('header1');
    console.log(mtch);
    if (header) {
      header.addMsgMatch(mtch)
    }
  }

  getUpdates = (lastDate) => {
    let header = BeanContextAware.get('header1');
    let chat1 = BeanContextAware.get('chat1');
    let data = {
      "last_activity_date": lastDate
    }

    let promise = AjaxService.doPost(Const.URLS.UPDATES, data, {});
    promise.then((data) => {
      if (store.update) {
        this.mergeUpdates(store, data);
      } else {
        store.addToStore('update', null);
        store.addToStore('update', data);
      }

      this.markLastUneadMessages(store, data);

      this.state.last_activity_date = data.data.last_activity_date;

      if (chat1) {
        chat1.triggerRenderFunc();
      }
      if (header) {
        header.changeButtonVisibility({ isVisible: true });
      }
    }).catch((e) => {
      if (header) {
        console.log("get updates errror ");
        header.changeButtonVisibility({ isVisible: false })
       this.stopUpdatePoll();
     
      }
      console.log(e);
    })
  }

  startUpdatePoll = (seconds) => {
    this.stopUpdatePoll();
    this.pollInterval = setInterval(
      () => {
        this.getUpdates(this.state.last_activity_date);
      }, seconds
    );
  }

  stopUpdatePoll = () => {
    if (this.pollInterval) {
      clearTimeout(this.pollInterval)
    }
  }
}
export default new PollService();
