import React, { Component } from 'react';
import "react-table/react-table.css"
import ReactTable from "react-table";
import BtnLink from "../building-blocks/BtnLink";

class PicWrapper extends React.Component {
  constructor(props) {
    super(props);
    let { photos } = this.props;
    this.state = {
      photos: photos,
      imgSrc: photos[0].url,
      count: 0
    };
  }

  render() {
    let click = () => {
      if (this.state.count < this.state.photos.length - 1) {
        this.setState({count: this.state.count + 1});
      } else {
        this.setState({count: 0});
      }
      this.setState({
        imgSrc: this.state.photos[this.state.count].url
      });
    }
    return (
      <div>
        <img onClick={click} src={this.state.imgSrc} alt="some image" />
      </div>
    );
  }
}

class OneFriend extends Component {

  render() {
    const { args } = this.props.location.state;
    let prsn = args.person;
    let Info = () => (
      <div> <div> <BtnLink label="Chat" data={args} pathname="/chat" /></div>
        <div> <h3>Name: </h3>{prsn.name} </div>
        <div> <h3>Bio: </h3>{prsn.birth_date} </div>
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
