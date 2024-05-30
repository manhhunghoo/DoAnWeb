import { useState, createContext, useEffect } from 'react';
import HocNhomItem from './Hocnhom/HocNhomItem';
import HocNhom_Setting from './Hocnhom/HocNhom_Setting';
import * as GroupActions from './Hocnhom/GroupActions'
import * as groups from '../service/groups'
import useUser from '../hook/useUser';


export const ShowFormAddGroupContext = createContext()

const HocNhompage = () => {
  const [reRender, setReRender] = useState(false)
  const { user } = useUser()
  const [hocnhoms, setHocnhoms] = useState([])
  useEffect(() => {
    if(user.role=='student') {
      groups.getAllGroupByIdUser(user._id)
      .then((res) => {
        console.log('res hoc nhom get by id user', res)
        setHocnhoms(res)
      })
      .catch((err) => {
        console.log('err get list group', err)
      })
    }
    else if(user.role =='teacher'|| user.role =='admin') {
      groups.getAllGroupByAdmin()
      .then((res) => {
        setHocnhoms(res)
      })
      .catch((err) => {
        console.log('err get list group', err)
      })
    }
  }
    , [reRender])
  const [openAddGroup, setOpenAddGroup] = useState(false);
  const [openJoinGroup, setOpenJoinGroup] = useState(false);

  return (
    <div className='relative ml-[1rem] w-full '>
      <div className=' flex flex-col  md:flex-row justify-between w-full'>
        <h1 className='text-3xl mb-5 ml-2 font-bold'>Học nhóm</h1>
        <div className='end-3 m-4 md:mr-[50px]'>
          <ShowFormAddGroupContext.Provider value={{ openAddGroup, setOpenAddGroup, openJoinGroup, setOpenJoinGroup }}><HocNhom_Setting /></ShowFormAddGroupContext.Provider>
        </div>
      </div>
      <div className='flex justify-between'>
        {' '}
        {/* header của hocnhompage */}
        <ul className='flex mb-5'>
          <li
            className='m-2 font-bold effect ' >
            Tất cả
          </li>
          <li
            className='m-2 font-bold effect ' >
            Lớp học
          </li>
          <li
            className='m-2 font-bold effect' >
            Nhóm riêng tư
          </li>
        </ul>
      </div>
      <div className='flex justify-center'>
        {openAddGroup && <GroupActions.CreateGroup  setReRender={setReRender}/>}
        {openJoinGroup && <GroupActions.JoinGroup />}
      </div>
      <div className='container flex'>
        {hocnhoms.map((HocNhom, index) => (
          <div key={index} className='item'>
            <HocNhomItem HocNhom={HocNhom} setReRender={setReRender} />
          </div>
        ))}
      </div>
    </div>
  )
};

export default HocNhompage
