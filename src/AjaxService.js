import React from 'react';
import axios from 'axios';
//import { useHistory } from "react-router-dom";

export class AjaxService extends React.Component {

  constructor(props) {
    super(props);
    console.log("constructor in Ajax service " + new Date());
  };

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
