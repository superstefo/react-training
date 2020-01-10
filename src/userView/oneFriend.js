import React from 'react';
import "react-table/react-table.css"
import ReactTable from "react-table";
import BtnLink from "../building-blocks/BtnLink";
import Info from "../building-blocks/Info";
import NotesService from '../notes/NotesService';
import PicWrapper from "../building-blocks/PicWrapper";

class OneFriend extends React.Component {

  render() {
    let { args } = this.props.location.state;
    let InfoWithButton = () => (
      <div>
        <BtnLink label="Chat" data={args} pathname="/chat" />
        <div className="mt-1">
          <button type="button" className="btn btn-primary" onClick={() => this.save(args.person._id)}> Bookmark </button>
          <button type="button" className="btn btn-danger ml-2" onClick={() => NotesService.removeOneBookmark(args.person._id)}> Un-Bookmark </button>
          <button type="button" disabled={true} className="btn btn-danger ml-2" onClick={() => NotesService.saveOneBookmark(args.person._id)}> Unfriend </button>
        </div>
        <Info person={args.person}/>
      </div>
    ) 
    let person = [{
      image: (<PicWrapper photos={args.person.photos}  name={args.person.name}/>),
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
          />
          <br />
        </div>
      </div>
    )
  }
}

export default OneFriend;
