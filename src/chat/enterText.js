import React from 'react';
import store from '../store'
import Const from '../Constants';
import AjaxService from '../AjaxService'


class EnterText extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            store: props.data,
            friendId: props.friendId,
            triggerRenderFunc: props.triggerRenderFunc
        }
    }
    render() {
        let createMessage = (match, store) => {
            var dt = new Date();
          //  console.log(store)
            return {
                created_date: dt.toISOString(),
                from: store.profile.data._id, //store.profile.data.user._id,
                match_id: match.id,
                message: this.state.value,
                sent_date: dt.toISOString(),
                timestamp: dt.getTime(),
                to: match.person._id//,
                //  _id: "5dde14c497d37f0100999c20"
            }
        }
        let onKeyPress = (e) => {
            if (e.key !== 'Enter') {
                return;
            }
          //  var elem = e.srcElement || e.target;

            let matches = store.update.data.matches;
            for (let index = 0; index < matches.length; index++) {
                const oneMatch = matches[index];

                if (oneMatch.person._id == this.state.friendId) {
                    let newMsgObj = createMessage(oneMatch, this.state.store);
                    //  let stre = store.getStore();
                    AjaxService.doPost(Const.URLS.SEND_MESSAGE, newMsgObj, {})
                    store.update.data.matches[index].messages.push(newMsgObj);
                  //  let update = stre.update
                  //  stre.addToStore("update", update)
                  //  console.log(stre.update);
                    this.state.triggerRenderFunc(index);
                    break;
                }
            }
            this.setState({ value: '' })
        }

        let onChange = (e) => {
            var elem = e.srcElement || e.target;
            this.setState({ value: elem.value })
        }

        const inputProps = {
            placeholder: 'Write...',
            value: this.state.value,
            onChange: onChange,
            onKeyPress: onKeyPress
        }

        return (
            <div>
                <input className='form-control' {...inputProps} type="text" />
            </div>
        )
    }
}
export default EnterText;
