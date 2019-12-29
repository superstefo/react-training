import React from 'react';
import store from '../store'
import Const from '../services/Constants';
import AjaxService from '../services/AjaxService';
import AppSettingsService from '../settings/AppSettingsService';

class EnterText extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            store: props.data,
            friendId: props.friendId,
            triggerRenderFunc: props.triggerRenderFunc
        }
        this.getStyles = AppSettingsService.getInputStyleClasses;
    }

    createMessage = (match, store) => {
        var dt = new Date();
        return {
            created_date: dt.toISOString(),
            from: store.profile.data._id,
            match_id: match.id,
            message: this.state.value,
            sent_date: dt.toISOString(),
            timestamp: dt.getTime(),
            to: match.person._id
        }
    }

    onKeyPress = (e) => {
        if (e.key !== 'Enter') {
            return;
        }

        let matches = store.update.data.matches;
        for (let index = 0; index < matches.length; index++) {
            const oneMatch = matches[index];

            if (oneMatch.person._id == this.state.friendId) {
                let newMsgObj = this.createMessage(oneMatch, this.state.store);
                AjaxService.doPost(Const.URLS.SEND_MESSAGE, newMsgObj, {})
                store.update.data.matches[index].messages.push(newMsgObj);
                this.state.triggerRenderFunc();
                break;
            }
        }
        this.setState({ value: '' });
    }

    onChange = (e) => {
        var elem = e.srcElement || e.target;
        this.setState({ value: elem.value })
    }

    render() {
        let inputProps = {
            placeholder: 'Write...',
            value: this.state.value,
            onChange: this.onChange,
            className: this.getStyles(),
            onKeyPress: this.onKeyPress
        }

        return (
            <div>
                <input {...inputProps} type="text" />
            </div>
        )
    }
}
export default EnterText;
