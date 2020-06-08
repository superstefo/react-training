import React from 'react';
import LocationPicker from "react-leaflet-location-picker";
import { withRouter } from 'react-router-dom'
import "react-table/react-table.css"
import ReactTable from "react-table";
import Checkbox from '../settings/Checkbox';
import Info from "../building-blocks/Info";
import PicWrapper from "../building-blocks/PicWrapper";
import AjaxService from '../services/AjaxService';
import store from '../store';
import Const from '../services/Constants';
import SelectDistanceFilter from './SelectDistanceFilter';
import SelectMinAgeFilter from './SelectMinAgeFilter';
import SelectMaxAgeFilter from './SelectMaxAgeFilter';

class UserView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: this.props?.data?.profile?.data,
      hits: [],
      error: null,
      distanceFilter: null,
      ageFilterMax: null,
      ageFilterMin: null,
      discoverable: false
    };
    this.isButtonDisabled = false;
    this.isLoading = false;
  }

  saveProfile = () => {
    let data = {
      age_filter_max: this.state.ageFilterMax,
      age_filter_min: this.state.ageFilterMin,
      distance_filter: this.state.distanceFilter,
      discoverable: this.state.discoverable
    }
    AjaxService.doPost(Const.URLS.PROFILE, data, {})
  }

  disableSaveButton = () => {
    if (this.state.ageFilterMax < this.state.ageFilterMin) {
      this.isButtonDisabled = false;
      return;
    }
    this.isButtonDisabled = true;
  }

  getProfile = () => {
    this.isLoading = true
    let promise = AjaxService.doGet(Const.URLS.PROFILE, {})
    promise.then((data) => {
      if (!data?.data) return;

      store.addToStore('profile', data);
      this.setState({
        distanceFilter: data.data.distance_filter,
        ageFilterMax: data.data.age_filter_max,
        ageFilterMin: data.data.age_filter_min,
        discoverable: data.data.discoverable,
        profile: data.data
      }, () => { this.isLoading = false })
    }).catch((e) => {
      console.error(e);
      this.isLoading = false
    })
  }

  componentWillMount() {
    if (this.isLoading) {
      return;
    }
    this.getProfile();
  }

  changeState = (obj) => {
    this.disableSaveButton();
    this.setState(obj);
  }

  toggleShowProfile = (event) => {
    this.setState({
      discoverable: event?.target?.checked
    })
  }

  render() {
    var profile = this.state?.profile
    if (!profile) {
      return (
        <div></div>
      )
    }

    let pos = profile?.pos ? [profile?.pos?.lat, profile?.pos?.lon] : [0, 0];

    let postLocation = (args) => {
      let newMsgObj = {
        lat: args[0],
        lon: args[1]
      }
      AjaxService.doPost(Const.URLS.SEND_LOCATION, newMsgObj, {})
    }

    let UserData = () => {
      return (
        <div>
          <Info person={profile} />
          <br />
          <SelectDistanceFilter initialRadius={this.state.distanceFilter} parentObject={this} />
          <SelectMinAgeFilter ageFilterMin={this.state.ageFilterMin} parentObject={this} />
          <SelectMaxAgeFilter ageFilterMax={this.state.ageFilterMax} parentObject={this} />
          <Checkbox label="public profile" condition={this.state.discoverable} changeHandler={this.toggleShowProfile} />
          <br />
          <button type="button" className="btn btn-primary" disabled={this.isButtonDisabled} onClick={this.saveProfile}> Save </button>
        </div>
      )
    }

    let person = [{
      image: (<PicWrapper photos={profile.photos} name={profile.name} />),
      info: (<UserData />)
    }]

    let present = [
      {
        columns: [
          {
            Header: "Photos",
            accessor: "image"
          },
          {
            Header: "Info",
            accessor: "info"
          }
        ]
      }
    ]

    let pointVals = [pos];
    const pointMode = {
      banner: false,
      control: {
        values: pointVals,
        onClick: point => {
          pointVals = [point]
          pointMode.control.values = [point];
          postLocation(point);
        },
        //  onRemove: point => { }
      }
    };

    const options = {
      bindMap: true,
      startPort: "default",
      overlayAll: true,
      showControls: false,
      showInputs: false,
      useDynamic: true,
      pointMode: pointMode,
      precision: 6
    };

    return (
      <div>
        <ReactTable
          data={person}
          columns={present}
          sortable={false}
          defaultPageSize={1}
          showPagination={false}
        />
        <br />
        <LocationPicker {...options} />
      </div>
    )
  }
}

export default withRouter(UserView);
//Request URL: https://api.gotinder.com/v2/profile?locale=en-GB
// Request Method: POST
// Status Code: 200 

// {user: {age_filter_min: 25, age_filter_max: 45}}
// {user: {discoverable: false, distance_filter: 24}}
