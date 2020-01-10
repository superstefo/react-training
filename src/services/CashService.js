import React from 'react';
import Const from './Constants';
import AjaxService from './AjaxService';

class CashService extends React.Component {

  [Const.PHONE_HEADER_NAME] = null;
  [Const.AUTH_HEADER_NAME] = null;
  settings = {bgColor: "bg-dark", textColor: "text-white"};
  bookmarks = [];

  cashStructureTemplate = {
    settings: this.settings, 
    [Const.AUTH_HEADER_NAME]: {token: this[Const.AUTH_HEADER_NAME]},
    bookmarks: this.bookmarks
  }
  
  persistAll = function (phone, obj) {
    console.log(obj);
    
    let promise = AjaxService.doPost(Const.URLS.STORAGE + phone, {
      'json': JSON.stringify(obj)
    }, {});

    // promise.then((data) => {
    //   console.log(data);
    // }).catch((e) => {
    //   console.error(e);
    // })
  }

  loadAll = function (phone) {
    return AjaxService.doGet(Const.URLS.STORAGE + phone, {});
  }

  getPhone = () => {
    return this[Const.PHONE_HEADER_NAME];
  };
  setPhone = (phone) => {
    this[Const.PHONE_HEADER_NAME] = phone;
  };

  /// token:
  getToken= () => {
    return this[Const.AUTH_HEADER_NAME];
  };

  setToken = (token) => {
    this[Const.AUTH_HEADER_NAME] = token;
  };

  persistToken(token){
    AjaxService.doPut(Const.URLS.STORAGE_TOKEN + this.getPhone(), {
      'json': JSON.stringify({"token": token})
    });
  }

  //// settings:
  getSettings = () => {
    return this.settings;
  };

  setSettings = (settings) => {
    this.settings = settings;
  };

  persistSettings = (settings) => {
    AjaxService.doPut(Const.URLS.STORAGE_SETTINGS + this.getPhone(), {
      'json': JSON.stringify(settings)
    });
  }

  getBookmarks() {
    return this.bookmarks;
  }

  setBookmarks(bookmarks) {
    this.bookmarks = bookmarks;
  }

  persistBookmarks = function (arr) {
    let promise = AjaxService.doPost(Const.URLS.STORAGE_BOOKMARKS + this.getPhone(), {
      'json': JSON.stringify(arr)
    }, {});

    promise.then((data) => {
      console.log(data);
    }).catch((e) => {
      console.error(e);
    })
  }

}

export default new CashService();
