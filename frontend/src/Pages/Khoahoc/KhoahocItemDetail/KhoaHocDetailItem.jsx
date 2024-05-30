import { useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { BsPersonLinesFill } from "react-icons/bs";
import { MdFormatListBulletedAdd } from "react-icons/md";

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import NotificationsIcon from '@mui/icons-material/Notifications';

//context
import { CurrentCourseContext, CurrentVideoContext, CurrentItemContext } from "../../../state/CoursecDetailProvider"

//component
import AddStudentForm from "../../../components/Form/AddStudentForm"
import CreateItemForm from "../../../components/Form/CreateItemForm"
import KhoahocDetailVideo from "./KhoahocDetailItem/KhoahocDetailVideo"
import KhoahocDetailList from "./KhoahocDetailItem/KhoahocDetailList"
import { UserContext } from "../../../App"
import * as courses from '../../../service/courses'
import CommentVideo from './KhoahocDetailItem/CommentVideo'
import ListStudent from "../../../components/CourseDetail/ListStudent"
import ListPost from "../../../components/CourseDetail/ListPost"
import Notification from '../../../components/CourseDetail/Notification'

function KhoahocDetailItem() {

  //context
  const { curVideo } = useContext(CurrentVideoContext)
  const { courseDetails, setCourseDetails } = useContext(CurrentCourseContext)
  const { curItem } = useContext(CurrentItemContext)
  //state
  const [showCreateItem, setShowCreateItem] = useState(false)
  const [showFormAddStudent, setShowFormAddStudent] = useState(false)
  const [showListtudent, setShowListStudent] = useState(false)
  const { user } = useContext(UserContext)
  const { courseId, ownerId } = useParams()

  // function
  const handleSeeStudent = () => {
    setShowListStudent(pre => !pre)
  }
  const handleAddStudent = () => {
    setShowFormAddStudent(pre => !pre)
  }
  const handleCreateItem = () => {
    setShowCreateItem(pre => !pre)
  }
  const handleNotification = (e) => {
    const listNoti = document.getElementById('ListNoti')
    if (listNoti.style.display === 'none') {
      listNoti.style.display = 'block'
    } else {
      listNoti.style.display = 'none'
    }
  }
  useEffect(() => {
    document.title = courseDetails.title
    courses.getCourseDetail(ownerId, courseId)
      .then(res => {
        console.log('res detail course', res)
        setCourseDetails(res)
        document.title = res.title
      })
      .catch(err => {
        console.log('err detail course', err)
      })
  }, [ownerId, courseId, showCreateItem])


  return (
    <>
      <div className="bg-gradient-to-l from-[#3292FF] to-[#B5D5FB] w-full box-border flex justify-between" id="navbar-course">
        <h1 className="h-[56px] text-[#3f3f3f] font-bold text-[1.2rem] items-center flex relative md:px-4 px-2">{courseDetails.title}</h1>
        <div className='teacher-action'>
          <div className="flex">
            {
              (user._id === courseDetails.owner || user.role === 'admin') ?
                (
                  <>
                    <button className="text-white items-center mr-2 p-4" onClick={handleCreateItem}><MdFormatListBulletedAdd className="inline-block  w-6 h-6 mr-1 -mt-1" /> <p className=" hidden md:inline">Item</p></button>
                    <button className="text-white items-center mr-2 p-4" onClick={handleSeeStudent}><BsPersonLinesFill className="inline-block w-6 h-6 mr-2 -mt-1" /><p className=" hidden md:inline">See</p></button>
                    <button className="text-white items-center mr-5 p-4" onClick={handleAddStudent}><PersonAddAltIcon className="inline-block w-6 h-6 mr-2 -mt-1" /><p className=" hidden md:inline">Add</p></button>
                  </>
                ) : <></>}
            <div className="relative">
              <button className="text-white mr-5 p-4 " onClick={handleNotification}>
                <NotificationsIcon className="inline-block w-6 h-6 mr-2 -mt-1" />
                <p className="hidden md:inline">Notification</p>
              </button>
              <Notification id='ListNoti' />
            </div>
          </div >
        </div >
      </div >
      {showFormAddStudent && <AddStudentForm idAdd={courseId} isCourse={true} />
      }
      {showCreateItem && <CreateItemForm idCourse={courseId} isCourse={true} />}
      <div className="flex gap-5 w-full">
        <div className="w-[20%] bg-[#fffff5] rounded-2xl shadow-2xl md:max-h-[700px] h-[500px]">
          <KhoahocDetailList />
        </div>
        <div id="video-khoa-hoc" className="flex-1">
          <KhoahocDetailVideo url={curVideo?.link} />
        </div>
      </div>
      <div className='bg-[#F0F7FF] flex flex-col max-h-[400px] w-full overflow-auto'>
        <div className="flex my-4">
          <CommentVideo item={curItem} />
        </div>

        <div className=" rounded-lg mb-4">
          <h1 className="h-[56px] bg-gradient-to-l from-[#3292FF] to-[#B5D5FB] rounded-t-lg w-full box-border justify-between relative text-[#3f3f3f] font-bold text-[1.2rem] items-center flex md:px-4 px-2">
            Bài đăng
          </h1>
          <ListPost item={curItem} />
        </div>

        {(showListtudent && (user?.role === 'admin' || courseDetails?.owner === user._id)) &&
          <ListStudent courseId={courseId} />}
      </div>
    </>
  );
}

export default KhoahocDetailItem;
