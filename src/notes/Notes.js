import React from 'react';
import "react-table/react-table.css"
import ReactTable from "react-table";
import Info from "../building-blocks/Info";
import PicWrapper from "../building-blocks/PicWrapper";
import NotesService from './NotesService';
import CashService from '../services/CashService';
import MatchDecoratorService from '../services/MatchDecoratorService';

class Notes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      match: null
    };
    this.index = 0;
  }

  componentWillMount() {
    let all = CashService.getBookmarks();

    let id = all[this.index]
    if (!id) {
      return;
    }
    let mtch = this.formDummyMatch(id);

    MatchDecoratorService.getUserData(mtch, this.callBack);
  }

  saveAllByPhone = function () {
    NotesService.saveAllByPhone()
  }

  getOne = function () {
    NotesService.getOne()
  }

  getBookmarks = function () {
    NotesService.getBookmarks()
  }

  delete = function () {
    NotesService.delete()
  }

  formDummyMatch(id) {
    return {
      person: { _id: id }
    }
  }

  callBack = (match) => {
    console.log(match);
    this.match = match;
    this.setState({
      match: match
    })
  }

  getNext = () => {
    let all = CashService.getBookmarks();

    if (this.index < all.length - 1) {
      this.index++;
    } else {
      this.index = 0;
    }
    let id = all[this.index]
    let mtch = this.formDummyMatch(id);
    MatchDecoratorService.getUserData(mtch, this.callBack);
  }

  render() {

    console.log(this.match);
    if (!this.match) {
      return (
        <div></div>
      )
    }
    let match = this.match;

    let InfoWithButton = () => (
      <div>
        <div className="mt-1">
          <button type="button" disabled={true} className="btn btn-danger" onClick={() => NotesService.removeOneBookmark(match?.person?._id)}> Un-Bookmark </button>
        </div>
        <Info person={match.person} />
      </div>
    )
    let Pic = args => (<PicWrapper photos={args.photos} name={args.name} />);
    let person = [{
      image: (<Pic photos={match?.user?.photos} name={match?.user?.name} />),
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
        <div>   <button type="button" className="btn btn-primary" onClick={this.getNext}> get next </button>
          <br />
          <div>
            <ReactTable
              data={person}
              columns={present}
              sortable={false}
              defaultPageSize={1}
              showPagination={false}
            />
          </div>
        </div>
      </div>
    )
  }
}
export default Notes;


