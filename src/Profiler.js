
import React from 'react';
//import Home from './Home';
//import PhoneForm from './PhoneForm';


//import {browserHistory} from 'react-router'
import { useHistory } from "react-router-dom";
//import {createBrowserHistory}from 'history';

export const Profiler = () => {
  var history = useHistory();
  return (
      <div>
          <button onClick={() => history.push("/phone")}>phone</button>
          <button onClick={() => history.push("/")}>Home</button>
      </div>
  );
};


export default Profiler
