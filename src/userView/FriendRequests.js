import React from 'react';
import "react-table/react-table.css"
import ReactTable from "react-table";
import AjaxService from '../services/AjaxService'
import Const from '../services/Constants';
import PicWrapper from "../building-blocks/PicWrapper";

class FriendRequests extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allFr: [],
      hits: [],
      isLoading: false,
      error: null,
    };
    this.isMountedOk = true;
  }

  componentDidMount() {
    this.isMountedOk = true;
    this.getFriendRequests();
  }

  componentWillUnmount() {
    this.isMountedOk = false;
  }

  getFriendRequests = () => {
    let promise = AjaxService.doGet(Const.URLS.FAST_MATCH, {})
    promise.then((data) => {
      if (!this.isMountedOk || !data?.data?.data?.results) {
        return;
      }

      this.setState({
        allFr: data.data.data.results
      })
    }).catch((e) => {
      console.log(e);
    })
  }

  render() {
    let Info = args => <div className="text-justify text-wrap"> {args.info} </div>;
    let Pic = args => (<PicWrapper photos={args.photos} />);

    let allFr = this.state.allFr;

    let persons = allFr.map(one => {
      let isActiveRecently = one?.user?.recently_active ? "🕐" : ""
      let obj = {
        info: (<Info info={isActiveRecently} />),
        image: (<Pic photos={one.user.photos} />)
      }
      return { ...obj };
    });

    let present = [
      {
        columns: [
          {
            Header: "Photos",
            accessor: "image"
          },
           {
             Header: "Recently Active",
             accessor: "info"
           }
        ]
      }
    ]

    return (
      <div>
        <div className="text-center p-1 ">
        </div>
        <div>
          <ReactTable className="-striped -highlight"
            data={persons}
            columns={present}
            sortable={false}
            defaultPageSize={persons.length}
            pageSize={persons.length}
            showPagination={false}
            style={{
              width: '100%',
              height: '30%',
            }}
          />
          <br />
        </div>
      </div>
    )
  }
}
export default FriendRequests;