import React from "react";
import { NavLink } from "react-router-dom";
import BeanContextAware from '../services/BeanContextAware';
import CashService from '../services/CashService';
import store from '../store';
import MatchDecoratorService from '../services/MatchDecoratorService';
import { withRouter } from 'react-router-dom';
import PollService from "../services/PollService";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beanId: props.beanId,
      showUser: false,
      isVisible: false,
      isVisibleMoreFriendsTab: false,
      msgMatches: []
    };
    this.initialTitle = document.title;
  }

  changeState = (obj) => {
    this.setState(obj);
  }

  addMsgMatch = (mtch) => {
    var pos = this.findInMsgMatches(mtch);
    if (pos > -1) { // if found - do not add it again
      return;
    }
    let msgMatches = this.state.msgMatches;
    this.state.msgMatches.push(mtch);
    this.setState({
      msgMatches: msgMatches
    })
    this.toggleFlashTabTitle();
  }

  findInMsgMatches = (mtch) => {
    let msgMatches = this.state.msgMatches
    for (var i = 0, len = msgMatches.length; i < len; i++) {
      if (msgMatches[i].id === mtch.id)
        return i;
    }
    return -1;
  }

  removeMsgMatch = (mtch) => {
    var pos = this.findInMsgMatches(mtch);
    if (pos > -1) {
      let msgMatches = this.state.msgMatches
      msgMatches.splice(pos, 1);
      this.setState(
        { msgMatches: msgMatches },
        () => this.toggleFlashTabTitle()
      )
    }
  }

  showMoreFriendsRefreshButton = () => {
    this.setState({ isVisibleMoreFriendsTab: true });
  }

  hideMoreFriendsRefreshButton = () => {
    this.setState({ isVisibleMoreFriendsTab: false });
  }

  changeButtonVisibility = (obj) => {
    this.setState(obj);
  }

  componentDidMount() {
    BeanContextAware.add(this);
  }

  componentWillUnmount() {
    BeanContextAware.remove(this);
  }

  toggleFlashTabTitle = () => {
    if (this.state.msgMatches.length > 0 && !this.flashIntervalObj) {
      this.startFlashTabTitle();
    } else if (this.state.msgMatches.length === 0) {
      this.stopFlashTabTitle();
    }
  }

  startFlashTabTitle = () => {
    this.flashIntervalObj = setInterval(
      () => {
        if (this.initialTitle === document.title) {
          document.title = "(" + this.state.msgMatches.length + ") " + this.initialTitle;
        } else {
          document.title = this.initialTitle;
        }
      }, 800
    );
  }

  stopFlashTabTitle = () => {
    clearTimeout(this.flashIntervalObj);
    this.flashIntervalObj = null;
    document.title = this.initialTitle;
  }

  getUserData = (match) => {
    let clBack = (match) => {
      this.props.history.push({
        pathname: '/friend',
        state: { args: match }
      })
    }
    MatchDecoratorService.getUserData(match, clBack);
  }

  goChat = (match) => {
    this.props.history.push({
      pathname: '/chat',
      state: { data: match }
    })
  }

  getNewFriends = () => {
    let moreFriends1 = BeanContextAware.get('moreFriends1');
    if (this.state.isVisible && moreFriends1?.isMountedOk) {
      moreFriends1.getNewFriends(moreFriends1.getBookmarksAsObject)
    }
  }

  updateFromBackend = () => {
    PollService.getUpdates();
  }

  render() {
    let isMobile = CashService.isMobile();
    let Btn = (props) => (
      <div>
        <NavLink exact activeClassName="active" to={props.to}>
          <button type="button" {...props} className="btn btn-primary">
            {props.label}
          </button>
        </NavLink>
      </div>
    )
    let isVisibleNewMsgs = this.state.msgMatches.length ? true : false;

    let BtnBadge = (props) => {
      let mtch = props.data;
      if (!mtch.messages || mtch.messages.length === 0) {
        return (
          <div>
            <button onClick={() => { this.removeMsgMatch(mtch); this.getUserData(mtch) }} className="btn btn-primary" >
              {this.state.msgMatches.length} </button>
          </div>
        )
      } else {
        return (
          <div>
            <button onClick={() => this.goChat(mtch)} className="btn btn-primary" >
              {this.state.msgMatches.length} </button>
          </div>
        )
      }
    }
    let isVisible = this.state.isVisible;
    let localUser = store?.profile?.data;
    let username = CashService.getPhone() || "N/A";
    let length = CashService.getPhone()?.length || 3;
    username = username?.substring(length - 3)
    return (
      <nav>
        <div className="text-center">
          <div className="btn-group">
            <Btn to="/user" hidden={!localUser} label={username} />
            <Btn to="/pals" hidden={!isVisible} label="🤝" />
            <Btn to="/more-pals" onClick={this.getNewFriends} hidden={!isVisible} label="🌍" />
            <Btn to="/pal-requests" hidden={!isVisible || isMobile} label="👋" />
            <Btn to="/notes" hidden={!isVisible || isMobile} label="📑" />
            <Btn to="/see-user" hidden={!isVisible || isMobile} label="👀" />
            <button type="button" className="btn btn-primary" hidden={!isVisible || !isMobile} onClick={this.updateFromBackend}>🔄</button>
            {isVisibleNewMsgs ? <BtnBadge data={this.state.msgMatches[0]} /> : null}
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Header);