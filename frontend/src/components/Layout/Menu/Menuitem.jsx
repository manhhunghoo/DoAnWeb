import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
// navlink là 1 thẻ a của react-router-dom
const Menuitem = ({ title, to }) => {
  return (
    <NavLink className="flex" to={to}>
      <span>{title}</span>
    </NavLink>
  );
};
Menuitem.proTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};
export default Menuitem;
