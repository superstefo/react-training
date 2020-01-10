import React from 'react';
// import PollService from '../services/PollService';
// import SelectPollInterval from './SelectPollInterval';
// import AppSettingsService from './AppSettingsService';
// import SelectTextColor from './SelectTextColor';
// import SelectBackgroundColor from './SelectBackgroundColor';
// import Checkbox from './Checkbox';
// import { withRouter } from 'react-router-dom'
// import store from '../store'
// import EnterText from './enterText'
// import MessageWrapper from './messageWrapper'
// import BeanContextAware from '../services/BeanContextAware'
// import Select from './Select'

import "react-table/react-table.css"
import ReactTable from "react-table";
import BtnLink from "../building-blocks/BtnLink";
import Info from "../building-blocks/Info";

import PicWrapper from "../building-blocks/PicWrapper";
import NotesService from './NotesService';
import CashService from '../services/CashService';

import MatchDecoratorService from '../services/MatchDecoratorService';



class Notes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      match: null
    };
    this.index = 0;
  }

  componentWillMount() {
    let all = CashService.getBookmarks();
    
    let id = all[this.index]
    if (!id) {
      return;
    }
    let mtch = this.formDummyMatch(id);

    MatchDecoratorService.getUserData(mtch, this.callBack);
  }

  saveAllByPhone = function () {
    NotesService.saveAllByPhone()
  }

  getOne  = function () {
    NotesService.getOne()
  }

  getBookmarks = function () {
    NotesService.getBookmarks()
  }

  delete = function () {
    NotesService.delete()
  }

  formDummyMatch(id) {
    return {
      person: {_id: id}
    }
  }

  callBack = (match) => {
    console.log(match);
    this.match = match;
    this.setState({
      match: match
    })
  }

  getNext = () => {
    let all = CashService.getBookmarks();
    
    if (this.index < all.length-1) {
      this.index++;
    } else {
      this.index = 0;
    }
    let id = all[this.index]
    console.log(id);
    
    let mtch = this.formDummyMatch(id);

    MatchDecoratorService.getUserData(mtch, this.callBack);
  }

  render() {
    console.log("====================================");
    console.log(this.match);
    
    let args = this.match//this.props.location.state;
    if (!args) {
      console.log("sssssssssssssssssssssssssssssssssssss");
      
      return ( 
      <div>         
        <button onClick={this.saveAllByPhone} className="btn btn-primary" >  save All ByPhone </button>
        <button onClick={this.getOne} className="btn btn-primary" >  get one By Phone</button>
        <button onClick={this.delete} className="btn btn-primary" >  del all By phone</button>
      </div>);
    }
    let InfoWithButton = () => (
      <div>

        <div className="mt-1">
          <button type="button" disabled={true} className="btn btn-primary" onClick={() => this.save(args.person._id)}> Bookmark </button>
          <button type="button" disabled={true} className="btn btn-danger ml-2" onClick={() => NotesService.removeOneBookmark(args.person._id)}> Un-Bookmark </button>
          <button type="button" className="btn btn-primary ml-2" onClick={this.getNext}> get next </button>
        </div>
        <Info person={args.person}/>
      </div>
    )

    let person = [{
      image: (<PicWrapper photos={args.user.photos} name={args.user.name}/>),
      info: (<InfoWithButton />)
    }]

    let present = [
      {
        columns: [
          {
            Header: "Photos",
            accessor: "image"
          },
          {
            Header: "Info",
            accessor: "info"
          }
        ]
      }
    ]

    return (
      <div>
        <button onClick={this.saveAllByPhone} className="btn btn-primary" >  save All ByPhone </button>
        <button onClick={this.getOne} className="btn btn-primary" >  get one By Phone</button>
        <button onClick={this.delete} className="btn btn-primary" >  del all By phone</button>

        <div><br />
          <div>
            <ReactTable
              data={person}
              columns={present}
              sortable={false}
              defaultPageSize={1}
              showPagination={false}
            />
            <br />
          </div>
      </div>




      </div>
    )
  }
}
export default Notes;


