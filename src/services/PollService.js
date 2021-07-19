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
    this.BASE_DATE = "1984-08-01T00:00:00.000Z";
    this.last_activity_date = this.BASE_DATE;
    this.exceptionCount = 0;
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
    let matches = updates?.data?.matches || [];

    for (let i = 0; i < matches.length; i++) {
      let matchUpdate = matches[i];
      let oldMatch = store.getMatchById(matchUpdate._id);
      //merge brand new matches:
      if (!oldMatch) {
        store.getStore().update.data.matches.push(matchUpdate);
        this.addToUnreadMessagesBadge(matchUpdate);
        continue;
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
      if (!oldMatch.seen) {
        oldMatch.seen = {};
      }

      let lastSeenMsg = matchUpdate?.seen?.last_seen_msg_id;
      if (!!lastSeenMsg) {
        oldMatch.seen.last_seen_msg_id = lastSeenMsg;
      }

      /// merge last_activity_date:
      oldMatch.last_activity_date = matchUpdate?.last_activity_date || oldMatch.last_activity_date || this.BASE_DATE;
    }
  }

  markLastUnreadMessages = (store, updates) => {
    let matches = updates?.data?.matches;

    for (let i = 0; i < matches?.length; i++) {
      let matchUpdate = matches[i];
      let oldMatch = store.getMatchById(matchUpdate._id);

      let newLastSeenMsgId = matchUpdate?.seen?.last_seen_msg_id;
      let oldLastSeenMsgId = oldMatch?.seen?.last_seen_msg_id;
      let localUser = store?.profile?.data;

      if (!localUser || !localUser._id) {
        continue;
      }
      let newMsgs = matchUpdate.messages;

      for (var ind = newMsgs.length - 1; 0 <= ind; ind--) {
        let msg = newMsgs[ind];

        if (!msg.from) {
          continue;
        }

        if (localUser._id !== msg.from) {
          if ((msg._id !== newLastSeenMsgId) || (!newLastSeenMsgId && !oldLastSeenMsgId)) {
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

      this.markLastUnreadMessages(store, data);

      /// merge global (updates polling) last_activity_date:
      this.last_activity_date = data.data.last_activity_date;

      if (chat1) chat1.triggerRenderFunc();
      if (header) header.changeButtonVisibility({ isVisible: true });

      this.exceptionCount = 0;

    }).catch((e) => {
      console.error(e);

      if (header) header.changeButtonVisibility({ isVisible: false })

      if (this.isToStopUpdatePoll(e)) this.stopUpdatePoll();

      this.exceptionCount++
    })
  }

  isToStopUpdatePoll = (exception) => {
    if (this.exceptionCount > 2) {
      return true;
    }
    return false;
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
////update after 'like' no messages - {"matches":[{"seen":{"match_seen":false},"_id":"59c7cb4e539465f9756024295f26954c5497b601005dc564","id":"59c7cb4e539465f9756024295f26954c5497b601005dc564","closed":false,"common_friend_count":0,"common_like_count":0,"created_date":"2020-08-07T15:03:11.262Z","dead":false,"last_activity_date":"2020-08-07T15:03:11.262Z","message_count":0,"messages":[],"muted":false,"participants":["59c7cb4e539465f975602429"],"pending":false,"is_super_like":false,"is_boost_match":false,"is_super_boost_match":false,"is_experiences_match":false,"is_fast_match":false,"is_opener":false,"person":{"_id":"59c7cb4e539465f975602429","birth_date":"1987-08-10T15:03:43.687Z","gender":1,"name":"Paloma","ping_time":"2014-12-09T00:00:00.000Z","photos":[{"id":"d3d917a3-c69d-42dc-89b0-6ec1669dcec5","url":"https://images-ssl.gotinder.com/59c7cb4e539465f975602429/1080x1080_d3d917a3-c69d-42dc-89b0-6ec1669dcec5.jpg","processedFiles":[{"url":"https://images-ssl.gotinder.com/59c7cb4e539465f975602429/640x640_d3d917a3-c69d-42dc-89b0-6ec1669dcec5.jpg","height":640,"width":640},{"url":"https://images-ssl.gotinder.com/59c7cb4e539465f975602429/320x320_d3d917a3-c69d-42dc-89b0-6ec1669dcec5.jpg","height":320,"width":320},{"url":"https://images-ssl.gotinder.com/59c7cb4e539465f975602429/172x172_d3d917a3-c69d-42dc-89b0-6ec1669dcec5.jpg","height":172,"width":172},{"url":"https://images-ssl.gotinder.com/59c7cb4e539465f975602429/84x84_d3d917a3-c69d-42dc-89b0-6ec1669dcec5.jpg","height":84,"width":84}],"fileName":"d3d917a3-c69d-42dc-89b0-6ec1669dcec5.jpg","extension":"jpg"}]},"following":true,"following_moments":true,"readreceipt":{"enabled":false}}],"blocks":[],"inbox":[],"liked_messages":[],"harassing_messages":[],"lists":[],"goingout":[],"deleted_lists":[],"squads":[],"last_activity_date":"2020-08-07T15:03:11.262Z","poll_interval":{"standard":2000,"persistent":60000}}
/// after my message is sent - {"matches":[{"seen":{"match_seen":false},"_id":"59c7cb4e539465f9756024295f26954c5497b601005dc564","last_activity_date":"2020-08-07T15:05:46.219Z","messages":[{"_id":"5f2d6dca47d1400100fe5f04","match_id":"59c7cb4e539465f9756024295f26954c5497b601005dc564","sent_date":"2020-08-07T15:05:46.219Z","message":"ммм... много закачлива усмивка \uD83D\uDE09","to":"59c7cb4e539465f975602429","from":"5f26954c5497b601005dc564","created_date":"2020-08-07T15:05:46.219Z","timestamp":1596812746219}],"is_new_message":true,"readreceipt":{"enabled":false}}],"blocks":[],"inbox":[],"liked_messages":[],"harassing_messages":[],"lists":[],"goingout":[],"deleted_lists":[],"squads":[],"last_activity_date":"2020-08-07T15:05:46.219Z","poll_interval":{"standard":2000,"persistent":60000}}
/// their first message - {"matches":[{"seen":{"match_seen":false},"_id":"5de0287220298d0100540ea05f26954c5497b601005dc564","last_activity_date":"2020-08-07T15:53:30.726Z","messages":[{"_id":"5f2d78faf6162301001219ba","match_id":"5de0287220298d0100540ea05f26954c5497b601005dc564","sent_date":"2020-08-07T15:53:30.726Z","message":"И двете","to":"5f26954c5497b601005dc564","from":"5de0287220298d0100540ea0","created_date":"2020-08-07T15:53:30.726Z","timestamp":1596815610726}],"is_new_message":true,"readreceipt":{"enabled":false}}],"blocks":[],"inbox":[],"liked_messages":[],"harassing_messages":[],"lists":[],"goingout":[],"deleted_lists":[],"squads":[],"last_activity_date":"2020-08-07T15:53:30.726Z","poll_interval":{"standard":2000,"persistent":60000}}


