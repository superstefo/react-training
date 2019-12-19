import React from 'react';
import "react-table/react-table.css"
import ReactTable from "react-table";
import BtnLink from "../building-blocks/BtnLink";
import Info from "../building-blocks/Info";
import PicWrapper from "../building-blocks/PicWrapper";

class OneFriend extends React.Component {

  render() {
    const { args } = this.props.location.state;
    let InfoWithButton = () => (
      <div>
        <BtnLink label="Chat" data={args} pathname="/chat" />
        <Info person={args.person}/>
      </div>
    )
    let person = [{
      image: (<PicWrapper photos={args.person.photos} />),
    //  person: args.person,
      info: (<InfoWithButton />)
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
          <ReactTable
            data={person}
            columns={present}
            sortable={false}
            defaultPageSize={1}
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

export default OneFriend;
