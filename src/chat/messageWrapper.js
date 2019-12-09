import React from 'react';

class MessageWrapper extends React.Component {
    constructor(props) {
        super(props);
        let { msg } = this.props;
        let date = new Date(msg.timestamp);
        this.state = {
            showDate: false,
            date: date.toDateString()
        };
    }

    render() {
        let { msg } = this.props;

        let showHideDate = () => {
            this.setState({ showDate: true });
            setTimeout(
                () => {
                    this.setState({ showDate: false });
                }, 5000);
        }

        return (
            <div onClick={showHideDate}>
                <p className="text-justify text-wrap" >  {msg.message} </p>
                {this.state.showDate ? (<p class="text-justify text-wrap" >  {this.state.date} </p>) : null}
            </div>
        );
    }
}
export default MessageWrapper;
