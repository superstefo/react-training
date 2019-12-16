import React from "react";
import { NavLink } from "react-router-dom";
import BeanContextAware from '../services/BeanContextAware'
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beanId: props.beanId,
      showUser: false,
      isVisible: false
    };
  }

  changeButtonVisibility = (obj) => {
    this.setState({
      isVisible: true
    });
  }

  componentDidMount() {
    BeanContextAware.add(this);
  }

  componentWillUnmount() {
    BeanContextAware.remove(this);
  }

  render() {
    let Btn = (props) => (
      <div>
        <NavLink exact activeClassName="active" to={props.to}>
          <button type="button"  className="btn btn-primary">
          {props.label}
          </button>
        </NavLink>
      </div>
    )

    return (
      <div className="text-center ">
        <nav>
          <div className="btn-group">
            { !this.state.isVisible ? <Btn to="/home" label="Home" /> : null }
            { this.state.isVisible ? <Btn to="/user" label="User" /> : null }
            { this.state.isVisible ? <Btn to="/pals" label="Pals" /> : null }
            { this.state.isVisible ? <Btn to="/more-pals" label="More Pals" /> : null }
            { this.state.isVisible ? <Btn to="/settings" label="Settings" /> : null }
            { this.state.isVisible ? <Btn to="/logout" label="|->" /> : null }
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
