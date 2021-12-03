import React from 'react';
import "react-table/react-table.css"
import ReactTable from "react-table";
import AjaxService from '../services/AjaxService';
import NotesService from '../notes/NotesService';
import CashService from '../services/CashService';
import Const from '../services/Constants';
import BeanContextAware from '../services/BeanContextAware';
import PicWrapper from "../building-blocks/PicWrapper";
import BtnLink from "../building-blocks/BtnLink";
import Info from "../building-blocks/Info";
import FriendRequests from './FriendRequests';

class MoreFriends extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      beanId: props.beanId,
      allFr: []
    };
    this.friendRequestPicIds = "";
    this.isMountedOk = true;
    this.allBookmarks = null;
  }

  getBookmarksAsObject = () => {
    this.allBookmarks = CashService.getBookmarksAsObject();
  }

  componentDidMount() {
    BeanContextAware.add(this);
    this.getFriendRequests();
    this.isMountedOk = true;
    let header = BeanContextAware.get('header1');
    if (header) {
      header.showMoreFriendsRefreshButton();
    }
  }


  getFriendRequests = () => {
    let promise = AjaxService.doGet(Const.URLS.FAST_MATCH, {})
    promise.then((data) => {
      if (!data?.data?.data?.results) {
        return;
      }
      let picIds = "";
      data.data.data.results.forEach(like => { picIds = picIds + like.user.photos[0].id + " " })
      this.friendRequestPicIds = picIds;

      this.getNewFriends(this.getBookmarksAsObject);

    }).catch((e) => {
      console.log(e);
    })
  }

  componentWillUnmount() {
    BeanContextAware.remove(this);
    this.isMountedOk = false;
    let header = BeanContextAware.get('header1');
    if (header) {
      header.hideMoreFriendsRefreshButton()
    }
  }

  getNewFriends = (callBack) => {
    let promise = AjaxService.doGet(Const.URLS.NEW_FRIENDS, {})
    promise.then((data) => {
      let allFr = data?.data?.results;
      if (!this.isMountedOk) {
        return;
      }
      callBack()
      this.setState({ allFr: allFr });
    }).catch((e) => {
      console.log(e);
    })
  }

  pass = (targetId) => {
    let phoneNumber = CashService.getPhone();
    if (!phoneNumber) {
      throw new Error("CashService[Const.PHONE_HEADER_NAME] is not allowed to be " + phoneNumber);
    }
    let promise = AjaxService.doGet(Const.URLS.PASS + targetId, {})
    promise.then((data) => {
    }).catch((e) => {
      console.log(e);
    })
  }

  like = (targetId) => {
    let phoneNumber = CashService.getPhone();
    if (!phoneNumber) {
      throw new Error("CashService[Const.PHONE_HEADER_NAME] is not allowed to be " + phoneNumber);
    }
    let promise = AjaxService.doGet(Const.URLS.LIKE + targetId, {})
    promise.then((data) => {
    }).catch((e) => {
      console.log(e);
    })
  }

  isBookmarked = (userId) => {
    return this.allBookmarks[userId] !== undefined && this.allBookmarks[userId] !== null;
  }

  isLiked = (photos) => {
    for (let index = 0; index < photos.length; index++) {
      const pic = photos[index];
      if (this.friendRequestPicIds.indexOf(pic.id) != -1) {
        return true
      }
    }
    return false;
  }

  render() {
    let InfoWrapper = (args) => {
      let { person } = args;
      let isBookmarked = this.isBookmarked(person?._id);
      return (
        <div className="text-justify text-wrap">
          <div>
            <button className="btn btn-success" onClick={() => this.like(person._id)}>y</button>
            <button className="btn btn-danger" onClick={() => this.pass(person._id)}>n</button>

            {!isBookmarked ? <button className="btn btn-primary float-right ml-1"
              onClick={() => NotesService.saveBookmark(person?._id)}>s</button> : null}
            {isBookmarked ? <button className="btn btn-danger float-right ml-1"
              onClick={() => NotesService.removeBookmark(person?._id)}>s</button> : null}
          </div>
          <Info person={person} />
        </div>
      )
    }

    let Pic = args => (
      <div>
        <button hidden={!args.isLiked} className="btn position-absolute btn-danger">❤️</button>
        <PicWrapper photos={args.photos} name={args.name} />
      </div>)

    let allFr = this.state.allFr;

    let persons = allFr.map(one => {
      one.isLiked = this.isLiked(one.photos)
      let obj = {
        info: (<InfoWrapper person={one} />),
        image: (<Pic photos={one.photos} name={one.name} isLiked={this.isLiked(one.photos)} />)
      }
      return { ...obj };
    });

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
            data={persons}
            columns={present}
            sortable={false}
            defaultPageSize={persons.length}
            pageSize={persons.length}
            showPagination={false}
          />
          <br />
        </div>
      </div>
    )
  }
}
export default MoreFriends;