import React from "react";
import { NavLink } from "react-router-dom";
import ControlledInput from "./Select";

function Header() {
  let Btn = (prop) => (
    <div>
      <NavLink exact activeClassName="active" to={prop.to}>
        <button type="button"  className="btn btn-primary">
        {prop.label}
        </button>
      </NavLink>
    </div>
  )

  return (
    <nav>
      <div className="btn-group">
        <Btn to="/home" label="Home" />
        <Btn to="/user" label="User" />
        <Btn to="/pals" label="Pals" />
        <Btn to="/chat" label="Chat" />
        <Btn to="/logout" label="|->" />
      </div>
    </nav>
  );
}
export default Header;
