import React, {Component} from 'react';
import {  Link} from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
  }

  render() {
    return (

    <div >
    <h1>Welcome</h1>
          <Link to="/phone">  Login with phone</Link>
            </div >
     )}
  }

  export default Home;
