import React, { useContext, useEffect } from 'react'
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';

import * as notification from '../../service/notification'
import AddNotiItem from '../Form/AddNotiItem';
import useUser from '../../hook/useUser';
import { CurrentNotiListContext, CurrentItemContext } from '../../state/CoursecDetailProvider';
export default function Notification({ id }) {
  const { user } = useUser()
  const { curNotiList, setCurNotiList } = useContext(CurrentNotiListContext)
  const { curItem } = useContext(CurrentItemContext)
  useEffect(() => {
    if (curItem._id) {
      var intervalListNoti = setInterval(() => {
        notification.GetlistNoti(curItem._id)
          .then(res => {
            if (res)
              setCurNotiList(res)
            // console.log('res get list noti', res)
          })
          .catch(err => {
            console.log('err get list noti', err)
          })
      }, 3000)
    }
    return () => {
      clearInterval(intervalListNoti)
    }
  }, [curItem])
  const handleShowAddNoti = () => {
    const formAddNoti = document.querySelector('#add-noti-form')
    console.log(formAddNoti)
    if (formAddNoti.style.display === 'none') {
      formAddNoti.style.display = 'block'
    } else {
      formAddNoti.style.display = 'none'
    }
  }
  return (
    <div
      style={{ display: 'none' }}
      className='absolute w-[15rem] h-[20rem] box-border md:text-xl text-base top-[60px] text-black right-[0rem] rounded-xl shadow-2xl bg-white ' id={id} >
      <div className='text-center flex relative border-b-2 border-black'>
        <AddNotiItem idItem={curItem._id}></AddNotiItem>
        {(user.role !== 'student') ? <button onClick={handleShowAddNoti} className='text-center p-4 justify-start'>
          <NotificationAddIcon >
          </NotificationAddIcon>
        </button> : <></>}
        <h4 className='font-bold  inline flex-1'>Bài tập</h4>
      </div>
      <div className='overflow-y-auto h-4/5 md:text-base text-sm'>
        <ul>
          {curNotiList.map((noti, index) => {
            return (
              <li key={index} className='p-4 border-b-2 border-black'>
                <h4 className='font-bold'>{noti.title}</h4>
                <p>{noti.description}</p>
                <p>{noti.deadline}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
