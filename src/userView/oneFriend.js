import React, {Component} from 'react';
import store from '../store'
import { NavLink, Link  } from "react-router-dom";
import "react-table/react-table.css"
import ReactTable from "react-table";

class PicWrapper extends React.Component {
  constructor(props) {
    super(props);
    let {photos} = this.props;
    this.state = {
      photos: photos,
      imgSrc: photos[0].url,
      count: 0
    };
  }

  render() {
    let click = () => {
      if (this.state.count < this.state.photos.length-1) {
           this.state.count ++;
      } else {
        this.state.count = 0;
      }
      this.setState({
         imgSrc: this.state.photos[this.state.count].url
       });
    }
    return (
      <div>
        <img onClick={click}  src={this.state.imgSrc}/>
      </div>
    );
  }
}

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
  //  let {data} = this.props;
  //  var friends =  store.update.data.matches || data.matches  ;
    let { args } = this.props.location.state;
    let prsn = args.person;
    let Info = () => (
      <div>
        <h3>Name: </h3>{prsn.name}
        <h3>Bio: </h3>{prsn.birth_date}
      </div>
    )
    let person = [{
      image: (<PicWrapper photos={args.person.photos} />),
      person: args.person,
      info: (<Info />)
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

    return (
      <div>
            <div>
              <ReactTable className="-striped -highlight"
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
