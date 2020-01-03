import React from 'react';

class PicWrapper extends React.Component {
  constructor(props) {
    super(props);
    let { photos } = this.props;
    this.ind = 0;
    this.isToShowPic = true;
    this.state = {
      photos: photos,
      imgSrc: photos[this.ind].url
    };
  }

  componentWillUnmount() {
  }
  componentDidMount() {
  }

  click = () => {
    if (this.state.photos.length < 2) {
      return;
    }
    if (this.ind < this.state.photos.length - 1) {
      this.ind++;
    } else {
      this.ind = 0;
    }
    this.setState({
      imgSrc: this.state.photos[this.ind].url
    });
  }

  render() {
    return (
      <div className="container-fluid px-0">
        <img onClick={this.click} src={this.state.imgSrc} alt="some image" className='img-fluid w-100' />
      </div>
    );
  }
}
export default PicWrapper;
