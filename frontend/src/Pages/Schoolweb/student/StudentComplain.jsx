// import { useEffect, useState } from 'react';
// import { Box, CircularProgress, Stack, TextField, Typography } from '@mui/material';

// import { useDispatch, useSelector } from 'react-redux';
// import Popup from '../../../components/Schoolweb/Popup';
// import { addStuff } from '../../../redux/Schoolweb/userRelated/userHandle';
// import { BlueButton } from '../../../components/Schoolweb/buttonStyles';

// const StudentComplain = () => {
//     const [complaint, setComplaint] = useState("");
//     const [date, setDate] = useState("");

//     const dispatch = useDispatch()

//     const { status, currentUser, error } = useSelector(state => state.user);

//     const user = currentUser._id
//     const school = currentUser.school._id
//     const address = "Complain"

//     const [loader, setLoader] = useState(false)
//     const [message, setMessage] = useState("");
//     const [showPopup, setShowPopup] = useState(false);

//     const fields = {
//         user,
//         date,
//         complaint,
//         school,
//     };

//     const submitHandler = (event) => {
//         event.preventDefault()
//         setLoader(true)
//         dispatch(addStuff(fields, address))
//     };

//     useEffect(() => {
//         if (status === "added") {
//             setLoader(false)
//             setShowPopup(true)
//             setMessage("Done Successfully")
//         }
//         else if (error) {
//             setLoader(false)
//             setShowPopup(true)
//             setMessage("Network Error")
//         }
//     }, [status, error])

//     return (
//         <>
//             <Box
//                 sx={{
//                     flex: '1 1 auto',
//                     alignItems: 'center',
//                     display: 'flex',
//                     justifyContent: 'center'
//                 }}
//             >
//                 <Box
//                     sx={{
//                         maxWidth: 550,
//                         px: 3,
//                         py: '100px',
//                         width: '100%'
//                     }}
//                 >
//                     <div>
//                         <Stack spacing={1} sx={{ mb: 3 }}>
//                             <Typography variant="h4">Complain</Typography>
//                         </Stack>
//                         <form onSubmit={submitHandler}>
//                             <Stack spacing={3}>
//                                 <TextField
//                                     fullWidth
//                                     label="Select Date"
//                                     type="date"
//                                     value={date}
//                                     onChange={(event) => setDate(event.target.value)} required
//                                     InputLabelProps={{
//                                         shrink: true,
//                                     }}
//                                 />
//                                 <TextField
//                                     fullWidth
//                                     label="Write your complain"
//                                     variant="outlined"
//                                     value={complaint}
//                                     onChange={(event) => {
//                                         setComplaint(event.target.value);
//                                     }}
//                                     required
//                                     multiline
//                                     maxRows={4}
//                                 />
//                             </Stack>
//                             <BlueButton
//                                 fullWidth
//                                 size="large"
//                                 sx={{ mt: 3 }}
//                                 variant="contained"
//                                 type="submit"
//                                 disabled={loader}
//                             >
//                                 {loader ? <CircularProgress size={24} color="inherit" /> : "Add"}
//                             </BlueButton>
//                         </form>
//                     </div>
//                 </Box>
//             </Box>
//             <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
//         </>
//     );
// };

// export default StudentComplain;

import React, { useState } from 'react';
import { Box, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import Popup from '../../../components/Schoolweb/Popup';
import { BlueButton } from '../../../components/Schoolweb/buttonStyles';

const StudentComplain = () => {
    const [complaint, setComplaint] = useState("");
    const [date, setDate] = useState("");
    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        // Gọi API ở đây để gửi thông báo lên server
        // Sau khi gọi API thành công, xử lý các trạng thái và hiển thị thông báo tương ứng
        setLoader(false);
        setShowPopup(true);
        setMessage("Done Successfully");
    };

    return (
        <>
            <Box
                sx={{
                    flex: '1 1 auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        maxWidth: 550,
                        px: 3,
                        py: '100px',
                        width: '100%'
                    }}
                >
                    <div>
                        <Stack spacing={1} sx={{ mb: 3 }}>
                            <Typography variant="h4">Complain</Typography>
                        </Stack>
                        <form onSubmit={submitHandler}>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label="Select Date"
                                    type="date"
                                    value={date}
                                    onChange={(event) => setDate(event.target.value)}
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Write your complain"
                                    variant="outlined"
                                    value={complaint}
                                    onChange={(event) => {
                                        setComplaint(event.target.value);
                                    }}
                                    required
                                    multiline
                                    maxRows={4}
                                />
                            </Stack>
                            <BlueButton
                                fullWidth
                                size="large"
                                sx={{ mt: 3 }}
                                variant="contained"
                                type="submit"
                                disabled={loader}
                            >
                                {loader ? <CircularProgress size={24} color="inherit" /> : "Add"}
                            </BlueButton>
                        </form>
                    </div>
                </Box>
            </Box>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default StudentComplain;