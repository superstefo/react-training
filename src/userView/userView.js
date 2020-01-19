import React from 'react';
import LocationPicker from "react-leaflet-location-picker";
import { withRouter } from 'react-router-dom'
import "react-table/react-table.css"
import ReactTable from "react-table";
import Info from "../building-blocks/Info";
import PicWrapper from "../building-blocks/PicWrapper";
import AjaxService from '../services/AjaxService'
import Const from '../services/Constants'

class UserView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: this.props?.data?.profile?.data,
      hits: [],
      isLoading: false,
      error: null,
    };
  }
  render() {
    var profile = this.state?.profile
    if (!profile) {
      return (
        <div></div>
      )
    }
    let pos = profile?.pos ? [profile.pos.lat, profile.pos.lon] : [0, 0]

    let postLocation = (args) => {
      let newMsgObj = {
        lat: args[0],
        lon: args[1]
      }
      AjaxService.doPost(Const.URLS.SEND_LOCATION, newMsgObj, {})
    }

    let person = [{
      image: (<PicWrapper photos={profile.photos} name={profile.name} />),
      info: (<Info person={profile} />)
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
        <div>
          <ReactTable
            data={person}
            columns={present}
            sortable={false}
            defaultPageSize={1}
            showPagination={false}
          />
          <br />
        </div><LocationPicker {...options} />
      </div>
    )
  }
}

export default withRouter(UserView);
