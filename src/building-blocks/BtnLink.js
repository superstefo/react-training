
import React from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

BtnLink.propTypes = {
    label: PropTypes.string,
    data: PropTypes.object,
    pathname: PropTypes.string
};

function BtnLink(props) {
    return (
        <div>
            <Link to={{ pathname: props.pathname, state: { data: props.data } }}>
                <button type="button" className="btn btn-primary">
                    {props.label}
                </button>
            </Link>
        </div>
    )
}

export default BtnLink