import React from 'react';
import Const from './Constants';
import AjaxService from './AjaxService';

class MatchDecoratorService extends React.Component {

  getUserData = (match, callbackFunc) => {
    
    let userId = match?.person?._id;
    let person = match.person || {};
    let promise = AjaxService.doGet(Const.URLS.USER + userId, {});
    promise.then((data) => {

      let user = data?.data?.results;
      match.user = user;
      
      person.distance_mi = user?.distance_mi;
      person.name = user?.name || person?.name
      person.birth_date = user?.birth_date || person?.birth_date
      person.bio = user?.bio || person?.bio
      person.jobs = user?.jobs || person?.jobs
      person.schools = user?.schools || person.schools
      let posInfo = {city:{name: user?.city?.name }, 
          country:{name: user?.city?.region }};
      person.pos_info = person?.pos_info || posInfo;
      person.interests = user?.user_interests?.selected_interests || person?.interests
      person.sexuality = user?.sexual_orientations || person?.sexuality

      callbackFunc(match);
    }).catch((e) => {
      console.error(e);
      person.error = e
      callbackFunc(match);
    })
  }

}
export default new MatchDecoratorService();
