import React from 'react';

class OnePicWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: props.src
    };
    this.condition = props.condition;
    this.changeHandler = props.changeHandler;
    this.match = props.match;
  }

  componentWillUnmount() {
  }
  componentDidMount() {
  }

  doClick = (e) => {
    this.changeHandler(e, this.match);
  }

  render() {
    if (this.condition) {
      return (
        <div className="container-fluid px-0">
          <img onClick={this.doClick} src={this.state.imgSrc} alt="new" className='img-fluid w-100' />
        </div>
      );
    } else {
      return (
        <div onClick={this.doClick}>
          <label className="text-center">{this.match.person.name}</label>
        </div>
      );
    }

  }
}
export default OnePicWrapper;
