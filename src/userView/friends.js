import React from 'react';
import { Field, reduxForm } from 'redux-form'
import store from '../store'
import {Provider } from 'react-redux'
import OneFriend from './oneFriend'
import namor from "namor";
//import "./index.css";
import { NavLink, Link  } from "react-router-dom";
import {render} from "react-dom";
import "react-table/react-table.css"

import ReactTable from "react-table";

class Friends extends React.Component {

  render() {
    let {data} = this.props;
  ///  console.log("---------------------------- friens");   <OneFriend data={one.person}/>
    //global.tostr(data)

    var friends =  store.update.data.matches || data.matches  ;
    // let fields = options.fields;
 console.log(friends)

//global.tostr(friends)
//    console.log("============================= --------------------yyyyyyyyyyyyyyyy--- ---------------------" + friends.length);
    // const All = () => (
    //
    //   <div> <h3>Friends: </h3>
    //     {
    //     friends.map(one => (
    //         <OneFriend key={one._id} data={one} />
    //     )
    //     )
    //     }
    //   </div>
    // )
    var Pic = (arg) => (
      <div>
        <Link to={{ pathname: "/friend", state: {args: arg.data}  }}>
          <img  src={arg.src} alt="new"/>
        </Link>
      </div>
    )

    const persons = friends.map(friendship => {
      let prsn = friendship.person
      let obj = {
        firstName: prsn.name,
        lastName: prsn.birth_date,
        image: (<Pic src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" data={friendship} />)
        // (<img  src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"  alt="new"  />)
         //(<Pic src={prsn.photos[0].url} />)
      }
      return { ...obj};
    });

//     console.log(persons)



  const present =  [
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
                      // console.log('A Td Element was clicked!')
                      // console.log('it produced this event:', e)
                      // console.log('It was in this column:', column)
                      // console.log('It was in this row:', rowInfo)
                      console.log('It was in this table instance:', instance)

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
export default Friends



/////////////
//        <NavLink exact activeClassName="active" to={arg.path}>
//          <img  src={arg.src} alt="new"/>
//        </NavLink>
// import { render } from "react-dom";
// import { makeData, Logo, Tips } from "./Utils";
// import "./index.css";
//
// // Import React Table
// import ReactTable from "react-table";
// import "react-table/react-table.css";
//
// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       data: makeData()
//     };
//   }
//   render() {
//     const { data } = this.state;
//     return (
//       <div>
//         <ReactTable
//           data={data}
//           columns={[
//             {
//               Header: "Name",
//               columns: [
//                 {
//                   Header: "First Name",
//                   accessor: "firstName"
//                 },
//                 {
//                   Header: "Last Name",
//                   id: "lastName",
//                   accessor: d => d.lastName
//                 }
//               ]
//             },
//             {
//               Header: "Info",
//               columns: [
//                 {
//                   Header: "Age",
//                   accessor: "age"
//                 }
//               ]
//             }
//           ]}
//           defaultPageSize={20}
//           style={{
//             height: "400px" // This will force the table body to overflow and scroll, since there is not enough room
//           }}
//           className="-striped -highlight"
//         />
//         <br />
//         <Tips />
//         <Logo />
//       </div>
//     );
//   }
// }
//
// render(<App />, document.getElementById("root"));
