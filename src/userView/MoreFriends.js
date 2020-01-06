import React from 'react';
import "react-table/react-table.css"
import ReactTable from "react-table";
import AjaxService from '../services/AjaxService';
import Const from '../services/Constants';
import PicWrapper from "../building-blocks/PicWrapper";
import BtnLink from "../building-blocks/BtnLink";
import Info from "../building-blocks/Info";

class MoreFriends extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allFr: []
    };
    this.abortController = new AbortController();
  }

  componentDidMount() {
    this.getNewFriends();
  }

  getNewFriends = () => {
    let promise = AjaxService.doGet(Const.URLS.NEW_FRIENDS, {})
    promise.then((data) => {
      let allFr = data.data.results;
      this.setState({ allFr: allFr });
    }).catch((e) => {
      console.log(e);
    })
  }

  pass = (userId) => {
    let promise = AjaxService.doGet(Const.URLS.PASS + userId, {})
    promise.then((data) => {
    }).catch((e) => {
      console.log(e);
    })
  }

  like = (userId) => {
    let promise = AjaxService.doGet(Const.URLS.LIKE + userId, {})
    promise.then((data) => {
      console.log(data);
    }).catch((e) => {
      console.log(e);
    })
  }

  render() {
    let InfoWrapper = (args) => {
      let { person } = args;

      return (
        <div className="text-justify text-wrap">
          <div>
            <button type="button" className="btn btn-success" onClick={() => this.like(person._id)}> Like </button>
            <button type="button" className="btn btn-danger ml-2" onClick={() => this.pass(person._id)}> Pass </button>
          </div>
          <Info person={person} />
        </div>
      )
    }

    let Pic = args => (<PicWrapper photos={args.photos} name={args.name}/>)

    let allFr = this.state.allFr;

    let persons = allFr.map(one => {
      let obj = {
        info: (<InfoWrapper person={one} />),
        image: (<Pic photos={one.photos} name={one.name} />)
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
        <div className="text-justify text-center">
          <BtnLink label="Friend Requests" data={null} pathname="/pal-requests" />
          <button type="button" className="btn btn-primary" onClick={this.getNewFriends}> Reload </button>
        </div>

        <div>
          <ReactTable className="-striped -highlight"
            data={persons}
            columns={present}
            sortable={false}
            defaultPageSize={persons.length}
            pageSize={persons.length}
            showPagination={false}
          />
          <br />
        </div>
      </div>
    )
  }
}
export default MoreFriends;