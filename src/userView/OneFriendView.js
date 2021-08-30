import React from 'react';
import "react-table/react-table.css"
import ReactTable from "react-table";
import BtnLink from "../building-blocks/BtnLink";
import Info from "../building-blocks/Info";
import NotesService from '../notes/NotesService';
import PicWrapper from "../building-blocks/PicWrapper";
import CashService from '../services/CashService';
import AjaxService from '../services/AjaxService';
import Const from '../services/Constants';

class OneFriendView extends React.Component {
  constructor(props) {
    super(props);
    this.allBookmarks = null;
  }

  remove = (userId) => {
    NotesService.removeBookmark(userId);
  }

  save = (userId) => {
    NotesService.saveBookmark(userId);
  }

  deleteMatch = (matchId) => {
    AjaxService.doDelete(Const.URLS.MATCH + matchId, {});
  }

  isBookmarked = (userId) => {
    return this.allBookmarks[userId] !== undefined && this.allBookmarks[userId] !== null;
  }

  render() {
    let { args } = this.props.location.state;
    console.log(args);

    this.allBookmarks = CashService.getBookmarksAsObject();
    let InfoWithButton = () => (
      <div>
        <BtnLink label="w" data={args} pathname="/chat" />
        <div className="mt-1">
          {!this.isBookmarked(args.person._id) ? <button type="button" className="btn btn-success"
            onClick={() => this.save(args.person._id)}> <span>s</span> </button> : null}

          {this.isBookmarked(args.person._id) ? <button type="button" className="btn btn-danger"
            onClick={() => this.remove(args.person._id)}> <span>s</span></button> : null}

          <button type="button" className="btn btn-danger ml-2 float-right" onClick={() => this.deleteMatch(args.id)}>x</button>
        </div>
        <Info person={args.person} />
      </div>
    )
    let person = [{
      image: (<PicWrapper photos={args.person.photos} name={args.person.name} />),
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

export default OneFriendView;