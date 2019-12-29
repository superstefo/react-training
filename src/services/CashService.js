import React from 'react';
import Const from './Constants';
//import store from '../store'

class CashService extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
    //  pollInterval: 20000//,
      //  numberMsgShown: 10
  //   };
  // }
   __TnDr__ = {
    "00359877855206": { "X-Auth-Token": "ec5f20d0-419a-417f-b05b-071af21e92f3", 'settings' :{"textColor":""} },
    "00359877783567": { "X-Auth-Token": "ec5f20d0-419a-417f-b05b-071af21e92f3" }
  }

  [Const.PHONE_HEADER_NAME] = null;
  [Const.AUTH_HEADER_NAME] = null;

  lsobj = (() => {
   // console.log("CashService----------------------");

    let cashVarName = Const.LOCAL_CASH_VAR_NAME;
    let ls = localStorage.getItem(cashVarName);
  //  console.log(ls);
    if (!ls) {
      ls = {}
      localStorage.setItem(cashVarName, JSON.stringify(ls));
      return ls;
    }
    let result;
    try {
      result = JSON.parse(ls);
    } catch (error) {
      console.log(error);
      localStorage.removeItem(cashVarName);
    }
    return result;
  })();

  getLocalStorage = () => {
    console.log(this.lsobj);
    return this.lsobj;
  };

  setLocalStorage = (obj) => {
    if (typeof obj !== 'object') {
      throw new Error("'obj' must be of type 'object'! ");
    }
    this.private_____persistLocalStorage(obj);
    this.lsobj = obj;
  };

  parseLocalStorage = () => {
    let ls = localStorage.getItem(Const.LOCAL_CASH_VAR_NAME);
    return JSON.parse(ls);
  };

  private_____persistLocalStorage = (obj) => {
    localStorage.setItem(Const.LOCAL_CASH_VAR_NAME, JSON.stringify(obj));
  };

}

export default new CashService();
