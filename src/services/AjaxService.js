import React from 'react';
import axios from 'axios';
import Const from './Constants';
import store from '../store'

class AjaxService extends React.Component {

  execute = (method, url, data, headers) => {
    return axios({
      method: method,
      url: url,
      data: data,
      headers: headers
    });
  };

  doPost = (url, data, headers) => {
    return this.execute('post', url, data, this.getHeaders(headers));
  };

  doGet = (url, headers) => {
    return this.execute('get', url, {}, this.getHeaders(headers));
  };

  getHeaders = (headers) => {
    // if (!headers || Object.keys(headers).length === 0) {
    console.log("Ajax g=======================================================---------------------");
    // console.log(typeof AjaxService.cash );
    console.log(AjaxService.cash);
    if (!store.phoneNumber) {
      //  throw new Error("store.phoneNumber is not allowed to be: " + store.phoneNumber);
    }
    if (!store.xAuthToken) {
      //  throw new Error("store.xAuthToken is not allowed to be: " + store.xAuthToken);
    }
    return {
      "X-Auth-Token": store["X-Auth-Token"]
    }
    //}
  };
}

AjaxService.cash = (() => {
  let objj = {
    "00359877855206": { "X-Auth-Token": "ec5f20d0-419a-417f-b05b-071af21e92f3" }
  }
  console.log("Ajax getting cahhh ----------------------");
  var cashVarName = Const.LOCAL_CASH_VAR_NAME;
  // localStorage.removeItem(cashVarName);
  // localStorage.setItem(cashVarName , JSON.stringify(objj));
  var cash = localStorage.getItem(cashVarName);
  console.log(cash);
  if (!cash) {
    console.log("setting ..  .");
    cash = {}
    localStorage.setItem(cashVarName, JSON.stringify(cash));
    return cash;
  }
  var result
  try {
    result = JSON.parse(cash);
  } catch (error) {
    console.log(error);
    localStorage.removeItem(cashVarName);
  }
  // console.log(cash);

  return result;
})();

export default new AjaxService();
