import React from 'react';
import axios from 'axios';
import Const from './Constants';
import CashService from './CashService';

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
  
  doPut = (url, data, headers) => {
    return this.execute('put', url, data, this.getHeaders(headers));
  };

  doGet = (url, headers) => {
    return this.execute('get', url, {}, this.getHeaders(headers));
  };

  doDelete = (url, headers) => {
    return this.execute('delete', url, {}, this.getHeaders(headers));
  };

  getHeaders = (headers) => {
    let authHeaderName = Const.AUTH_HEADER_NAME;
    let phoneHeaderName = Const.PHONE_HEADER_NAME;
    if (!headers) {
      headers = {};
    }

    if (CashService[phoneHeaderName]) {
      headers[phoneHeaderName] = CashService[phoneHeaderName];
    }

    if (CashService[authHeaderName]) {
      headers[authHeaderName] = CashService[authHeaderName];
    }
    return headers;
  };
}

export default new AjaxService();
