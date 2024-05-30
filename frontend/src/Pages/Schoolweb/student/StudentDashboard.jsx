import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppBar, Drawer } from '../../../components/Schoolweb/styles';
import AccountMenu from '../../../components/Schoolweb/AccountMenu';
import StudentSidebar from './StudentSideBar'
import StudentHomePage from './StudentHomePage';
import StudentProfile from './StudentProfile';
import StudentSubjects from './StudentSubjects';
import ViewStdAttendance from './ViewStdAttendance';
import StudentComplain from './StudentComplain';

const StudentDashboard = () => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar open={open} position='absolute'>
                    <Toolbar sx={{ pr: '24px' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Student Dashboard
                        </Typography>
                        <AccountMenu />
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} sx={open ? styles.drawerStyled : styles.hideDrawer}>
                    <Toolbar sx={styles.toolBarStyled}>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <StudentSidebar />
                    </List>
                </Drawer>
                <Box component="main" sx={styles.boxStyled}>
                    <Toolbar />
                    <Routes>
                        <Route path="/" element={<StudentHomePage />} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/Student/dashboard" element={<StudentHomePage />} />
                        <Route path="/Student/profile" element={<StudentProfile />} />

                        <Route path="/Student/subjects" element={<StudentSubjects />} />
                        <Route path="/Student/attendance" element={<ViewStdAttendance />} />
                        <Route path="/Student/complain" element={<StudentComplain />} />

                    </Routes>
                </Box>
            </Box>
        </>
    );
}

export default StudentDashboard

const styles = {
    boxStyled: {
        backgroundColor: (theme) =>
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
    },
    drawerStyled: {
        display: "flex"
    },
    hideDrawer: {
        display: 'flex',
        '@media (max-width: 600px)': {
            display: 'none',
        },
    },
}


// import React, { useState } from 'react';
// import {
//     CssBaseline,
//     Box,
//     Toolbar,
//     Typography,
//     Divider,
//     IconButton,
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

// import { AppBar, Drawer } from '../../../components/Schoolweb/styles';
// import StudentSidebar from './StudentSideBar';
// import StudentHomePage from './StudentHomePage';
// import StudentProfile from './StudentProfile';

// const StudentDashboard = () => {
//     const [open, setOpen] = useState(true);
//     const toggleDrawer = () => {
//         setOpen(!open);
//     };

//     return (
//         <>
//             <Box sx={{ display: 'flex' }}>
//                 <CssBaseline />
//                 <AppBar open={open} position="absolute">
//                     <Toolbar sx={{ pr: '24px' }}>
//                         <IconButton
//                             edge="start"
//                             color="inherit"
//                             aria-label="open drawer"
//                             onClick={toggleDrawer}
//                             sx={{
//                                 marginRight: '36px',
//                                 ...(open && { display: 'none' }),
//                             }}
//                         >
//                             <MenuIcon />
//                         </IconButton>
//                         <Typography
//                             component="h1"
//                             variant="h6"
//                             color="inherit"
//                             noWrap
//                             sx={{ flexGrow: 1 }}
//                         >
//                             Student Dashboard
//                         </Typography>
//                     </Toolbar>
//                 </AppBar>
//                 <Drawer variant="permanent" open={open}>
//                     <Toolbar>
//                         <IconButton onClick={toggleDrawer}>
//                             <ChevronLeftIcon />
//                         </IconButton>
//                     </Toolbar>
//                     <Divider />
//                     <StudentSidebar />
//                 </Drawer>
//                 <Box
//                     component="main"
//                     sx={{
//                         backgroundColor: (theme) =>
//                             theme.palette.mode === 'light'
//                                 ? theme.palette.grey[100]
//                                 : theme.palette.grey[900],
//                         flexGrow: 1,
//                         height: '100vh',
//                         overflow: 'auto',
//                     }}
//                 >
//                     <Toolbar />
//                     <StudentHomePage />
//                     <StudentProfile />
//                 </Box>
//             </Box>
//         </>
//     );
// };

// export default StudentDashboard;