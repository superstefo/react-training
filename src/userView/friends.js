import React from 'react';
import store from '../store'
import { Link } from "react-router-dom";
import "react-table/react-table.css"
import ReactTable from "react-table";

class Friends extends React.Component {

  render() {
    let { data } = this.props;

    var friends = store.update.data.matches || data.matches;
    var Pic = (arg) => (
      <div>
        <Link to={{ pathname: "/friend", state: { args: arg.data } }}>
          <img src={arg.src} alt="new" />
        </Link>
      </div>
    )

    const persons = friends.map(friendship => {
      let prsn = friendship.person
      let obj = {
        firstName: prsn.name,
        lastName: prsn.birth_date,
        image: (<Pic src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" data={friendship} />)
        //   (<Pic src={prsn.photos[0].url} data={friendship} />)
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
            defaultPageSize={20}
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

        </div>

      </div>
    )
  }
}
export default Friends;