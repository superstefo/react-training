import React from 'react';
import Home from './Home';
import PhoneForm from './auth/PhoneForm';
import ConfirmCode from './auth/confirmCode';
import UserView from './userView/userView';
import OneFriend from './userView/oneFriend';
import Header from './basic/header.js';
import store from './store'
import {Provider } from 'react-redux'
//import './App.css';
import {BrowserRouter as Router,  Route,  Switch} from 'react-router-dom';


//import About from './About';
//import Page from './Page';            < Route path = "/pages/:id "component = {Page}/>

global.tostr = function(object) {
  var cache = [];
  var str = JSON.stringify(object,
    // custom replacer fxn - gets around "TypeError: Converting circular structure to JSON"
    function(key, value) {
      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Circular reference found, discard key
          return;
        }
        // Store value in our collection
        cache.push(value);
      }
      return value;
    }, 4);
  cache = null; // enable garbage collection <Redirect to="/"/>
  console.log(str);
  return str;
};

const App = (props) => {
   function getProps() {

    console.log("getting props========================  ff" + store.updates);
    return store.updates;
  }

  return (

    <div className="container" style={{paddingTop: 10}}>
    < Router >
     <Header />
        < Switch >
          < Route exact path = "/" component = {Home}/>
          < Route path = "/phone" component = {PhoneForm}/>
          < Route path = "/friend" component = {OneFriend} />}/>
          < Route path = "/user" render = {() => <UserView data={getProps()} />}/>
          < Route path = "/confirm-token" component = {ConfirmCode}/>
          < Route path = "*" component = {Home}/>
        < /Switch >
    < /Router >
    </div >
  );
};

export default App;
