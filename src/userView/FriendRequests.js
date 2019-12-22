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
    this.abortController = new AbortController();
  }

  componentWillUnmount() {
    this.abortController.abort()
  }

  getFriendRequests = () => {
    let promise = AjaxService.doGet(Const.URLS.FAST_MATCH, {})
    promise.then((data) => {
      if (!data || !data.data || !data.data.data || !data.data.data.results) {
        return;
      }

      this.setState({
        allFr: data.data.data.results
      })
    }).catch((e) => {
      console.log(e);
    })
  }

  componentDidMount() {
    this.getFriendRequests();
  }

  render() {
    let Info = args => <div className="text-justify text-wrap"> {args.info} </div>;
    let Pic = args => (<PicWrapper photos={args.photos} />);

    let allFr = this.state.allFr;

    let persons = allFr.map(one => {
      let obj = {
        info: (<Info info={one.user._id} />),
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
            Header: "Info",
            accessor: "info"
          }
        ]
      }
    ]

    return (
      <div>
        <div className="text-center p-1 ">
          <button type="button" className="btn btn-primary" onClick={() => this.getFriendRequests()}> Reload </button>
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

//{"status":200,"match":false,"likes_remaining":100,"X-Padding":"{*meta*:{*code*:200,*requestId*:*59a45921351e3d43b07028b5*},*response*:{*venue*:{*id*:*412d2800f964a520df0c1fe3*,*name*:*Central Park*,*contact*:{*phone*:*2123106600*,*formattedPhone*:*(212) 310-6600*,*twitter*:*centralparknyc*,*instagram*:*centralparknyc*,*facebook*:*37965424481*,*facebookUsername*:*centralparknyc*,*facebookName*:*Central Park*},*location*:{*address*:*59th St to 110th St*,*crossStreet*:*5th Ave to Central Park West*,*lat*:40.78408342593807,*lng*:-73.96485328674316,*postalCode*:*10028*,*cc*:*US*,*city*:*New York*,*state*:*NY*,*country*:*United States*,*formattedAddress*:[*59th St to 110th St (5th Ave to Central Park West)*,*New York, NY 10028*,*United States*]},*canonicalUrl*:*https://foursquare.com/v/central-park/412d2800f964a520df0c1fe3*,*categories*:[{*id*:*4bf58dd8d48988d163941735*,*name*:*Park*,*pluralName*:*Parks*,*shortName*:*Park*,*icon*:{*prefix*:*https://ss3.4sqi.net/img/categories_v2/parks_outdoors/park_*,*suffix*:*.png*},*primary*:true}],*verified*:true,*stats*:{*checkinsCount*:364591,*usersCount*:311634,*tipCount*:1583,*visitsCount*:854553},*url*:*http://www.centralparknyc.org*,*likes*:{*count*:17370,*summary*:*17370 Likes*},*rating*:9.8,*ratingColor*:*00B551*,*ratingSignals*:18854,*beenHere*:{*count*:0,*unconfirmedCount*:0,*marked*:false,*lastCheckinExpiredAt*:0},*photos*:{*count*:26681,*groups*:[{*type*:*venue*,*name*:*Venue photos*,*count*:26681,*items*:[{*id*:*513bd223e4b0e8ef8292ee54*,*createdAt*:1362874915,*source*:{*name*:*Instagram*,*url*:*http://instagram.com*},*prefix*:*https://igx.4sqi.net/img/general/*,*suffix*:*/655018_Zp3vA90Sy4IIDApvfAo5KnDItoV0uEDZeST7bWT-qzk.jpg*,*width*:612,*height*:612,*user*:{*id*:*123456*,*firstName*:*J"}

// Request URL: https://api.gotinder.com/v2/fast-match/teasers?locale=en-GB
// Request Method: GET
// Status Code: 200 
// Remote Address: 52.85.7.7:443
// Referrer Policy: origin
// access-control-allow-credentials: true
// access-control-allow-headers: Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Requested-With,platform,app-version,X-Auth-Token,x-accountkit-validation-code,token,fast-match-count,x-supported-image-formats,device_id,install-id,persistent-device-id,promo-code,campaign-name,app-session-id,app-session-time-elapsed,user-session-id,user-session-time-elapsed,advertising-id,encoded-device-carrier,encoded-device-model,x-external-token,x-refresh-token,x-recovery-token,x-access-token,Java-Script-Enabled,Color-Depth,Java-Enabled,Screen-Height,Screen-width,Time-Zone-Offset,language,Underage-Token,tinder-version
// access-control-allow-methods: GET, POST, PUT, DELETE, OPTIONS
// access-control-allow-origin: https://tinder.com
// cache-control: no-cache, no-store, must-revalidate
// content-encoding: gzip
// content-type: application/json; charset=utf-8
// date: Sat, 21 Dec 2019 08:10:56 GMT
// status: 200
// vary: Accept-Encoding
// via: 1.1 db06bf8d1de11ce1e98664ab021137c1.cloudfront.net (CloudFront)
// x-amz-cf-id: ZPmygL5V4uLR1bFn1hrRT1nwhOul1uN8HfDk3xyIve5KVifB_4OPdQ==
// x-amz-cf-pop: SOF50-C1
// x-cache: Miss from cloudfront
// x-request-id: 829bc5c1-5531-45fd-a5fd-f13027f65d69


// :authority: api.gotinder.com
// :method: GET
// :path: /v2/fast-match/teasers?locale=en-GB
// :scheme: https
// accept: application/json
// accept-encoding: gzip, deflate, br
// accept-language: en-GB,en-US;q=0.9,en;q=0.8,bg;q=0.7
// app-session-id: d7e147fc-9d4d-42a8-bb7d-7a567c141aea
// app-session-time-elapsed: 1733647
// app-version: 1021800
// origin: https://tinder.com
// persistent-device-id: 4f54539a-f43e-4ca2-b273-49912acdecfc
// platform: web
// referer: https://tinder.com/
// sec-fetch-mode: cors
// sec-fetch-site: cross-site
// tinder-version: 2.18.0
// user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36
// user-session-id: 062576c6-4aa3-4dd7-841b-eb1b88e6530d
// user-session-time-elapsed: 1726069
// x-auth-token: 5e7d4468-72f4-49da-974c-94796b697905
// x-supported-image-formats: webp,jpeg