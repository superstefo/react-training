import React from 'react';
import store from '../store';
import Const from '../services/Constants';
import AjaxService from '../services/AjaxService';
import CashService from '../services/CashService';

class NotesService extends React.Component {

  sanitizeStore = function () {
    if (!store.bookmarked) {
      store.bookmarked = []
    }
  }

  saveOneBookmark = function (personId) {
    //this.sanitizeStore();
    //store.bookmarked.push(personId);
    let bookmarks = CashService.getBookmarks();
    bookmarks.push(personId);
    CashService.persistBookmarks(bookmarks);
  }

  removeOneBookmark = function (personId) {
    let bookmarks = CashService.getBookmarks();
    for (let index = 0; index < bookmarks.length; index++) {
      let oneFromArr = bookmarks[index];
      if (!!personId && oneFromArr === personId) {
        bookmarks.splice(index, 1);
        CashService.persistBookmarks(bookmarks);
        break;
      }
    }
  }

  getBookmarks = function (phone  = CashService.getPhone()) {
    let promise = AjaxService.doGet(Const.URLS.ghfj, {});

    promise.then((data) => {
      console.log(data);
      if (data.result) {
       // store.bookmarked = data.result
      }
      //this.sanitizeStore();
    }).catch((e) => {
      console.error(e);
    })
  }

  saveAllByPhone = function (phone = CashService.getPhone()) {
    CashService.persistAll(phone, CashService.cashStructureTemplate);
  }

  getOne = function (phone = CashService.getPhone()) {
    let promise = AjaxService.doGet(Const.URLS.STORAGE + phone, {});

    promise.then((data) => {
      console.log(data);
    }).catch((e) => {
      console.error(e);
    })
  }

  delete = function ( phone  = CashService.getPhone()) {
    let promise = AjaxService.doDelete(Const.URLS.STORAGE  + phone, {});

    promise.then((data) => {
      console.log(data);
    }).catch((e) => {
      console.error(e);
    })
  }

 
}
export default new NotesService;