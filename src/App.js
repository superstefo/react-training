import React from 'react';
import Home from './Home';
import PhoneForm from './auth/PhoneForm';
import ConfirmCode from './auth/confirmCode';
import UserView from './userView/userView';
import Friends from './userView/friends';
import OneFriend from './userView/oneFriend';
import MoreFriends from './userView/MoreFriends';
import Header from './building-blocks/header';
import Chat from './chat/chat.js';
import store from './store';
import PollService from './services/PollService';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


const App = (props) => {
  return (
    <div className="container" style={{ paddingTop: 10 }}>

      <Router>
        <Header beanId="header1" />
        <Switch>
          < Route exact path="/" component={Home} />
          < Route path="/phone" component={PhoneForm} />
          < Route path="/friend" component={OneFriend} />
          < Route path="/chat" render={() => <Chat beanId="chat1"/>} />
          < Route path="/pals" render={() => <Friends data={store.updates} />} />
          < Route path="/more-pals" render={() => <MoreFriends data={store.updates} />} />
          < Route path="/user" render={() => <UserView data={store} />} />
          < Route path="/confirm-token" component={ConfirmCode} />
          < Route path="*" component={Home} />
        </Switch>
      </Router>
    </div >
  );
};

export default App;