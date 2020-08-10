import React from 'react';
import CashService from './services/CashService';
import AppSettingsService from './settings/AppSettingsService';
import PollService from './services/PollService';
import NotesService from './notes/NotesService';
import Home from './Home';
import PhoneForm from './auth/PhoneForm';
import PhoneToken from './auth/PhoneToken';
import ConfirmCode from './auth/confirmCode';
import UserView from './userView/userView';
import Friends from './userView/friends';
import OneFriend from './userView/OneFriend';
import MoreFriends from './userView/MoreFriends';
import FriendRequests from './userView/FriendRequests';
import AppSettings from './settings/AppSettings';
import Header from './building-blocks/header';
import Chat from './chat/chat.js';
import Notes from './notes/Notes';
import store from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


const App = () => {
  return (
    <div className="container" style={{ paddingTop: 10 }}>

      <Router>
        <Header beanId="header1" />
        <Switch>
          < Route exact path="/" component={Home} />
          < Route path="/user" render={() => <UserView data={store} />} />
          < Route path="/phone" component={PhoneForm} />
          < Route path="/phone-token" component={PhoneToken} />
          < Route path="/friend" component={OneFriend} />
          < Route path="/chat" render={() => <Chat beanId="chat1"/>} />
          < Route path="/notes" render={() => <Notes beanId="notes1"/>} />
          < Route path="/pals" render={() => <Friends data={store.updates} />} />
          < Route path="/more-pals" render={() => <MoreFriends data={store.updates} beanId="moreFriends1"/>} />
          < Route path="/pal-requests" render={() => <FriendRequests data={store.updates} />} />
          < Route path="/settings"render={() => <AppSettings beanId="appSettings1"/>} />
          < Route path="/confirm-token" component={ConfirmCode} />
          < Route path="*" component={Home} />
        </Switch>
      </Router>
    </div >
  );
};

export default App;