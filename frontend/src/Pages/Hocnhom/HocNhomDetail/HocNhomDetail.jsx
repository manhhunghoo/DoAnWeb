import { useEffect, useLayoutEffect, useState, useRef } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Tooltip } from '@mui/material';
import * as groups from '../../../service/groups'
import useUser from '../../../hook/useUser'
import backgroundImage from '../../../assets/wallapaper.jpeg'
import { socket } from '../../../service/socket';
import ListMember from '../../../components/group/ListMember';
import ListMessage from '../../../components/group/ListMessage';
// socket;
// export const socket = io.connect("http://localhost:8017");

export default function HocNhomDetail() {
  // state and data 
  const { user } = useUser()
  const { code } = useParams()
  const navigate = useNavigate()
  const [groupDetails, setgroupDetails] = useState({})
  const [listMessage, setListMessage] = useState([{}])
  //ref của thẻ input tin nhắn
  const inputRef = useRef()
  // function
  const handleBack = () => {
    navigate(-1)
  }
  useEffect(() => {
    const formMessage = document.querySelector('#message-group-chat-form')
    formMessage.addEventListener('submit', (e) => {
      e.preventDefault()
      const message = formMessage.querySelector('#chat-send-input').value
      if (message.trim() === '') return null
      const data = { message, code, linkimage: user.linkimage, username: user.username, userid: user._id }
      socket.emit("send_message", data);
      setListMessage(prevList => [...prevList, data]);
      formMessage.querySelector('#chat-send-input').value = ''
      inputRef.current.focus()
    })
    groups.getMessageList(code)
      .then(res => {
        setListMessage(res);
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  useEffect(() => {
    socket.emit("join_room", code)
  }, [code])
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setListMessage(prevList => [...prevList, data]);
    });
  }, [socket])
  useLayoutEffect(() => {
    groups.getGroupByCode(code)
      .then(res => {
        //console.log('res', res)
        setgroupDetails(res)
      })
      .catch(err => {
        console.log('err', err)
      })
  }, [code])

  const handleSeeNav = () => {
    const nav = document.querySelector('#nav-bar-group-action')
    nav.classList.toggle('hidden')
  }
  const handleLeave = () => {
    const a = window.confirm('Are you sure to leave this group?')
    if (a) {
      groups.leaveGroup(code, user._id)
        .then(res => {
          console.log('res', res)
          navigate('/Hocnhompage')
        })
        .catch(err => {
          console.log('err', err)
        })
    }
  }

  return (
    <div className='relative h-full'>
      <nav className='flex justify-between 
        bg-gradient-to-r from-blue-400 to-blue-200 bg-opacity-50 
        align-middle items-center
        px-3 md:px-5 h-14'>
        <div className='flex'>
          <Tooltip title='Back' className='md:mx-5 mx-3 hover:bg-blue-500'>
            <ArrowBackIcon fontSize="large" onClick={handleBack} className='cursor-pointer' />
          </Tooltip>
          <h1 className='md:mx-5 mx-3 text-2xl font-bold md:text-4xl'>{groupDetails.name}</h1>
        </div>
        <div className='flex align-middle items-center'>
          <button className='text-black rounded-md px-3 py-1 m-3 hover:bg-[#C73866] block md:hidden'
            onClick={handleSeeNav}>
            More<MoreVertIcon />
          </button>
          <ul className='flex-col md:flex-row gap-4 pr-2 md:flex hidden'>
            <li className='hover:bg-[#6068d5] hover:rounded-lg hover:p-1'>Member</li>
            <li className='hover:bg-[#6068d5] hover:rounded-lg hover:p-1' onClick={handleLeave}>Leave</li>
            <li className='hover:bg-[#6068d5] hover:rounded-lg hover:p-1' onClick={() => { alert(code) }}>Showcode</li>
            <li className='hover:bg-[#6068d5] hover:rounded-lg hover:p-1'>Member</li>
          </ul>
        </div>
      </nav>
      <ul className='flex-col  
        bg-gradient-to-r from-[#FFDCA2] to-[#FF7A7B]
         items-center gap-2 pr-2 hidden' id="nav-bar-group-action">
        <li className='hover:bg-[#FF7A7B]'>Member</li>
        <li className='hover:bg-[#FF7A7B]' onClick={handleLeave}>Leave</li>
        <li className='hover:bg-[#FF7A7B]' onClick={() => { alert(code) }}>Showcode</li>
        <li className='hover:bg-[#FF7A7B]'>Member</li>
      </ul>
      <div id="chatbox" className='flex h-[calc(100%-56px)] bg-slate-500'>
        <div id="chat-service"
          className='md:w-[23%] h-full w-[0%]
          bg-white border-[2px] border-blue-400 '>
          <ListMember code={code} owner={groupDetails?.owner} />
        </div>
        <div id="chat-content"
          style={{ backgroundImage: `url(${backgroundImage})` }} className='bg-no-repeat h-full flex-1 bg-cover'>
          <div id="chat-message" className='mt-0 overflow-y-scroll h-4/5'>
            <ListMessage listMessage={listMessage} />
          </div>
          {/* chat send */}
          <div id="chat-send" className='h-1/5'>
            <form className='h-full box-border p-2' id='message-group-chat-form'>
              <input type="text" placeholder='Type your message here'
                className='box-border w-[70%] mx-[5%] h-[80%] rounded-xl mt-3 px-3 py-1 bg-white border-[2px] border-blue-300 text-black'
                id='chat-send-input'
                ref={inputRef}
              />
              <span className='w-1/5 box-border' id="more-type-message">
                <Tooltip title='image'>
                  <ImageIcon />
                </Tooltip>
                <Tooltip title='more'>
                  <AddCircleIcon />
                </Tooltip>
                <Tooltip title='Send'>
                  <button type='submit'><SendIcon /></button>
                </Tooltip>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
