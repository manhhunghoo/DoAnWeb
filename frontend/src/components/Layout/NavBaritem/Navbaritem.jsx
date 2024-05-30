import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';

const Navbaritem = ({ to, icon, activeIcon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink to={to} className={`flex items-center justify-center rounded-md p-2 transition-colors duration-300 ${isActive ? 'text-[#0077FF]' : 'text-gray-500 hover:text-[#0077FF]'}`}>
      {isActive ? activeIcon : icon}
    </NavLink>
  );
};

export default Navbaritem;