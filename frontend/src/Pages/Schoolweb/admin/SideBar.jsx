import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';

const SideBar = () => {
    const location = useLocation();
    return (
        <div className='flex rounded-lg bg-gradient-to-l from-[#3292FF] to-[#B5D5FB] w-screen'>
            <React.Fragment>
                <ListItemButton component={Link} to="/">
                    <ListItemIcon>
                        <HomeIcon color={location.pathname === ("/" || "/Admin/dashboard") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText
                        className="-ml-6"
                        primary="Trang chủ"
                        primaryTypographyProps={{
                            className: 'font-bold text-black hover:text-[#00bcd4] active:text-[#00bcd4] focus:text-[#00bcd4]',
                        }}
                    />
                </ListItemButton>

                <ListItemButton component={Link} to="/Admin/Setting/groups">
                    <ListItemIcon>
                        <AssignmentIcon color={location.pathname.startsWith("/Admin/Setting/groups") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText className="-ml-6" primary="Danh sách khóa học" primaryTypographyProps={{
                        className: 'font-bold text-black hover:text-[#00bcd4] active:text-[#00bcd4] focus:text-[#00bcd4]',
                    }} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/Setting/teachers">
                    <ListItemIcon>
                        <SupervisorAccountOutlinedIcon color={location.pathname.startsWith("/Admin/Setting/teachers") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText className="-ml-6" primary="Danh sách giáo viên" primaryTypographyProps={{
                        className: 'font-bold text-black hover:text-[#00bcd4] active:text-[#00bcd4] focus:text-[#00bcd4]',
                    }} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/Setting/students">
                    <ListItemIcon>
                        <PersonOutlineIcon color={location.pathname.startsWith("/Admin/Setting/students") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText className="-ml-6" primary="Danh sách sinh viên" primaryTypographyProps={{
                        className: 'font-bold text-black hover:text-[#00bcd4] active:text-[#00bcd4] focus:text-[#00bcd4]',
                    }} />
                </ListItemButton>
            </React.Fragment>
        </div>
    )
}

export default SideBar
