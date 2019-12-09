import React from 'react';
import Const from '../Constants';
import AjaxService from '../AjaxService'
import ReactTable from "react-table";
import { withRouter } from 'react-router-dom'
import store from '../store'
import EnterText from './enterText'
import MessageWrapper from './messageWrapper'
import PollService from '../PollService'

class Chat extends React.Component {
    constructor(props) {
        super(props);
        let match = props.location.state.data
        console.log(match);
        this.state = {
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
            if (msg.from == friendId) {
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
        let match =  store.getMatchById(this.state.match._id)
      //    console.log("triggerRenderFunc--------------------------------");

  //    this.setState({ messages: this.state.store.update.data.matches[index].messages  })
      this.setState({ messages: match.messages })

  }

    render() {

        let match = this.state.match;
        let messages = match.messages //this.state.messages
        //  console.log(messages);
        const present = [
            {
                columns: [
                    {
                        Header: match.person.name,
                        accessor: "theirs"
                    },
                    {
                        Header: "Me",
                        accessor: "mine"
                    }
                ]
            }
        ]

        var transformedd = this.prepareMessages(messages, match.person._id);

        // props for the  <EnterText  {...inputProps} />
        let inputProps = {
            data: this.state.store,
            friendId: this.state.match.person._id,
            triggerRenderFunc: this.triggerRenderFunc
        }

        return (

            <div>
                <div>
                    <ReactTable className="-striped -highlight"
                        data={transformedd}
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





//ssend message post
// Request URL: https://api.gotinder.com/user/matches/5db0afddaac4230100ca487b5deac762689584010078812e?locale=en-GB
// created_date: "2019-12-08T08:18:43.582Z"
// from: "5deac762689584010078812e"
// match_id: "5db0afddaac4230100ca487b5deac762689584010078812e"
// media: {width: null, height: null}
// message: "за неделята"
// sent_date: "2019-12-08T08:18:43.582Z"
// to: "5db0afddaac4230100ca487b"
// _id: "5decb1e34dc39b0100f9a8f2"

//https://api.gotinder.com/v2/profile?include=account%2Cboost%2Ccontact_cards%2Cemail_settings%2Cinstagram%2Clikes%2Cnotifications%2Cplus_control%2Cproducts%2Cpurchase%2Creadreceipts%2Cspotify%2Csuper_likes%2Ctinder_u%2Ctravel%2Ctutorials%2Cuser&locale=en-GB
//Request Method: GET

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
