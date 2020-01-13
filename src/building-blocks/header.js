import React from "react";
import { NavLink } from "react-router-dom";
import BeanContextAware from '../services/BeanContextAware';
import MatchDecoratorService from '../services/MatchDecoratorService';
import { withRouter } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beanId: props.beanId,
      showUser: false,
      isVisible: false,
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
      this.setState({
        msgMatches: msgMatches
      })
      this.toggleFlashTabTitle();
    }
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
    } else if (this.state.msgMatches.length = 0) {
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
      }, 1000
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

  render() {
    let Btn = (props) => (
      <div>
        <NavLink exact activeClassName="active" to={props.to}>
          <button type="button" className="btn btn-primary">
            {props.label}
          </button>
        </NavLink>
      </div>
    )
    let isVisibleNewMsgs = this.state.msgMatches.length ? true : false;

    let BtnBadge = (props) => {
      let mtch = props.data;
      if (!mtch.messages || mtch.messages.length == 0) {
        return (
          <div>
            <button onClick={() =>{ this.removeMsgMatch(mtch); this.getUserData(mtch)}} className="btn btn-primary" > 
            New: {this.state.msgMatches.length} </button>
          </div>
        )
      } else {
        return (
          <div>
            <button onClick={() => this.goChat(mtch)} className="btn btn-primary" > 
            New: {this.state.msgMatches.length} </button>
          </div>
        )
      }
    }

    return (
      <div className="text-center ">
        <nav>
          <div className="btn-group">
            {!this.state.isVisible ? <Btn to="/home" label="Home" /> : null}
            {this.state.isVisible ? <Btn to="/user" label="User" /> : null}
            {this.state.isVisible ? <Btn to="/pals" label="Pals" /> : null}
            {this.state.isVisible ? <Btn to="/more-pals" label="More Pals" /> : null}
            {this.state.isVisible ? <Btn to="/settings" label="Settings" /> : null}
            {true ? <Btn to="/notes" label="Notes" /> : null}
            {this.state.isVisible ? <Btn to="/logout" label="|->" /> : null}
            {(this.state.isVisible && isVisibleNewMsgs) ? <BtnBadge data={this.state.msgMatches[0]} /> : null}
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Header);