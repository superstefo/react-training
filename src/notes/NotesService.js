import React from 'react';
import store from '../store';
import Const from '../services/Constants';
import AjaxService from '../services/AjaxService';
import CashService from '../services/CashService';

class NotesService extends React.Component {

  sanitizeStore22deleteeee = function () {
    if (!store.bookmarked) {
      store.bookmarked = []
    }
  }

  saveBookmark = function (personId) {
    let bookmarks = CashService.getBookmarks();
    if (bookmarks.indexOf(personId) !== -1) {
      return;
    }
    bookmarks.push(personId);
    CashService.persistBookmarks(bookmarks);
  }

  removeBookmark = function (personId) {
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

  delete = function (phone = CashService.getPhone()) {
    let promise = AjaxService.doDelete(Const.URLS.STORAGE + phone, {});

    promise.then((data) => {
      console.log(data);
    }).catch((e) => {
      console.error(e);
    })
  }

}
export default new NotesService;