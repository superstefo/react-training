import React from 'react';
import ReactTable from "react-table";
import { withRouter } from 'react-router-dom'
import store from '../store'
import EnterText from './enterText'
import MessageWrapper from './messageWrapper'
import BeanContextAware from '../services/BeanContextAware'
import Select from '../building-blocks/Select'
import Const from '../services/Constants';
import AjaxService from '../services/AjaxService'

class Chat extends React.Component {
  constructor(props) {
    super(props);
    let match = props.location.state.data;
    //  console.log(match);
    let friendId = match.person._id;
    let lastSeenMsg = match.seen ? match.seen.last_seen_msg_id : null;
    this.state = {
      lastSeenMsg: lastSeenMsg,
      numberMsgShown: 10,
      matchId: match.id,
      store: store,
      match: match,
      friendId: friendId,
      messages: match.messages
    };
  }

  componentDidMount() {
    BeanContextAware.add(this);
  }

  componentWillUnmount() {
    BeanContextAware.remove(this);
  }

  prepareMessages = (allMsgs, friendId, numberMsgShown) => {
    let result = [];
    result.length = numberMsgShown;

    for (let ind = allMsgs.length - 1; 0 <= numberMsgShown; numberMsgShown-- , ind--) {

      let msg = allMsgs[ind];

      if (!msg) {
        msg = {};
      }

      let transformedMsg = {};
      result[numberMsgShown] = transformedMsg;

      if (msg.from === friendId) {
        transformedMsg.theirs = (<MessageWrapper msg={msg} />);
      }
      else {
        transformedMsg.mine = (<MessageWrapper msg={msg} />);
      }
    }

    return result;
  }

  //call it to start render() in order to visualize the change
  triggerRenderFunc = () => {
    let match = store.getMatchById(this.state.match._id)
    console.log(match);
    let lastSeenMsg = match.seen ? match.seen.last_seen_msg_id : null;
    this.setState({
      lastSeenMsg: lastSeenMsg,
      match: match,
      messages: match.messages
    }
    )
  }

  changeState = (obj) => {
    this.setState(obj)
  }

  sendSeen = (allMsgs) => {
    if (!this.state.lastSeenMsg) {
      console.log("empty value...");
    }

    for (let ind = allMsgs.length - 1; 0 <= ind; ind--) {

      let msgWrapped = allMsgs[ind];

      if (!msgWrapped || !msgWrapped.theirs) {
        continue;
      }
      let msg = msgWrapped.theirs.props.msg;

      if (msg._id !== this.state.lastSeenMsg) {
        AjaxService.doGet(Const.URLS.SEND_SEEN + msg.match_id + "/" + msg._id, {});
        let match = this.state.match;
        if (match.seen) {
          match.seen.last_seen_msg_id = msg._id;
        }

        this.deleteFromHeader();
        return;
      }
      if (msgWrapped.theirs) {
        break;
      }
    }
  }

  deleteFromHeader = () => {
    let header = BeanContextAware.get('header1');
    if (header) {
      header.removeMsgMatch(this.state.match);
    }
  }

  render() {
    const present = [
      {
        columns: [
          {
            Header: this.state.match.person.name,
            accessor: "theirs"
          },
          {
            Header: "Me",
            accessor: "mine"
          }
        ]
      }
    ]
    var reorderedMessages = this.prepareMessages(this.state.messages, this.state.friendId, this.state.numberMsgShown);
    this.sendSeen(reorderedMessages);
    let inputProps = {
      data: this.state.store,
      friendId: this.state.match.person._id,
      triggerRenderFunc: this.triggerRenderFunc
    }
    const tableStyle = {
      width: '100%',
      height: '30%',
      //  backgroundColor: '#dadada'
    };


    return (
      <div><Select />
        <div>
          <ReactTable className=""
            data={reorderedMessages}
            columns={present}
            defaultPageSize={reorderedMessages.length}
            pageSize={reorderedMessages.length}
            showPagination={false}
            bordered={false}
            sortable={false}
            style={tableStyle}
            getTdProps={(state, rowInfo, column, instance) => {
              return {
                onClick: (e, handleOriginal) => {
                  if (handleOriginal) {
                    handleOriginal()
                  }
                }
              }
            }}
          />
          <div>
            <EnterText {...inputProps} />
          </div>
          <br />
        </div>
      </div>
    )
  }
}
export default withRouter(Chat);
