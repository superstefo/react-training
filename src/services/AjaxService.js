import React from 'react';
import axios from 'axios';
import Const from './Constants';
import CashService from './CashService'
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
    let authHeaderName = Const.AUTH_HEADER_NAME;
    let phoneHeaderName = Const.PHONE_HEADER_NAME;
    // if (Object.keys(headers).length === 0) {
    if (!headers) {
      headers = {};
    }

    if (CashService[phoneHeaderName]) {
      headers[phoneHeaderName] = CashService[phoneHeaderName];
    }

    if (CashService[authHeaderName]) {
      headers[authHeaderName] = CashService[authHeaderName];
    }
    console.log(headers); ///
   // return {'phone-number': "359877855206", 'X-Auth-Token': "5afd6f59-599a-4108-809f-a2231581cc9f"}
    return headers;
  };
}

export default new AjaxService();
