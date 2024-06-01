import { Fragment } from "react";
import routesConfig from "../../src/config/routes";
import Dangnhappage from "../Pages/Dangnhappage";
import Diendanpages from "../Pages/Diendanpages";
import Hocnhompage from "../Pages/Hocnhompage";
import Hoctappage from "../Pages/Hoctappage";
import Khoahocpage from "../Pages/Khoahocpage";
import Profilepage from "../Pages/Profilepage";
import Thongbaopage from "../Pages/Thongbaopage";
import Home from "../components/NavBar/Home";
import KhoahocitemDetail from "../Pages/Khoahoc/KhoahocItemDetail/KhoaHocDetailItem"

import DangnhapLayout from "../components/Layout/DangnhapLayout"

import KhoahocitemDetailLayout from "../components/Layout/KhoahocitemDetailLayout"
import StudentDashboard from "../Pages/Schoolweb/student/StudentDashboard";

import HocnhomDetail from "../Pages/Hocnhom/HocNhomDetail/HocNhomDetail";
import HocTapDetails from "../Pages/Hoctap/HocTapDetails";
import Board from '../Pages/Boards/_id'
//admin
import AdminDashboard from "../Pages/Schoolweb/admin/AdminDashboard";
import AdminHomePage from "../Pages/Schoolweb/admin/AdminHomePage";
import ShowClasses from "../Pages/Schoolweb/admin/classRelated/ShowClasses";
import ShowStudents from "../Pages/Schoolweb/admin/studentRelated/ShowStudents";
import HocnhomDetailLayout from "../components/Layout/HocnhomDetailLayout";
import ShowSubjects from "../Pages/Schoolweb/admin/subjectRelated/ShowSubjects";
import ShowTeachers from "../Pages/Schoolweb/admin/teacherRelated/ShowTeachers";
import Profile from "../components/NavBar/Profile";
import ProfileDetail from "../components/ProfileDetail";
import TodolistLayout from "../components/Layout/TodolistLayout";
import AdminSettingLayout from "../components/Layout/AdminSettingLayout"

const publicRoutes = [
  { path: routesConfig.dangxuat, component: Dangnhappage, layout: DangnhapLayout },

];

//Không cần đăng nhập vẫn vào đượcl
const privateRoutes = [
  { path: routesConfig.diendan, component: Diendanpages },
  { path: routesConfig.home, component: Home },
  { path: routesConfig.hocnhom, component: Hocnhompage },
  { path: routesConfig.khoahoc, component: Khoahocpage },
  { path: routesConfig.hoctap, component: Hoctappage },
  { path: routesConfig.profile, component: Profilepage },
  { path: routesConfig.thongbao, component: Thongbaopage },
  { path: routesConfig.hoctapitem, component: HocTapDetails, layout: KhoahocitemDetailLayout },
  { path: routesConfig.khoahocitem, component: KhoahocitemDetail, layout: KhoahocitemDetailLayout },
  { path: routesConfig.schoolweb, component: StudentDashboard, layout: DangnhapLayout },
  { path: routesConfig.hocnhomitem, component: HocnhomDetail, layout: HocnhomDetailLayout },
  { path: routesConfig.setting, component: AdminHomePage, layout: AdminSettingLayout },
  { path: routesConfig.todolist, component: Board },
  { path: routesConfig.setprofile, component: Profile },
  { path: routesConfig.profiledetail, component: ProfileDetail }
]

const adminRoutes = [
  { path: "/Admin/Setting/classes", component: ShowClasses, layout: AdminSettingLayout },
  { path: "/Admin/Setting/students", component: ShowStudents, layout: AdminSettingLayout },
  { path: "/Admin/Setting/groups", component: ShowSubjects, layout: AdminSettingLayout },
  { path: "/Admin/Setting/teachers", component: ShowTeachers, layout: AdminSettingLayout }
]
// Phải đăng nhập mới vào được
export { publicRoutes, privateRoutes, adminRoutes };
