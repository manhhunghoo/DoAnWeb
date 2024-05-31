import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import useUser from "../../hook/useUser"
import *  as courses from '../../service/courses'
import useKhoaHocRender from "../../hook/useKhoaHocRender"
import { FaTrophy } from "react-icons/fa"


const KhoahocItem = ({ KhoaHoc, className }) => {
  const { user } = useUser()
  const test = useKhoaHocRender()
  const [mark, setMark] = React.useState(0)
  const handleDelete = async (e) => {
    // eslint-disable-next-line no-useless-catch
    try {
      e.stopPropagation()
      const res = await courses.deleteCourse(KhoaHoc._id)
      console.log('res delete course', res)
      if (test != null) {
        test.SetKhoaHocRender(pre => pre + 1)
      }
    }
    catch (err) {
      throw err
    }
  }
  useEffect(() => {
    courses.getMarkStudent(user._id, KhoaHoc._id)
      .then(res => {
        setMark(res.diemso)
      })
      .catch(err => {
        console.log('err', err)
      })
  }, [])

  return (
    <div className={`md:ml-4 frame rounded-md bg-white border-2 border-gray-800 wrap shadow-lg shadow-gray-500 h-auto ${className}`}>
      <Link to={`/Khoahocpage/${KhoaHoc._id}/${KhoaHoc.owner}`}>
        <img
          src={KhoaHoc.linkimage}
          className="mt-4 ml-2 rounded-md border border-gray-800  frame"
          style={{ height: "166.27px", width: "175.53px", borderRadius: '10px', borderImage: '10px' }}
          alt={KhoaHoc.title}
        />
        {/* muốn thêm ảnh thì thêm src trong cái mảng*/}
        <div className="ml-2.5 mt-2">
          {/* content của môn học*/}
          <h1 className="font-bold text-xs mb-2 ">{KhoaHoc.title}</h1>
          <h1 className="font-thin text-xs mb-2">{KhoaHoc.description}</h1>
        </div>
      </Link>
      <div className=' ml-2.5 mt-1 flex mr-5 flex-col md:flex-row justify-between'>
        <div className="font-bold flex mb-4 text-red-600">

          <span className="text-black items-center gap-1 flex mr-10">
            <FontAwesomeIcon icon={faUser} /> {KhoaHoc.memberof}
          </span>
          <span className="text-red-500 gap-1 items-center flex mr-1">
            <FaTrophy />{mark} điểm
          </span>
        </div>

        {(user?.role === "admin" || user?._id === KhoaHoc.owner) && test != null ?
          (<><button
            onClick={handleDelete}
            className="ml-2.5 mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-2">Xóa</button></>) : <></>}
      </div>
    </div>
  )
}
export default KhoahocItem
