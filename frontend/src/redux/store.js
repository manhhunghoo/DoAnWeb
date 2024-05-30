//Redux: state manaagement tool

import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './Schoolweb/userRelated/userSlice';
import { studentReducer } from './Schoolweb/studentRelated/studentSlice';
import { teacherReducer } from './Schoolweb/teacherRelated/teacherSlice';
import { noticeReducer } from './Schoolweb/noticeRelated/noticeSlice';
import { complainReducer } from './Schoolweb/complainRelated/complainSlice';
import { sclassReducer } from './Schoolweb/sclassRelated/sclassSlice';


const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer,
        teacher: teacherReducer,
        notice: noticeReducer,
        complain: complainReducer,
        sclass: sclassReducer
    }
})

export default store

//cái này của schoolweb