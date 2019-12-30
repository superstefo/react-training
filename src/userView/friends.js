import React from 'react';
import store from '../store'
import { Link } from "react-router-dom";
import "react-table/react-table.css"
import ReactTable from "react-table";

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

  render() {
    let dt = store.getStore();

    let friends = dt.update.data.matches;

    this.applySorting(friends, this.state.sortingFunc);

    var Pic = (arg) => (
      <div className="container-fluid px-0">
        <Link to={{ pathname: "/friend", state: { args: arg.data } }}>
          <img src={arg.src} alt="new" className='img-fluid w-100' />
        </Link>
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
            style={{
              width: '100%',
              height: '30%',
              //  backgroundColor: '#dadada'
            }}
          />
          <br />
        </div>
      </div>
    )
  }
}
export default Friends;
