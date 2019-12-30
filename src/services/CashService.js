import React from 'react';
import Const from './Constants';

class CashService extends React.Component {

  [Const.PHONE_HEADER_NAME] = null;
  [Const.AUTH_HEADER_NAME] = null;

  lsobj = (() => {
    let cashVarName = Const.LOCAL_CASH_VAR_NAME;
    let ls = localStorage.getItem(cashVarName);
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
