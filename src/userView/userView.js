import React from 'react';
import ReactDependentScript from "react-dependent-script";
import LocationPicker from "react-leaflet-location-picker";
import {withRouter}from 'react-router-dom'
import "react-table/react-table.css"
import ReactTable from "react-table";
import BtnLink from "../building-blocks/BtnLink";
import PicWrapper from "../building-blocks/PicWrapper";
import AjaxService from '../services/AjaxService'
import Const from '../services/Constants'

class UserView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      isLoading: false,
      error: null,
    };
  }
render() {

  const profile = this.props.data.profile.data
  console.log(profile);
  let prsn = {};
  let country = profile.country ? profile.country.name : null;
  let city = profile.city ? profile.city.name : null;
  let pos = profile.pos ? [profile.pos.lat, profile.pos.lon] : [0,0]
//  const { args } = this.props.location.state;
//let prsn = args.person;age_filter_max: 1000
// age_filter_min: 27
// bio: "Не влизам често тук... Гледам коя мацка си продава булчинската рокля в OLX и ѝ пиша там 😉"
// birth_date: "1984-08-01T00:00:00.000Z"
// can_create_squad: false
// create_date: "2019-11-25T03:33:19.501Z"
// discoverable: true
// distance_filter: 27
// email: "elken@abv.bg"
// facebook_id: "1547059308883468"
// gender: 0
// gender_filter: 1
// interested_in: [1]
// jobs: []
// name: "Stefan"
// photo_optimizer_enabled: true
// photos: [{…}]
// ping_time: "2019-12-11T20:58:32.073Z"
// pos: {at: 1576011762211, lat: 42.7565056, lon: 23.321804800000002}
// pos_info:
// city: {name: "Sofia", bounds: {…}}
// country: {name: "Bulgaria", cc: "BG", bounds: {…}}   <div> <BtnLink label="Chat" data={args} pathname="/chat" /></div>
  let Info = (args) =>{
    let profile = args.data;
    return (
      <div>
        <div> <h5>Name: </h5>{profile.name} </div>
        <div> <h5>Birth date: </h5>{profile.birth_date} </div>
        <div> <h5>Bio: </h5>{profile.bio} </div>
        <div> <h5>Location: </h5>{city},{country} </div>
      </div>
  )}

  let postLocation = (args) => {
    let newMsgObj = {
      lat: args[0],
      lon: args[1]
    }
    AjaxService.doPost(Const.URLS.SEND_LOCATION, newMsgObj, {})
  }

  let person = [{
    image: (<PicWrapper photos={profile.photos} />),
    info: (<Info data={profile}/>)
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
          console.log(pointVals);
            postLocation(point);
          },
        onRemove: point =>
          console.log("I've just been clicked for removal :(", point)
      }
    };

      const options = {
        bindMap: true,
        startPort: "default",// as "auto" | "default" | IViewport,
        overlayAll: true,
        showControls: false,
        showInputs: true,
        useDynamic: true,
        pointMode:  pointMode,
        precision: 6
    };

  return (
    <div>
      <div>
        <ReactTable
          data={person}
          columns={present}
          defaultPageSize={1}
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
        <br />
      </div> <LocationPicker {...options} />;
    </div>
  )
}
}

export default withRouter(UserView);
