import React, {Component} from 'react';
import store from '../store'
import { NavLink, Link  } from "react-router-dom";
import "react-table/react-table.css"
import ReactTable from "react-table";



class OneFriend extends Component {
  constructor(props) {
    super(props);
      let {args} = this.props;
  }

  componentDidMount () {
    const { args } = this.props.location.state;
    console.log(args);
  }

  render() {
    let {data} = this.props;
  ///  console.log("---------------------------- friens");   <OneFriend data={one.person}/>
    //global.tostr(data)

    var friends =  store.update.data.matches || data.matches  ;
    // let fields = options.fields;
 //console.log(friends)
 const { args } = this.props.location.state;
 console.log(args);
console.log(args.person);
  console.log(args.person.photos);

    var Pic = (photos) => (
      <div>
          <img  src={photos[0].url} alt="new"/>
          <img  src={photos[1].url} alt="new"/>
      </div>
    )

    const person = () => {
      let prsn = args.person
      let obj = {
        firstName: prsn.name,
        lastName: prsn.birth_date//,
      //  image: (<Pic src={prsn.photos} />)
      }
      return [obj];
    }

     console.log(person())



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
          },
          {
            Header: "Firssdfsdme",
            accessor: "firstName"
          }
        ]
      }
    ]

    return (
      <div>
            <div>
              <ReactTable className="-striped -highlight"
                data={person()}
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

  export default OneFriend;





//
//
//
//
// import React from 'react';
// import { Field, reduxForm } from 'redux-form'
// import store from '../store'
// import {Provider } from 'react-redux'
//
//
//
// class OneFriend extends React.Component {
//
//   render() {
//     const {data} = this.props;
//   //  console.log("---------------------------- OneFriend 00000000000000");
//     //  global.tostr(data)
//     //console.log(    data);
//
//      let OneFr = () => (
//         <div>  "bio: "
//           {data.person.bio  }
//        </div>
//      )
//
//
//
//     return (
//       <OneFr />
//     )
//   }
// }
// export default OneFriend
