import React from "react";
import PropTypes from "prop-types";

const Navbarmenu = ({ children }) => {
  return <nav className="flex items-center ml-auto gap-x-10 ">{children}</nav>;
};

Navbarmenu.prototype = {
  children: PropTypes.node.isRequired,
};
export default Navbarmenu;
