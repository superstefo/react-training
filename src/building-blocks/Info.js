import React from 'react';

function Info(args) {
  let { person } = args;
  let country = person.pos_info ? (person.pos_info.country ? person.pos_info.country.name : "") : "";
  let city = person.pos_info ? (person.pos_info.city ? person.pos_info.city.name : "") : "";
  return (
    <div className="text-justify text-wrap">
      {person.name ? (<div> <span className="font-weight-bold">Name:  </span> {person.name} </div>) : null}
      {person.birth_date ? (<div> <span className="font-weight-bold">Date of Birth:  </span> {person.birth_date} </div>) : null}
      {person.distance_mi ? (<div> <span className="font-weight-bold">Distance (miles):  </span> {person.distance_mi} </div>) : null}
      {person.pos_info ? (<div> <span className="font-weight-bold">Location:  </span> {city}, {country}  </div>) : null}
      {person.bio ? (<div> <span className="font-weight-bold">Bio:  </span> {person.bio} </div>) : null}
      {person.education ? (<div> <span className="font-weight-bold">Job:  </span> {person.education} </div>) : null}
      {person.job ? (<div> <span className="font-weight-bold">Job:  </span> {person.job} </div>) : null}
    </div>
  )
}

export default Info;