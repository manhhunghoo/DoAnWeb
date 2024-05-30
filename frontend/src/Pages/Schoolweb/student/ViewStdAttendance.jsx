// import React, { useEffect, useState } from 'react'
// import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
// import { BottomNavigation, BottomNavigationAction, Box, Button, Collapse, Paper, Table, TableBody, TableHead, Typography } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import InsertChartIcon from '@mui/icons-material/InsertChart';
// import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
// import TableChartIcon from '@mui/icons-material/TableChart';
// import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
// import { getUserDetails } from '../../../redux/Schoolweb/userRelated/userHandle';
// import CustomBarChart from '../../../components/Schoolweb/CustomBarChart';
// import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../../components/Schoolweb/attendanceCalculator';
// import { StyledTableCell, StyledTableRow } from '../../../components/Schoolweb/styles';

// const ViewStdAttendance = () => {
//     const dispatch = useDispatch();

//     const [openStates, setOpenStates] = useState({});

//     const handleOpen = (subId) => {
//         setOpenStates((prevState) => ({
//             ...prevState,
//             [subId]: !prevState[subId],
//         }));
//     };

//     const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

//     useEffect(() => {
//         dispatch(getUserDetails(currentUser._id, "Student"));
//     }, [dispatch, currentUser._id]);

//     if (response) { console.log(response) }
//     else if (error) { console.log(error) }

//     const [subjectAttendance, setSubjectAttendance] = useState([]);
//     const [selectedSection, setSelectedSection] = useState('table');

//     useEffect(() => {
//         if (userDetails) {
//             setSubjectAttendance(userDetails.attendance || []);
//         }
//     }, [userDetails])

//     const attendanceBySubject = groupAttendanceBySubject(subjectAttendance)

//     const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);

//     const subjectData = Object.entries(attendanceBySubject).map(([subName, { subCode, present, sessions }]) => {
//         const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
//         return {
//             subject: subName,
//             attendancePercentage: subjectAttendancePercentage,
//             totalClasses: sessions,
//             attendedClasses: present
//         };
//     });

//     const handleSectionChange = (event, newSection) => {
//         setSelectedSection(newSection);
//     };

//     const renderTableSection = () => {
//         return (
//             <>
//                 <Typography variant="h4" align="center" gutterBottom>
//                     Attendance
//                 </Typography>
//                 <Table>
//                     <TableHead>
//                         <StyledTableRow>
//                             <StyledTableCell>Subject</StyledTableCell>
//                             <StyledTableCell>Present</StyledTableCell>
//                             <StyledTableCell>Total Sessions</StyledTableCell>
//                             <StyledTableCell>Attendance Percentage</StyledTableCell>
//                             <StyledTableCell align="center">Actions</StyledTableCell>
//                         </StyledTableRow>
//                     </TableHead>
//                     {Object.entries(attendanceBySubject).map(([subName, { present, allData, subId, sessions }], index) => {
//                         const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);

//                         return (
//                             <TableBody key={index}>
//                                 <StyledTableRow>
//                                     <StyledTableCell>{subName}</StyledTableCell>
//                                     <StyledTableCell>{present}</StyledTableCell>
//                                     <StyledTableCell>{sessions}</StyledTableCell>
//                                     <StyledTableCell>{subjectAttendancePercentage}%</StyledTableCell>
//                                     <StyledTableCell align="center">
//                                         <Button variant="contained"
//                                             onClick={() => handleOpen(subId)}>
//                                             {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}Details
//                                         </Button>
//                                     </StyledTableCell>
//                                 </StyledTableRow>
//                                 <StyledTableRow>
//                                     <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//                                         <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
//                                             <Box sx={{ margin: 1 }}>
//                                                 <Typography variant="h6" gutterBottom component="div">
//                                                     Attendance Details
//                                                 </Typography>
//                                                 <Table size="small" aria-label="purchases">
//                                                     <TableHead>
//                                                         <StyledTableRow>
//                                                             <StyledTableCell>Date</StyledTableCell>
//                                                             <StyledTableCell align="right">Status</StyledTableCell>
//                                                         </StyledTableRow>
//                                                     </TableHead>
//                                                     <TableBody>
//                                                         {allData.map((data, index) => {
//                                                             const date = new Date(data.date);
//                                                             const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
//                                                             return (
//                                                                 <StyledTableRow key={index}>
//                                                                     <StyledTableCell component="th" scope="row">
//                                                                         {dateString}
//                                                                     </StyledTableCell>
//                                                                     <StyledTableCell align="right">{data.status}</StyledTableCell>
//                                                                 </StyledTableRow>
//                                                             )
//                                                         })}
//                                                     </TableBody>
//                                                 </Table>
//                                             </Box>
//                                         </Collapse>
//                                     </StyledTableCell>
//                                 </StyledTableRow>
//                             </TableBody>
//                         )
//                     }
//                     )}
//                 </Table>
//                 <div>
//                     Overall Attendance Percentage: {overallAttendancePercentage.toFixed(2)}%
//                 </div>
//             </>
//         )
//     }

//     const renderChartSection = () => {
//         return (
//             <>
//                 <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
//             </>
//         )
//     };

//     return (
//         <>
//             {loading
//                 ? (
//                     <div>Loading...</div>
//                 )
//                 :
//                 <div>
//                     {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ?
//                         <>
//                             {selectedSection === 'table' && renderTableSection()}
//                             {selectedSection === 'chart' && renderChartSection()}

//                             <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
//                                 <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
//                                     <BottomNavigationAction
//                                         label="Table"
//                                         value="table"
//                                         icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
//                                     />
//                                     <BottomNavigationAction
//                                         label="Chart"
//                                         value="chart"
//                                         icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
//                                     />
//                                 </BottomNavigation>
//                             </Paper>
//                         </>
//                         :
//                         <>
//                             <Typography variant="h6" gutterBottom component="div">
//                                 Currently You Have No Attendance Details
//                             </Typography>
//                         </>
//                     }
//                 </div>
//             }
//         </>
//     )
// }

// export default ViewStdAttendance

import React, { useEffect, useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Box, Button, Collapse, Paper, Table, TableBody, TableHead, Typography } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../../../components/Schoolweb/styles';
import CustomBarChart from '../../../components/Schoolweb/CustomBarChart';

const ViewStdAttendance = () => {
    const [openStates, setOpenStates] = useState({});

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        // Giả sử lấy dữ liệu từ backend thành công
        const mockSubjectAttendance = [
            { subName: 'Math', present: 10, allData: [{ date: '2022-01-01', status: 'Present' }, { date: '2022-01-02', status: 'Absent' }], subId: '1', sessions: 20 },
            { subName: 'Science', present: 15, allData: [{ date: '2022-01-01', status: 'Present' }, { date: '2022-01-02', status: 'Present' }], subId: '2', sessions: 20 },
            { subName: 'English', present: 5, allData: [{ date: '2022-01-01', status: 'Absent' }, { date: '2022-01-02', status: 'Present' }], subId: '3', sessions: 20 },
        ];
        setSubjectAttendance(mockSubjectAttendance);
    }, []);

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const renderTableSection = () => {
        return (
            <>
                <Typography variant="h4" align="center" gutterBottom>
                    Attendance
                </Typography>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Subject</StyledTableCell>
                            <StyledTableCell>Present</StyledTableCell>
                            <StyledTableCell>Total Sessions</StyledTableCell>
                            <StyledTableCell>Attendance Percentage</StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    {subjectAttendance.map((data, index) => {
                        const subjectAttendancePercentage = (data.present / data.sessions) * 100;

                        return (
                            <TableBody key={index}>
                                <StyledTableRow>
                                    <StyledTableCell>{data.subName}</StyledTableCell>
                                    <StyledTableCell>{data.present}</StyledTableCell>
                                    <StyledTableCell>{data.sessions}</StyledTableCell>
                                    <StyledTableCell>{subjectAttendancePercentage.toFixed(2)}%</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button variant="contained" onClick={() => handleOpen(data.subId)}>
                                            {openStates[data.subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}Details
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                        <Collapse in={openStates[data.subId]} timeout="auto" unmountOnExit>
                                            <Box sx={{ margin: 1 }}>
                                                <Typography variant="h6" gutterBottom component="div">
                                                    Attendance Details
                                                </Typography>
                                                <Table size="small" aria-label="purchases">
                                                    <TableHead>
                                                        <StyledTableRow>
                                                            <StyledTableCell>Date</StyledTableCell>
                                                            <StyledTableCell align="right">Status</StyledTableCell>
                                                        </StyledTableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {data.allData.map((attendance, index) => (
                                                            <StyledTableRow key={index}>
                                                                <StyledTableCell component="th" scope="row">
                                                                    {attendance.date}
                                                                </StyledTableCell>
                                                                <StyledTableCell align="right">{attendance.status}</StyledTableCell>
                                                            </StyledTableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </Box>
                                        </Collapse>
                                    </StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        );
                    })}
                </Table>
            </>
        );
    };

    const renderChartSection = () => {
        const chartData = subjectAttendance.map((data) => ({
            subject: data.subName,
            attendancePercentage: (data.present / data.sessions) * 100,
        }));

        return (
            <>
                <Typography variant="h4" align="center" gutterBottom>
                    Attendance
                </Typography>
                <CustomBarChart data={chartData} xKey="subject" yKey="attendancePercentage" />
            </>
        );
    };

    return (
        <>
            <Paper>
                <BottomNavigation value={selectedSection} showLabels onChange={handleSectionChange}>
                    <BottomNavigationAction label="Table" value="table" />
                    <BottomNavigationAction label="Chart" value="chart" />
                </BottomNavigation>
            </Paper>
            <Box mt={4}>
                {selectedSection === 'table' && renderTableSection()}
                {selectedSection === 'chart' && renderChartSection()}
            </Box>
        </>
    );
};

export default ViewStdAttendance;