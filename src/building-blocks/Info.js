import React from 'react';

function Info(args) {
  let { person } = args;
  if (!person) {
    return (
      <div> </div>
    )
  }
  let country = person.pos_info ? (person.pos_info.country ? person.pos_info.country.name : "") : "";
  let age = person.birth_date ? person.birth_date.substring(0, 4) : "";
  let city = person.pos_info ? (person.pos_info.city ? person.pos_info.city.name : "") : "";
  person.jobs = person.jobs?.[0]?.title?.name || "";
  person.schools = person.schools?.[0]?.name || "";
  return (
    <div className="text-justify text-wrap">
      {person.name ? (<div> <span className="font-weight-bold">Name:  </span> {person.name} </div>) : null}
      {person.birth_date ? (<div> <span className="font-weight-bold">Date of Birth:  </span> {age} </div>) : null}
      {person.distance_mi ? (<div> <span className="font-weight-bold">Distance (miles):  </span> {person.distance_mi} </div>) : null}
      {city ? (<div> <span className="font-weight-bold">Location:  </span> {city}, {country}  </div>) : null}
      {person.bio ? (<div> <span className="font-weight-bold">Bio:  </span> {person.bio} </div>) : null}
      {person.jobs ? (<div> <span className="font-weight-bold">Job:  </span> {person.jobs} </div>) : null}
      {person.schools ? (<div> <span className="font-weight-bold">Schools:  </span> {person.schools} </div>) : null}
    </div>
  )
}

export default Info;