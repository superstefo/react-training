import React from 'react';
//import Const from '../services/Constants';
//import AjaxService from '../services/AjaxService'
import ReactTable from "react-table";
import { withRouter } from 'react-router-dom'
import store from '../store'
import EnterText from './enterText'
import MessageWrapper from './messageWrapper'
import PollService from '../services/PollService'

class Chat extends React.Component {
    constructor(props) {
        super(props);
        let match = props.location.state.data
        console.log(match);
        this.state = {
            pageSize: 10,
            store: store,
            match: match,
            friendId: match.person._id,
            messages: match.messages
        };
        PollService.registerCallback(this.triggerRenderFunc)
    }
    prepareMessages = (allMsgs, friendId) => {
        var result = [];
        let numberSown = 10;
        let startIndex = allMsgs.length - numberSown;
        if (startIndex < 0) {
            startIndex = 0;
        }
        for (; startIndex < allMsgs.length; startIndex++) {
            let msg = allMsgs[startIndex];

            let transformedMsg = {};
            result.push(transformedMsg);
            if (msg.from === friendId) {
                transformedMsg.theirs = (<MessageWrapper msg={msg} />);
            }
            else {
                transformedMsg.mine = (<MessageWrapper msg={msg} />);
            }
        }
        return result;
    }
    componentWillUnmount() {
      console.log('will unmount1111111111111111');
    }
    useEffect() {
      console.log('will useEffect');
    }

    //call it to start render() in order to visualize the change
    triggerRenderFunc = () => {
        let match =  store.getMatchById(this.state.match._id)
        //console.log(match.messages);
        //this.setState({ messages: this.state.store.update.data.matches[0].messages  })
      this.setState({ messages: match.messages })
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

        var reorderedMessages = this.prepareMessages(this.state.messages, this.state.friendId);

        let inputProps = {
            data: this.state.store,
            friendId: this.state.match.person._id,
            triggerRenderFunc: this.triggerRenderFunc
        }

        return (
            <div>
                <div>
                    <ReactTable className="-striped -highlight"
                        data={reorderedMessages}
                        columns={present}
                        defaultPageSize={10}
                        showPagination={false}
                        style={{
                            width: '100%',
                            height: '30%',
                            //  backgroundColor: '#dadada'
                        }}
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
                        <EnterText  {...inputProps} />
                    </div>
                    <br />
                </div>
            </div>
        )
    }
}
export default withRouter(Chat)

// post get messages anf changes pool every few seconds       {"nudge":true,"last_activity_date":"2019-12-08T08:42:58.661Z"}
// https://api.gotinder.com/updates?locale=en-GB
// {
// blocks: []
// deleted_lists: []
// goingout: []
// harassing_messages: []
// inbox: []
// last_activity_date: "2019-12-08T08:18:43.582Z"
// liked_messages: []
// lists: []
// matches: [{seen: {match_seen: true, last_seen_msg_id: "5decb0e9a3e07701007e06d3"},…}]
// 0: {seen: {match_seen: true, last_seen_msg_id: "5decb0e9a3e07701007e06d3"},…}
// is_new_message: true
// last_activity_date: "2019-12-08T08:18:43.582Z"
// messages: [{_id: "5decb1e34dc39b0100f9a8f2", match_id: "5db0afddaac4230100ca487b5deac762689584010078812e",…}]
// 0: {_id: "5decb1e34dc39b0100f9a8f2", match_id: "5db0afddaac4230100ca487b5deac762689584010078812e",…}
// readreceipt: {enabled: false}
// seen: {match_seen: true, last_seen_msg_id: "5decb0e9a3e07701007e06d3"}
// last_seen_msg_id: "5decb0e9a3e07701007e06d3"
// match_seen: true
// _id: "5db0afddaac4230100ca487b5deac762689584010078812e"
// poll_interval: {standard: 2000, persistent: 60000}
// squads: []
// }
