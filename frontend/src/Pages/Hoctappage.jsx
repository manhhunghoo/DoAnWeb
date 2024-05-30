import React, { useEffect, useState } from "react"
import HoctapItem from "./Hoctap/HocTapItem"
import "./Add.css"
import { FaHeadphonesAlt } from "react-icons/fa"


import * as studies from '../service/studies'
import useUser from "../hook/useUser"
import { CreateCourse } from "../components/teacherAction/courseAction"

const Hoctappage = () => {
  //state
  const [hoctaps,setHoctaps] =useState([])
  const { user } = useUser()
  const [refesh,setRefesh] = useState(false)
  //callback
  useEffect(()=>{
    document.title='Hoc tap day'
    console.log('mount hoc tap')
    if(user) {
      const fetchHoctaps = async () => {
        return await studies.getStudiesAll()
      }
      fetchHoctaps()
      .then((data) => {
        setHoctaps(data[0])
      })
      .catch((error) => {
        console.log('hoc tap error',error)
      })
    }
    return () => {
      console.log('unmount hoc tap')
    }
  },[refesh])
  return (
    <div className="w-full">

      <div className="relative ml-[1rempx]">
        <h1 className="text-3xl mb-5 ml-2 font-bold">Học tập</h1>

        <ul className="flex mb-5">
          <li
            className="m-2 font-bold effect">
            Tất cả
          </li>
          <li
            className="m-2 font-bold effect">
            Đang học
          </li>
          <li
            className="m-2 font-bold effect">
            Hoàn thành
          </li>
          <li
            className="m-2 font-bold effect" onClick={()=> setRefesh(pre => !pre)}>
            Refesh
          </li>
        </ul>
        {(user.role === 'teacher' || user.role === 'admin' ) ? <CreateCourse isCourse={false} isStudy={true} user={user}/> : null}

        <div className="w-full">
          {
        hoctaps.map((HocTap, index) => (
            <div key={index} className="nhom-cac-hoc-tap w-full">
              <HoctapItem HocTap={HocTap}  />
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default Hoctappage
