import React from 'react';
import AppSettingsService from '../settings/AppSettingsService';

class PicWrapper extends React.Component {
  constructor(props) {
    super(props);
    let { photos, name } = this.props;
    this.personName = name;

    this.isToShowPhotos = AppSettingsService.isToShowPhotos;
    this.ind = 0;

    let imgSrc = this.isToShowPhotos ? photos?.[this.ind]?.url : null;

    this.state = {
      photos: photos,
      imgSrc: imgSrc
    };
  }

   nextPic = () => {
    if (!this.isToShowPhotos) {
      return;
    }
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
    if (!this.state.imgSrc) {
      return (
        <div>
        </div>
      )
    } else if (this.isToShowPhotos) {
      return (
        <div className="container-fluid px-0">
          <img onClick={this.nextPic} src={this.state.imgSrc} alt="some image" className='img-fluid w-100' />
        </div>
      );
    } else {
      return (
        <div>
          <label className="text-center">{this.personName} </label>
        </div>
      );
    }

  }
}
export default PicWrapper;
