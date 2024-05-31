import React, { useCallback } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { pink } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Tooltip } from '@mui/material';
import * as forum from '../../service/forum'
import useTime from '../../hook/useTime'
import useUser from '../../hook/useUser';

export default function PostItem({ post }) {
  const { user } = useUser()
  const [open, setOpen] = React.useState(false);
  // const [showUpdate, setShowUpdate] = React.useState(false);
  const handleDelete = useCallback(() => {
    forum.deleteForum(post._id)
      .then(() => {
        alert('Delete success')
      })
      .catch((err) => {
        console.log('delete', err)
      })
  }, [])
  const handleTooltipClick = () => {
    setOpen(pre => !pre);
  }
  const postTime = useTime(post.createdAt);
  return (
    <>
      {/* {showUpdate && <UpdatePost post={post} setShowUpdate={setShowUpdate} />} */}
      <li className='flex md:flex-row flex-col gap-1 w-[80%] shadow-lg bg-gradient-to-r from-[#99c3f3] to-[#B5D5FB] border-2 border-gray-800  shadow-gray-500 mx-auto rounded-3xl my-4 overflow-hidden h-auto'>
        <div className="m-auto md:w-1/5">
          <img src={'https://i.pinimg.com/736x/a5/20/0f/a5200f19de6c7b5d35b89262cd73e129.jpg' && post.linkPDF} alt={`Post-image-${post.title}-image`} />
        </div>
        <div className='ml-2 w-4/5 flex flex-col'>
          <div className='flex justify-between'>
            <div className='flex mt-4 mb-2'>
              <h4 className="text-sm font-bold bg-white shadow py-[2px] w-20 text-center rounded-md">Hỏi đáp</h4>
              <time className='m-0 font-thin text-sm text-gray-500'>{postTime}</time>
            </div>
            {
              (user.role === 'admin' || user._id === post?.user) && (<div className='relative'>
                <Tooltip
                  title={<ul>
                    <li onClick={handleDelete}>delete</li>
                  </ul>}
                  open={open} onClick={handleTooltipClick}
                  disableInteractive={false}>
                  <MoreVertIcon />
                </Tooltip>
              </div>)
            }

          </div>
          <h3 className='font-bold text-xl max-w-[70%] w-auto rounded-md pl-8'>{post.title}</h3>
          <div className='flex-col h-full m-8'>
            <a href={post.linkPDF} target='_blank' rel="noreferrer"> PDF or image: {post.linkPDF}</a>
            <p > Description: {post.description}</p>
            <div className='flex md:mt-12 mt-4'>
              {post?.like}<FavoriteIcon sx={{ color: pink[500] }} fontSize='small' className='mx-4' />
              {post?.comment}<ChatBubbleIcon color="primary" fontSize='small' className='mx-4' />
            </div>
          </div>
        </div>
      </li>
    </>
  )
}
