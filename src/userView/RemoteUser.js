import React from 'react';
import "react-table/react-table.css"
import ReactTable from "react-table";
import Info from "../building-blocks/Info";
import PicWrapper from "../building-blocks/PicWrapper";
import NotesService from '../notes/NotesService';
import CashService from '../services/CashService';
import AjaxService from '../services/AjaxService';
import Const from '../services/Constants';

class RemoteUser extends React.Component {
  constructor(props) {
    super(props);
    this.index = 0;
  }

  componentDidMount() {
    let args = this.props?.location?.state;
    this.allBookmarks = CashService.getBookmarksAsObject();
    this.setState({ user: args })
  }


  saveAllByPhone = function () {
    NotesService.saveAllByPhone();
  }

  getOne = function () {
    NotesService.getOne();
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
    }).catch((e) => {
      console.log(e);
    })
  }

  isBookmarked = (userId) => {
    return this.allBookmarks[userId] !== undefined && this.allBookmarks[userId] !== null;
  }

  render() {

    let user = this.state?.user;
    if (!user) {
      return <div></div>
    }
    if (!!user?.user_interests) {
      user.interests = user?.user_interests?.selected_interests;
    }

    let InfoWithButton = () => {
      let userId = user?._id;

      let isBookmarked = this.isBookmarked(userId);
      return (
        <div className="text-justify text-wrap">
          <button type="button" className="btn btn-success" onClick={() => this.like(userId)}>y</button>
          <button type="button" className="btn btn-danger" onClick={() => this.pass(userId)}>n</button>

          {!isBookmarked ? <button type="button" className="btn btn-primary float-right ml-1"
            onClick={() => NotesService.saveBookmark(userId)}>s</button> : null}

          {isBookmarked ? <button type="button" className="btn btn-danger float-right ml-1"
            onClick={() => NotesService.removeBookmark(userId)}>s</button> : null}
          <br />
          <Info person={user} />
        </div>
      )
    }
    let Pic = args => (<PicWrapper photos={args.photos} name={args.name} />);
    let person = [{
      image: <Pic photos={user?.photos} name={user?.name} />,
      info: <InfoWithButton />
    }]

    let present = [
      {
        columns: [
          {
            Header: "Photos",
            accessor: "image"
          },
          {
            Header: user._id || "inf",
            accessor: "info"
          }
        ]
      }
    ]

    return (
      <div>
        <ReactTable
          data={person}
          columns={present}
          sortable={false}
          defaultPageSize={1}
          showPagination={false}
        />
      </div>
    )
  }
}
export default RemoteUser;





