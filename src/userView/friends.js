import React from 'react';
import store from '../store';
import AjaxService from '../services/AjaxService';
import Const from '../services/Constants';
import "react-table/react-table.css"
import ReactTable from "react-table";
import { withRouter } from 'react-router-dom';

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUser: false,
      isVisible: false,
      msgMatches: [],
      sortingFunc: this.sortByLastActivityDate
    };
  }

  sortByLastActivityDate = (a, b) => {
    let timeA = new Date(a.last_activity_date).getTime();
    let timeB = new Date(b.last_activity_date).getTime();
    return timeB - timeA;
  }

  applySorting = (arrToBeSorted, sortingFunc) => {
    try {
      arrToBeSorted.sort(sortingFunc);
    } catch (e) {
      console.error(e);
    }
    return arrToBeSorted;
  }

  getMoreData = (args) => {
    let userId = args.data.person._id;
    let promise = AjaxService.doGet(Const.URLS.USER + userId, {});
    promise.then((data) => {
      args.data.user = data.data.results;
      args.data.person.distance_mi = data.data.results.distance_mi;
      this.props.history.push({
        pathname: '/friend',
        state: { args: args.data }
      })
    }).catch((e) => {
      console.error(e);
    })
  }

  render() {
    let dt = store.getStore();

    let friends = dt.update.data.matches;

    this.applySorting(friends, this.state.sortingFunc);

    var Pic = (arg) => (
      <div className="container-fluid px-0">
          <img src={arg.src} alt="new" className='img-fluid w-100' onClick={() => this.getMoreData(arg)}/>
      </div>
    )

    let persons = friends.map(friendship => {
      let prsn = friendship.person
      let obj;
      if (prsn) {
       obj = {
        firstName: prsn.name,
        lastName: prsn.birth_date,
        image: (<Pic src={prsn.photos[0].url} data={friendship} />)
      }
    }
      return { ...obj };
    });

    const present = [
      {
        columns: [
          {
            Header: "Image",
            accessor: "image"
          },
          {
            Header: "First Name",
            accessor: "firstName"
          }
        ]
      }
    ]

    return (
      <div>
        <div>
          <ReactTable className="-striped -highlight"
            data={persons}
            columns={present}
            defaultPageSize={persons.length}
            pageSize={persons.length}
            sortable={false}
            showPagination={false}
          />
          <br />
        </div>
      </div>
    )
  }
}

export default withRouter(Friends);