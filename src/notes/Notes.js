import React from 'react';
import "react-table/react-table.css"
import ReactTable from "react-table";
import Info from "../building-blocks/Info";
import PicWrapper from "../building-blocks/PicWrapper";
import NotesService from './NotesService';
import CashService from '../services/CashService';
import AjaxService from '../services/AjaxService';
import Const from '../services/Constants';
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
    this.allBookmarks = CashService.getBookmarksAsObject();
    let all = CashService.getBookmarks();

    let id = all[this.index]
    if (!id) {
      return;
    }
    let mtch = this.formDummyMatch(id);

    MatchDecoratorService.getUserData(mtch, this.processUserData);
  }

  saveAllByPhone = function () {
    NotesService.saveAllByPhone();
  }

  getOne = function () {
    NotesService.getOne();
  }

  getBookmarks = function () {
    NotesService.getBookmarks();
  }

  removeBookmark = function (userId) {
    NotesService.removeBookmark(userId);
    this.index--;
  }

  formDummyMatch(id) {
    return {
      person: { _id: id }
    }
  }

  pass = (userId) => {
    let promise = AjaxService.doGet(Const.URLS.PASS + userId, {})
    promise.then((data) => {
    }).catch((e) => {
      console.log(e);
    })
  }

  like = (userId) => {
    let promise = AjaxService.doGet(Const.URLS.LIKE + userId, {})
    promise.then((data) => {
      console.log(data);
    }).catch((e) => {
      console.log(e);
    })
  }

  processUserData = (match) => {
    if (!!match?.person?.error) {
      try {
        console.log('User id: ' + match?.person?._id + " will be removed from Bookmarks list");
        NotesService.removeBookmark(match?.person?._id);
        this.match = null;
      } catch (error) {
        console.error(error);
      }
    }
    this.match = match;
    this.setState({
      match: match
    })
  }

  get = (step) => {
    let all = CashService.getBookmarks();

    this.index = this.index + step;

    if (this.index < 0) {
      this.index = all.length - 1;
    } else if (this.index > all.length - 1) {
      this.index = 0;
    }
    
    let id = all[this.index];

    if (!id) {
      console.error("'id' is " + id);
      return;
    }
    let mtch = this.formDummyMatch(id);
    MatchDecoratorService.getUserData(mtch, this.processUserData);
  }

  isBookmarked = (userId) => {
    return this.allBookmarks[userId] !== undefined && this.allBookmarks[userId] !== null;
  }

  render() {
    if (!this.match) {
      return (
        <div>
          <button type="button" className="btn btn-primary" onClick={() => this.get(-1)}> ⬅️ </button>
          <button type="button" className="btn btn-primary" onClick={() => this.get(1)}> ➡️ </button>
        </div>
      )
    }
    let match = this.match;

    let InfoWithButton = () => {
      let userId = match?.person?._id;
      let isBookmarked = this.isBookmarked(userId);
      return (

        <div>
          <div className="text-justify text-wrap">
            <button type="button" className="btn btn-success" onClick={() => this.like(userId)}> 👍 </button>
            <button type="button" className="btn btn-danger" onClick={() => this.pass(userId)}> 👎 </button>

            {!isBookmarked ? <button type="button" className="btn btn-primary float-right ml-1"
              onClick={() => NotesService.saveBookmark(userId)}> 📑 </button> : null}

            {isBookmarked ? <button type="button" className="btn btn-danger float-right ml-1"
              onClick={() => NotesService.removeBookmark(userId)}> 📑 </button> : null}

          </div>
          <Info person={match?.person} />
        </div>
      )
    }
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
        <div className="text-justify text-wrap text-center float-center">
          <button type="button" className="btn btn-primary" onClick={() => this.get(-1)}> ⬅️ </button>
          <button type="button" disabled={true} className="btn btn-secondary"> {this.index + 1} of {CashService.getBookmarks()?.length} </button>
          <button type="button" className="btn btn-primary" onClick={() => this.get(1)}> ➡️ </button>
        </div>
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
    )
  }
}
export default Notes;





