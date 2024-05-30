import React, { createContext, useEffect, useState } from "react"

import KhoahocItem from "./Khoahoc/KhoahocItem"
//import { Link, Route } from "react-router-dom"
import "./Add.css"
import useUser from "../hook/useUser"
import * as courses from '../service/courses'
import { CreateCourse } from "../components/teacherAction/courseAction"

export const KhoaHocRenderContext = createContext()

const Khoahocpage = () => {
  const [khoaHocRender, SetKhoaHocRender] = useState(1)
  const [khoahocs, setKhoahocs] = useState([])
  const { user } = useUser()
  useEffect(() => {
    if (user.role === 'admin') {
      courses.GetCourseAll()
        .then((res) => {
          setKhoahocs(res[0])
        })
        .catch((err) => {
          console.log(err)
        })
    }
    else if (user.role === 'teacher') {
      courses.getCourseListTeacher(user._id).then((res) => {
        if (res)
          setKhoahocs(res)
      }).catch((err) => {
        console.log(err)
      })
    }
    else if (user.role === 'student') {
      courses.getCourseListStudent(user._id).then((res) => {
        setKhoahocs(res)
      }).catch((err) => {
        console.log(err)
      })
    }
  }, [khoaHocRender])
  const getCourseListStudent = () => {
    courses.getCourseListStudent(user._id).then((res) => {
      setKhoahocs(res)
    }).catch((err) => {
      console.log(err)
    })
  }
  const getCourseListDone = () => {
    courses.getCoursesDone(user._id).then((res) => {
      setKhoahocs(res)
    }).catch((err) => {
      console.log(err)
    })
  }
  return (
    <KhoaHocRenderContext.Provider value={{ khoaHocRender, SetKhoaHocRender }}>
      <div className=" dimension">
        <div className=" ml-[1rem]">
          <h1 className="text-3xl mb-5 ml-2 font-bold">Khóa học</h1>
          {(user.role === 'student') ?
            <ul className="flex mb-5">
              <li className="m-2 font-bold effect" onClick={getCourseListStudent}>
                Tất cả
              </li>
              <li className="m-2 font-bold effect" onClick={getCourseListDone}>
                Hoàn thành
              </li>
            </ul> : null}

          {(user.role === 'teacher' || user.role === 'admin') ? <CreateCourse isCourse={true} isStudy={false} user={user} /> : null}
          <div className="container flex">
            {khoahocs?.length > 0 ? khoahocs.map((khoahoc, index) => (
              <div key={index} className="item">
                <KhoahocItem KhoaHoc={khoahoc} />
              </div>
            )) : <h1>Không có khóa học nào</h1>}
          </div>
        </div>
      </div>
    </KhoaHocRenderContext.Provider>
  )
}

export default Khoahocpage
