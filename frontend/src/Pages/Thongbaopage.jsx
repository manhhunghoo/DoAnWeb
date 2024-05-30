import React, { useEffect, useState } from 'react'
import ThongBaoItem from '../components/Item/ThongBaoItem'
import useUser from '../hook/useUser'
import * as event from '../service/event'
import useNotificationEvent from '../hook/useNotificationEvent'
const Thongbaopage = () => {
  const { user } = useUser()
  const { notificationEvent, setNotificationEvent } = useNotificationEvent()
  return (
    <div className='w-full'>
      <div className="flex justify-between">
        <h3 className='md:text-4xl text-2xl font-bold'>Thông báo</h3>
      </div>
      <ul className='m-0'>
        {notificationEvent.length > 0 && notificationEvent.map((item, index) => {
          return (
            <ThongBaoItem key={index} thongbao={item} />
          )
        })}
      </ul>
    </div>
  )
}

export default Thongbaopage
