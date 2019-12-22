import React from 'react';

class PicWrapper extends React.Component {
  constructor(props) {
    super(props);
    let { photos } = this.props;
    this.state = {
      photos: photos,
      imgSrc: photos[0].url,
      count: 0
    };
  }

  componentWillUnmount() {
    console.log(this.state.imgSrc);
  }
  componentDidMount() {

  }
  render() {
    let click = () => {
      if (this.state.count < this.state.photos.length - 1) {
        this.setState({ count: this.state.count + 1 });
      } else {
        this.setState({ count: 0 });
      }
      this.setState({
        imgSrc: this.state.photos[this.state.count].url
      });
    }
    return (
      <div className="container-fluid px-0">
        <img onClick={click} src={this.state.imgSrc} alt="some image" className='img-fluid w-100' />
      </div>
    );
  }
}
export default PicWrapper;
