import React from "react";
import { NavLink, Link } from "react-router-dom";
import BeanContextAware from '../services/BeanContextAware'


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
    this.setState(obj)
  }

  addMsgMatch = (mtch) => {
    var pos = this.findInMsgMatches(mtch);
    if (pos > -1) { // if found - do not add it again
      return;
    }
    let msgMatches = this.state.msgMatches
    this.state.msgMatches.push(mtch)
    this.setState({
      msgMatches: msgMatches
    })
    this.startFlashTabTitle();
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
      this.stopFlashTabTitle();
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

  startFlashTabTitle = () => {
    if (this.state.msgMatches.length > 0) {
     // return;
    }
    this.stopFlashTabTitle();
    this.flashIntervalObj = setInterval(
      () => {
        if ( this.initialTitle === document.title) {
          document.title = this.state.msgMatches.length + " "+ this.initialTitle;
        } else {
          document.title = this.initialTitle;  
        }
      }, 2000
    );
  }

  stopFlashTabTitle = () => {
    //if (this.flashIntervalObj && this.state.msgMatches.length == 0) {
      clearTimeout(this.flashIntervalObj);
      document.title = this.initialTitle;  
    //}
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

    let BtnBadge = (props) => (
      <div>
        <Link to={{ pathname: props.pathname, state: { data: props.data } }}>
          <button type="button" className="btn btn-primary" >
            {props.label} new: {this.state.msgMatches.length}
          </button>
        </Link>
      </div>
    )
    let isVisibleNewMsgs = this.state.msgMatches.length ? true : false
    return (
      <div className="text-center ">
        <nav>
          <div className="btn-group">
            {!this.state.isVisible ? <Btn to="/home" label="Home" /> : null}
            {this.state.isVisible ? <Btn to="/user" label="User" /> : null}
            {this.state.isVisible ? <Btn to="/pals" label="Pals" /> : null}
            {this.state.isVisible ? <Btn to="/more-pals" label="More Pals" /> : null}
            {this.state.isVisible ? <Btn to="/settings" label="Settings" /> : null}
            {this.state.isVisible ? <Btn to="/logout" label="|->" /> : null}
            {(this.state.isVisible && isVisibleNewMsgs) ? <BtnBadge pathname="/chat" data={this.state.msgMatches[0]} label="Chat" /> : null}

          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
