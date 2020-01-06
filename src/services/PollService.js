import React from 'react';
import Const from './Constants';
import AjaxService from './AjaxService';
import BeanContextAware from './BeanContextAware';
import AppSettingsService from '../settings/AppSettingsService';
import store from '../store';

class PollService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.last_activity_date = "1984-08-01T00:00:00.000Z";
  };

  checkIfLogged = (headers, onSuccess, onFailure) => {
    let promise = AjaxService.doGet(Const.URLS.PROFILE, headers)
    promise.then((data) => {
      store.addToStore('profile', data);
      onSuccess()
      this.getUpdates(this.getLastActivityDate());
      this.startUpdatePoll(AppSettingsService.updatePollInterval);

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
        this.addToUnreadMessagesBadge(matchUpdate);
        break;
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
        store.addToStore('update', data);
      }

      this.markLastUneadMessages(store, data);

      /// merge global (updates polling) last_activity_date:
      this.last_activity_date = data.data.last_activity_date;

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
      }
      this.stopUpdatePoll();
      console.log(e);
    })
  }

  startUpdatePoll = (seconds) => {
    if (!seconds) {
      console.error("error null val for 'seconds'");
      return;
    }
    this.stopUpdatePoll();
    this.pollInterval = seconds
    this.pollIntervalObj = setInterval(
      () => {
        this.getUpdates(this.getLastActivityDate());
      }, seconds
    );
  }

  getLastActivityDate = () => {
    return this.last_activity_date;
  }

  stopUpdatePoll = () => {
    if (this.pollIntervalObj) {
      clearTimeout(this.pollIntervalObj)
    }
  }
}
export default new PollService();
