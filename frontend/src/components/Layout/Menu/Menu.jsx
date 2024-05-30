import React from "react";
import PropTypes from "prop-types";
const Menu = ({ children }) => {
  return <nav className="mt-9 text-[#8A8A8A] font-bold">{children}</nav>;
};

Menu.prototype = {
  children: PropTypes.node.isRequired,
};

export default Menu;
