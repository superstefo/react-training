import React from 'react';
import axios from 'axios';

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
    return this.execute('post', url, data, headers);
  };

  doGet = (url, headers) => {
    return this.execute('get', url, {}, headers);
  };

}
export default new AjaxService();
