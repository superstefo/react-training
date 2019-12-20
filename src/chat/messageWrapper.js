import React from 'react';

class MessageWrapper extends React.Component {
    constructor(props) {
      super(props);
      let { msg } = this.props;
      let msgDateObj = new Date(msg.timestamp);

      let dateStr = msgDateObj.toLocaleTimeString();

      if (dateStr !== new Date().toLocaleDateString()) {
        dateStr = dateStr + ",  " + msgDateObj.toLocaleDateString();
      }

      this.state = {
          isSeen: msg.isSeen,
          showDate: false,
          date: dateStr
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
                {this.state.isSeen ? (<span className="badge badge-secondary text-justify text-wrap">seen</span>) : null}
                {this.state.showDate ? (<span className="badge small" >  {this.state.date} </span>) : null}
            </div>
        );
    }
}
export default MessageWrapper;
