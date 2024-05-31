import React, { useState, useEffect } from "react"
import { AiFillHome, AiOutlineHome } from "react-icons/ai"
import { IoNotifications, IoNotificationsOutline, IoSettingsOutline, IoSettingsSharp, IoMenu } from "react-icons/io5"
import Badge from '@mui/material/Badge'
import { Link } from "react-router-dom"
import { PiListChecks, PiListChecksFill } from "react-icons/pi";

import routes from "../config/routes"
import { UserProfile } from "./UserProfile"
import Navbarmenu from "./Layout/NavBaritem/Navbarmenu"
import Navbaritem from "./Layout/NavBaritem/Navbaritem"
import config from "../config/routes"
import Search from "./NavBar/Search"
import useUser from "../hook/useUser"
import useNotificationEvent from "../hook/useNotificationEvent"
import LogoUIT from "../assets/LogoUIT.svg"
const Navbar = () => {
  const { user } = useUser()
  const { notificationEvent } = useNotificationEvent()
  const [showMenu, setShowMenu] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <nav className="flex justify-between items-center bg-white shadow-md fixed top-0 left-0 right-0 z-50 px-4 py-2 md:py-3">
      <div className="flex items-center">
        <Link to={routes.home}>
          <img
            className="max-h-16 md:max-h-40 ml-6"
            src={LogoUIT}
            alt="logiUIT"
          />
        </Link>
        <div className="relative hidden lg:block mt-3 ml-52 max-w-md w-full">
          <Search />
        </div>
      </div>

      <div className="flex items-center">
        <Navbarmenu className={`hidden ${windowWidth >= 1024 ? 'lg:flex' : ''} items-center`}>
          <Navbaritem
            to={config.home}
            icon={<AiOutlineHome className="w-10 h-10" />}
            activeIcon={<AiFillHome className="w-10 h-10 text-[#0077FF]" />}
          />

          {user?.role === "admin" || user?.role === "student" ?
            (<Navbaritem
              to={config.todolist}
              icon={<PiListChecks className="w-10 h-10" />}
              activeIcon={<PiListChecksFill className="w-10 h-10 text-[#0077FF]" />}
            />) : null}

          {user?.role === "admin" ?
            (<Navbaritem
              to={config.setting}
              icon={<IoSettingsOutline className="w-10 h-10" />}
              activeIcon={<IoSettingsSharp className="w-10 h-10 text-[#0077FF]" />}
            />) : null}

          <Navbaritem
            to={config.thongbao}
            icon={<Badge color="secondary" badgeContent={notificationEvent.length} max={100}><IoNotificationsOutline className="w-10 h-10" /></Badge>}
            activeIcon={
              <Badge color="secondary" badgeContent={notificationEvent.length} max={100}>
                <IoNotifications className="w-10 h-10 text-[#0077FF]" />
              </Badge>}
          />
        </Navbarmenu>

        <div className={`ml-4 ${windowWidth >= 1024 ? 'lg:block' : 'hidden'}`}>
          <UserProfile />
        </div>

        <button className={`${windowWidth < 1024 ? '' : 'hidden'}`} onClick={toggleMenu}>
          <IoMenu className="w-8 h-8" />
        </button>
      </div>

      {showMenu && (
        <div className="flex flex-col bg-white shadow-md p-4 absolute top-full left-0 right-0 z-50">
          <div className="relative mb-4">
            <Search />
          </div>
          <Link to={config.home} className="flex items-center py-2">
            <AiOutlineHome className="w-6 h-6 mr-2" />
            Home
          </Link>
          <Link to={config.todolist} className="flex items-center py-2">
            <PiListChecks className="w-6 h-6 mr-2" />
            Todolist
          </Link>
          {user?.role === "admin" && (
            <Link to={config.setting} className="flex items-center py-2">
              <IoSettingsOutline className="w-6 h-6 mr-2" />
              Settings
            </Link>
          )}
          <Link to={config.thongbao} className="flex items-center py-2">
            <Badge color="secondary" badgeContent={notificationEvent.length} max={100}>
              <IoNotificationsOutline className="w-6 h-6 mr-2" />
            </Badge>
            Notifications
          </Link>
          <div className="flex items-center py-2">
            <UserProfile />
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar