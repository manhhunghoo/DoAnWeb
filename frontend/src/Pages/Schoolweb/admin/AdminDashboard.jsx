import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Divider,
    IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Navigate, Route, Routes } from 'react-router-dom';
import SideBar from './SideBar';
import AdminProfile from './AdminProfile';
import AdminHomePage from './AdminHomePage';


import { AppBar, Drawer } from '../../../components/Schoolweb/styles';
import AccountMenu from '../../../components/Schoolweb/AccountMenu';
import SeeComplains from './studentRelated/SeeComplains';
import AddNotice from './noticeRelated/AddNotice';
import ShowNotices from './noticeRelated/ShowNotices';
import ShowSubjects from './subjectRelated/ShowSubjects';
import ViewSubject from './subjectRelated/ViewSubject';
import ChooseClass from './teacherRelated/ChooseClass';
import SubjectForm from './subjectRelated/SubjectForm';
import StudentAttendance from './studentRelated/StudentAttendance';
import StudentExamMarks from './studentRelated/StudentExamMarks';
import ShowClasses from './classRelated/ShowClasses';
import ClassDetails from './classRelated/ClassDetails';
import AddStudent from './studentRelated/AddStudent';
import ShowStudents from './studentRelated/ShowStudents';
import AddClass from './classRelated/AddClass';
import ViewStudent from './studentRelated/ViewStudent';
import ShowTeachers from './teacherRelated/ShowTeachers';
import TeacherDetails from './teacherRelated/TeacherDetails';
import ChooseSubject from './teacherRelated/ChooseSubject';
import AddTeacher from './teacherRelated/AddTeacher';

const AdminDashboard = ({ children }) => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />

                <Drawer variant="permanent" open={open} sx={open ? styles.drawerStyled : styles.hideDrawer}>
                    <Toolbar sx={styles.toolBarStyled}>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <SideBar />
                    </List>
                </Drawer>
                <Box component="main" sx={styles.boxStyled}>
                    {children}
                    <Toolbar />
                    <Routes>
                        <Route path="/Admin/Setting/" element={<AdminHomePage />} />
                        <Route path="/Admin/Setting/dashboard" element={<AdminHomePage />} />

                        {/* Notice */}
                        <Route path="/Admin/Setting/addnotice" element={<AddNotice />} />
                        <Route path="/Admin/Setting/notices" element={<ShowNotices />} />

                        {/* Subject */}
                        <Route path="/Admin/Setting/subjects" element={<ShowSubjects />} />


                        {/* Teacher */}
                        <Route path="/Admin/Setting/teachers" element={<ShowTeachers />} />

                        {/* <Route path="/logout" element={<Logout />} /> */}
                    </Routes>
                </Box>
            </Box>
        </>
    );
}

export default AdminDashboard

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