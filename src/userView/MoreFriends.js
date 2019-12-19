import React from 'react';
import store from '../store'
import { Link } from "react-router-dom";
import "react-table/react-table.css"
import ReactTable from "react-table";
import AjaxService from '../services/AjaxService'
import Const from '../services/Constants';
import PicWrapper from "../building-blocks/PicWrapper";
import BtnLink from "../building-blocks/BtnLink";
import Info from "../building-blocks/Info";

class MoreFriends extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allFr: [],
      hits: [],
      isLoading: false,
      error: null,
    };
    this.abortController = new AbortController();
    console.log("constructor");
  }
  componentWillMount(){
    console.log('component  Will    Mount ');
  }
componentWillUnmount(){
  console.log('component  Will   унннннн Mount ');
  this.abortController.abort()
}
  getNewFriends = () => {
    let promise = AjaxService.doGet(Const.URLS.NEW_FRIENDS, {})
    promise.then((data) => {
      let allFr = data.data.results;
      store.addToStore('newfriends', allFr);
      console.log(allFr);
      this.setState({allFr: allFr});
    }).catch((e) => {
      console.log(e);
    })
  }

  getMeta = () => {
    let promise = AjaxService.doGet('http://localhost:8080/meta', {})
    promise.then((data) => {

      console.log(data);

    }).catch((e) => {
      console.log(e);
    })
  }
  getMeta2 = () => {
    let promise = AjaxService.doGet('http://localhost:8080/meta2', {})
    promise.then((data) => {

      console.log(data);

    }).catch((e) => {
      console.log(e);
    })
  }
  getFrreq = () => {
    let promise = AjaxService.doGet('http://localhost:8080/friend-requests', {})
    promise.then((data) => {

      console.log(data);

    }).catch((e) => {
      console.log(e);
    })
  }

  getMatches = () => {
    let promise = AjaxService.doGet('http://localhost:8080/matches', {})
    promise.then((data) => {

      console.log(data);

    }).catch((e) => {
      console.log(e);
    })
  }
  hideAge = () => {
      let promise = AjaxService.doPost('http://localhost:8080/profile', {}, {});
      promise.then((data) => {
        console.log(data);
      //  history.push('/confirm-token');
      }).catch((e) => {
        console.log(e);
      })
    }
  componentDidMount(){
    console.log('component   Did  Mount   First this called');
    this.getNewFriends();
  }

  render() {
    console.log("render()");

  //let prsn = args.person;  <div> <BtnLink label="Chat" data={args} pathname="/chat" /></div>

    let allFr = this.state.allFr;

    const persons = allFr.map(one => {

      let obj = {
        info: (<Info person={one} />),
        image: (<PicWrapper photos={one.photos} />)
      }
      return { ...obj };
    });

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

    return (
      <div>
      <button type="button" onClick={this.getNewFriends} className="btn btn-primary">  Get New Friends  </button>
      <button type="button" onClick={this.getFrreq} className="btn btn-primary">  Get Fried requests  </button>
      <button type="button" onClick={this.getMeta} className="btn btn-primary">  Get Meta  </button>
      <button type="button" onClick={this.getMeta2} className="btn btn-primary">  Get Meta2  </button>
      <button type="button" onClick={this.getMatches} className="btn btn-primary">  Get Matches  </button>

        <div>
          <ReactTable className="-striped -highlight"
            data={persons}
            columns={present}
            sortable={false}
            defaultPageSize={persons.length}
            pageSize={persons.length}
            showPagination={false}
            style={{
              width: '100%',
              height: '30%',
            }}
          />
          <br />
        </div>
      </div>
    )
  }
}
export default MoreFriends;
