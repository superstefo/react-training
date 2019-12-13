import React from 'react';
import ReactTable from "react-table";
import { withRouter } from 'react-router-dom'
import store from '../store'
import EnterText from './enterText'
import MessageWrapper from './messageWrapper'
import BeanContextAware from '../services/BeanContextAware'
import Select from '../building-blocks/Select'

class Chat extends React.Component {
    constructor(props) {
        super(props);
        let match = props.location.state.data;
        let friendId = match.person._id;
        let lastSeenMsg = match.seen ? match.seen.last_seen_msg_id : null;
        this.state = {
            lastSeenMsg: lastSeenMsg,
            numberMsgShown: 10,
            matchId: match.id,
            store: store,
            match: store.getMatchById(match.id),
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
      console.log(this.state.match);
      let result = [];
      result.length = numberMsgShown;
      let isSeen = false;
      for (let ind = allMsgs.length - 1; 0 <= numberMsgShown; numberMsgShown--, ind--) {

        let msg = allMsgs[ind];

        if (!msg) {
          msg = {};
        }
        if (!isSeen && msg._id && msg._id === this.state.lastSeenMsg) {
          isSeen = true;
        }

        let transformedMsg = {};

        result[numberMsgShown] = transformedMsg;

        if (msg.from === friendId) {
            transformedMsg.theirs = (<MessageWrapper msg={msg} />);
        }
        else {
          msg.isSeen = isSeen;
          transformedMsg.mine = (<MessageWrapper msg={msg} />);

        }
      }
      return result;
    }

    //call it to start render() in order to visualize the change
    triggerRenderFunc = () => {
        let match = store.getMatchById(this.state.match._id)
        this.setState({
          match: match,
          messages: match.messages })
    }

    changeState = (obj) => {
      console.log(obj);
      this.setState(obj)
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

        console.log(reorderedMessages.length);
        let inputProps = {
            data: this.state.store,
            friendId: this.state.match.person._id,
            triggerRenderFunc: this.triggerRenderFunc
        }
        const tableStyle = {
        //  "borderBottom": "none",
        //  border: "none",
        //  boxShadow: "none",
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
