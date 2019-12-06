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

  render() {
    return (

    <div >
    <h1>Welcome</h1>
          <Link to="/phone">  Login with phone</Link>
            </div >
     )}
  }

  export default Home;



  //
  //
  //
  // import React, {
  //   Component
  // }
  // from 'react';
  //
  // const API = 'https://hn.algolia.com/api/v1/search?query=';
  // const DEFAULT_QUERY = 'redux';
  //
  // class Home extends Component {
  //   constructor(props) {
  //     super(props);
  //
  //     this.state = {
  //       hits: [],
  //       isLoading: false,
  //       error: null,
  //     };
  //   }
  //
  //   componentDidMount() {
  //     this.setState({
  //       isLoading: true
  //     });
  //
  //     fetch(API + DEFAULT_QUERY)
  //       .then(response => {
  //         if (response.ok) {
  //           return response.json();
  //         } else {
  //           throw new Error('Something went wrong ...');
  //         }
  //       })
  //       .then(data => this.setState({
  //         hits: data.hits,
  //         isLoading: false
  //       }))
  //       .catch(error => this.setState({
  //         error, isLoading: false
  //       }));
  //   }
  //
  //   render() {
  //     return <h1> Welcome </h1>;
  //     const { hits, isLoading, error} = this.state;
  //
  //     if (error) {
  //       return <p > {
  //         error.message
  //       } < /p>;
  //     }
  //
  //     if (isLoading) {
  //       return <p > Loading... < /p>;
  //     }
  //
  //     return (
  //       < ul > {
  //         hits.map(hit =>
  //           < li key = {hit.objectID } >
  //           < a href = {hit.url} > {  hit.title } < /a> < /li >
  //         )
  //       } < /ul>
  //     );
  //     }
  //   }
  //
  //   export default Home;
