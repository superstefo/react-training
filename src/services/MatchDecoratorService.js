import React from 'react';
import Const from './Constants';
import AjaxService from './AjaxService';

class MatchDecoratorService extends React.Component {

  getUserData = (match, callbackFunc) => {
    console.log(match);
    
    let userId = match?.person?._id;
    let promise = AjaxService.doGet(Const.URLS.USER + userId, {});
    promise.then((data) => {
      match.user = data?.data?.results;
      match.person.distance_mi = data?.data?.results?.distance_mi;
      callbackFunc(match);
    }).catch((e) => {
      console.error(e);
    })
  }

}
export default new MatchDecoratorService();