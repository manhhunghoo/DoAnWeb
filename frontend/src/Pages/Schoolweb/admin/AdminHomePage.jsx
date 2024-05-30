import { Container, Divider, Drawer, Grid, IconButton, List, Paper, Toolbar } from '@mui/material'
// import Students from "../../assets/img1.png";
// import Classes from "../../assets/img2.png";
// import Teachers from "../../assets/img3.png";
// import Fees from "../../assets/img4.png";
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useEffect, useState } from 'react';
import SeeNotice from '../../../components/Schoolweb/SeeNotice';

import * as course from '../../../service/courses'
import * as admin from '../../../service/admin'
import { ChevronLeftIcon } from 'lucide-react';
import SideBar from './SideBar';


const AdminHomePage = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const [listCourse, setListCourse] = useState([])
    const [listStudent, setListStudent] = useState([])
    const [listTeacher, setListTeacher] = useState([])
    useEffect(() => {
        course.GetCourseAll()
            .then(res => {
                setListCourse(res[0])
            })
            .catch(err => {
                console.log(err)
            })
        admin.getAllStudents()
            .then(res => {
                setListStudent(res)
            })
            .catch(err => {
                console.log(err)
            })
        admin.getTeacherAll()
            .then(res => {
                setListTeacher(res[0])
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img src="../../src/assets/cap.svg" alt="Students" className='h-32 w-32' />
                            <Title>
                                Total Students: {listStudent?.length}
                            </Title>
                            {/* <Data start={0} end={numberOfStudents} duration={2.5} /> */}
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img src="../../src/assets/book1.svg" alt="Classes" className='h-32 w-32' />
                            <Title>
                                Total Classes:{listCourse?.length}
                            </Title>
                            {/* <Data start={0} end={numberOfClasses} duration={5} /> */}
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img src="../../src/assets/teacher.svg" alt="Teachers" className='h-32 w-32' />
                            <Title>
                                Total Teachers:{listTeacher?.length}
                            </Title>
                            {/* <Data start={0} end={numberOfTeachers} duration={2.5} /> */}
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img src="../../src/assets/fee.svg" alt="Fees" className='h-28 w-28' />
                            <Title>
                                Fees Collection
                            </Title>
                            <Data start={0} end={listStudent.length * 500} duration={2.5} prefix="$" />                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <SeeNotice />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};


const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const Title = styled.p`
  font-size: 1.25rem;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + .6vw);
  color: green;
`;

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

export default AdminHomePage