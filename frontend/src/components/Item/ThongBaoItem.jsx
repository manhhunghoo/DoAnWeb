import React, { useCallback, useEffect, useLayoutEffect } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { pink } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Tooltip } from '@mui/material';
import useTime from '../../hook/useTime';

function More({ className, myEvent, ...props }) {
  return (
    <div className={`relativ ${className}`} {...props}>
      <p onClick={myEvent.handleDelete}>deleted</p>
    </div>
  )
}
export default function ThongBaoItem({ thongbao }) {
  const [open, setOpen] = React.useState(false);
  const handleDelete = useCallback(() => { }, [])
  const handleTooltipClick = () => {
    setOpen(pre => !pre);
  }
  if (!thongbao)
    return <></>
  return (
    <>
      <li className='flex w-[70%] bg-gradient-to-r from-[#CAF4FF] to-blue-200 bg-opacity-50 mx-auto rounded-3xl shadow-lg my-4 overflow-hidden h-auto md:pl-8 md:pb-8 pb-4 pl-4'>
        <div className='w-full'>
          <div className='flex justify-between'>
            <div className='text-sm font-thin mt-4 mb-2  shadow py-[2px] text-center rounded-md'>Đã tạo:{useTime(thongbao.createdAt)}</div>
            <div className='relative'>
              <Tooltip
                title={<More className=" bg-blue-500 w-auto text-white" myEvent={{ handleDelete }} />}
                open={open} onClick={handleTooltipClick}
                disableInteractive={false}>
                <MoreVertIcon />
              </Tooltip>
            </div>

          </div>
          <h3 className='font-bold text-xl text-[#4D869C] max-w-[70%] w-auto  pl-8'>Type:{thongbao.nameevent}</h3>
          <p>bạn cùng <b>{thongbao.listimpact.length}</b> người khác nhận</p>
        </div>
      </li>
    </>
  )
}
