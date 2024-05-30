// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { Paper } from '@mui/material';
// import { getAllNotices } from '../../redux/Schoolweb/noticeRelated/noticeHandle';
// import TableViewTemplate from './TableViewTemplate';

// const SeeNotice = () => {
//     const dispatch = useDispatch();

//     const { currentUser, currentRole } = useSelector(state => state.user);
//     const { noticesList, loading, error, response } = useSelector((state) => state.notice);

//     useEffect(() => {
//         if (currentRole === "Admin") {
//             dispatch(getAllNotices(currentUser._id, "Notice"));
//         }
//         else {
//             dispatch(getAllNotices(currentUser.school._id, "Notice"));
//         }
//     }, [dispatch]);

//     if (error) {
//         console.log(error);
//     }

//     const noticeColumns = [
//         { id: 'title', label: 'Title', minWidth: 170 },
//         { id: 'details', label: 'Details', minWidth: 100 },
//         { id: 'date', label: 'Date', minWidth: 170 },
//     ];

//     const noticeRows = noticesList.map((notice) => {
//         const date = new Date(notice.date);
//         const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
//         return {
//             title: notice.title,
//             details: notice.details,
//             date: dateString,
//             id: notice._id,
//         };
//     });

//     return (
//         <div style={{ marginTop: '50px', marginRight: '20px' }}>
//             {loading ? (
//                 <div style={{ fontSize: '20px' }}>Loading...</div>
//             ) : response ? (
//                 <div style={{ fontSize: '20px' }}>No Notices to Show Right Now</div>
//             ) : (
//                 <>
//                     <h3 style={{ fontSize: '30px', marginBottom: '40px' }}>Notices</h3>
//                     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//                         {Array.isArray(noticesList) && noticesList.length > 0 &&
//                             <TableViewTemplate columns={noticeColumns} rows={noticeRows} />
//                         }
//                     </Paper>
//                 </>
//             )}
//         </div>
//     )
// }

// export default SeeNotice

import React, { useEffect } from 'react';
import { Paper } from '@mui/material';
import TableViewTemplate from './TableViewTemplate';

const SeeNotice = () => {
    const noticesList = [
        { title: 'Notice 1', details: 'Chức năng chưa hoàn thiện nạp tiền để cải thiện', date: '2024-17-05', id: '1' },
        { title: 'Notice 2', details: 'Vui lòng thanh toán tiền web', date: '2024-16-05', id: '2' },
        { title: 'Notice 3', details: 'Thanh toán để sử dụng nhiều chức năng hơn', date: '2024-04-05', id: '3' },
    ]; // Dữ liệu thông báo (giả định)

    useEffect(() => {
        // Không gọi API ở đây vì chúng ta chỉ quan tâm đến giao diện frontend
    }, []);

    const noticeColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'details', label: 'Details', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];

    const noticeRows = noticesList.map((notice) => ({
        title: notice.title,
        details: notice.details,
        date: notice.date,
        id: notice.id,
    }));

    return (
        <div style={{ marginTop: '50px', marginRight: '20px' }}>
            {Array.isArray(noticesList) && noticesList.length > 0 ? (
                <>
                    <h3 style={{ fontSize: '30px', marginBottom: '40px' }}>Notices</h3>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableViewTemplate columns={noticeColumns} rows={noticeRows} />
                    </Paper>
                </>
            ) : (
                <div style={{ fontSize: '20px' }}>No Notices to Show Right Now</div>
            )}
        </div>
    );
};

export default SeeNotice;