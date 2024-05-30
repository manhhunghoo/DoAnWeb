import React, { useState } from "react";
import Hoctap from "./Sidebar/Hoctap";
import Menuitem from "./Layout/Menu/Menuitem";
import Diendan from "./Sidebar/Diendan";
import Khoahoc from "./Sidebar/Khoahoc";
import Hocnhom from "./Sidebar/Hocnhom";
import config from "../config/routes";
import Dangxuat from "./Sidebar/Dangxuat";
import { LuLogOut } from "react-icons/lu";
import { SlSocialDribbble } from "react-icons/sl";
import { HiOutlineUserGroup } from "react-icons/hi";
import { TbSchool } from "react-icons/tb"
import { LiaSchoolSolid } from "react-icons/lia";
import { Link } from "react-router-dom";


const Sidebar = () => {
    const [open, setOpen] = useState(true);

    const Menus = [
        {
            title: <Khoahoc />,
            to: config.khoahoc,
            icon: <LiaSchoolSolid className="inline-block w-6 h-6 mr-2 -mt-2" />
        },
        {
            title: <Hocnhom />,
            to: config.hocnhom,
            icon: <HiOutlineUserGroup className="inline-block w-6 h-6 mr-2 -mt-2" />
        },
        {
            title: <Hoctap />,
            to: config.hoctap,
            icon: <TbSchool className="inline-block w-6 h-6 mr-2 -mt-2" />
        },
        {
            title: <Diendan />,
            to: config.diendan,
            icon: <SlSocialDribbble className="inline-block w-6 h-6 mr-2 -mt-2" />
        },
        {
            title: <Dangxuat />,
            to: config.dangxuat,
            icon: <LuLogOut className="inline-block text-[#ff3e3e] w-6 h-6 mr-2 -mt-2" />
        }
    ]

    return (
        <div className="bg-white mt-8 h-[763px] rounded-tr-[1.88rem] rounded-br-[1.88rem] ">
            <div
                className={` ${open ? "w-64" : "w-20"
                    }  flex p-5 pt-8 relative duration-300`}
            >
                <img
                    src="./src/assets/control.png"
                    className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
             border-2 rounded-full ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />
            </div>
            <ul className=" items-center">
                {Menus.map((MenuItem, index) => (
                    <li
                        key={index}
                        className={`flex rounded-md cursor-pointer hover:bg-[#F0F7FF]  text-gray-400 justify-center 
              ${MenuItem.gap ? "mt-7" : "mt-9"} ${index === 0 && "bg-light-white"}
                            `}
                    >
                        <div className="flex items-center">
                            <Link to={MenuItem.to}>{MenuItem.icon}</Link>
                            {/* <img src={`./src/assets/${Menu.src}.png`} /> */}
                            <span className={`${!open && "hidden"} origin-left mt-5 duration-200`}>
                                <Menuitem title={MenuItem.title} to={MenuItem.to} />
                            </span>
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar