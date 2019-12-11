import React from 'react';
import ReactTable from "react-table";
import { withRouter } from 'react-router-dom'
import store from '../store'
import EnterText from './enterText'
import MessageWrapper from './messageWrapper'
import BeanContextAware from '../services/BeanContextAware'

class Chat extends React.Component {
    constructor(props) {
        super(props);
        let match = props.location.state.data;
        let friendId = match.person._id;
        console.log(friendId);
        console.log(match);
        this.state = {
            pageSize: 10,
            matchId: match.id,
            store: store,
            match: store.getMatchById(match.id),
            friendId: friendId,
            messages: match.messages
        };
          console.log(this.state.match);
    }
    componentDidMount() {
      BeanContextAware.add(this);
    }

    componentWillUnmount() {
      BeanContextAware.remove(this);
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

    //call it to start render() in order to visualize the change
    triggerRenderFunc = () => {
        let match =  store.getMatchById(this.state.match._id)
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
export default withRouter(Chat);
