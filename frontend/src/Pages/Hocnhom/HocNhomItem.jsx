import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import * as groups from '../../service/groups'

import useUser from '../../hook/useUser'
const HocNhomItem = ({ HocNhom, setReRender }) => { // tạo props với object
  const { user } = useUser()
  const handleDeleteGroup = () => {
    groups.deleteGroupByCode(HocNhom.code, HocNhom.owner)
      .then((res) => {
        setReRender(pre => !pre)
      })
      .catch((err) => {
        console.log('err delete group', err)
      })
  }
  return (
    <div className='md:ml-4 frame rounded-md bg-white wrap h-auto '>
      <Link to={`/Hocnhompage/${HocNhom.code}`}>
        <img src={HocNhom.linkImage}
          className='mt-4 ml-2 rounded-md frame'
          style={{ height: '166.27px', width: '175.53px' }}
          alt={HocNhom.name}
        /> {/* muốn thêm ảnh thì thêm src trong cái mảng*/}
        <div className='ml-2.5 mt-2'>
          <h1 className='font-bold text-xs mb-2'> {HocNhom.name}</h1> {/* content của môn học*/}
          <p className='font-thin text-xs mb-2'>{HocNhom.description}</p> {/* content của môn học*/}
        </div>
      </Link>
      <div className=' ml-2.5 mt-1 flex flex-col md:flex-row justify-between'>
        <div className="font-bold text-red-600"><span className="text-black items-center gap-1 flex ">
          <FontAwesomeIcon icon={faUser} />{HocNhom?.listMem.length}
        </span> </div>


        {(user.role === 'admin' || HocNhom?.owner === user._id) &&
          <button
            onClick={handleDeleteGroup}
            className='ml-2.5 mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-2' >Xóa</button>}
      </div>
    </div>

  )
}
// tạo componentHocNhomItem với props ten, giaovien, siso và trả về 1 div chứa title, giáo viên và sĩ số
export default HocNhomItem;
