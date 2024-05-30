import { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'

import * as update from '../service/updates'
import useUser from '../hook/useUser'

const Profilepage = () => {
  const { user, setUser } = useUser()
  const [username, setUsername] = useState(user.username)
  const [password, setPassword] = useState('123456')
  const [avatar, setAvatar] = useState(user.linkimage)

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  const handleSubmitProfile = (e) => {
    e.preventDefault()
    let data = {}
    if (username && username.trim() !== '')
      data.username = username
    if (password)
      data.password = password
    if (avatar && avatar.trim() !== '')
      data.linkimage = avatar

    if (user.role === 'teacher') {
      update.updateTeacher(user._id, data)
        .then(response => {
          alert('Thay đổi thông tin thành công')
          setUser({ ...user, username, linkimage: avatar })
        })
        .catch(error => {
          alert('Thay đổi thông tin thất bại', error)
        })
    } else {
      update.updateUser(user._id, data)
        .then(response => {
          alert('Thay đổi thông tin thành công')
          setUser({ ...user, username, linkimage: avatar })
        })
        .catch(error => {
          alert('Thay đổi thông tin thất bại', error)
        })
    }
  }

  useEffect(() => {
    const FormProfile = document.querySelector('#form-profile')
    FormProfile.addEventListener('submit', handleSubmitProfile)
  }, [])

  return (
    <div
      className="form w-[80%] rounded-md shadow-xl overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 py-5 px-6 bg-white flex flex-col items-center justify-center gap-3 ml-28 transition-all duration-300"
    >
      <p
        className="text-[#A15A3E] translate-x-[46%] -rotate-90 tracking-[20px] transition-all hover:translate-x-[50%] -translate-y-1/2 font-semibold text-2xl absolute right-0"
      >
        {user.username}
      </p>
      <div className="capitalize  w-[80%]">
        <p className="text-2xl text-[#7F3D27] text-center font-bold mt-2">Profile page</p>
        <div className='flex justify-center'>
          <Avatar alt={user.username} src={avatar} sx={{ width: 100, height: 100 }} />
        </div>
        <form id='form-profile' onSubmit={handleSubmitProfile} className='flex flex-col gap-3'>
          <div className='profile-form-group flex flex-col items-start w-full'>
            <label htmlFor='avatar' className='text-sm text-[#7F3D27] font-bold'>Avatar: </label>
            <input type='url' name='avatar' placeholder='Chosse link iamge' autoComplete='off' value={avatar} className='w-full py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-[#7F3D27] placeholder:text-[#A15A3E] focus:outline-none text-[#7F3D27] placeholder:text-xs' onChange={e => setAvatar(e.target.value)}></input>
          </div>

          <div className='profile-form-group flex flex-col items-start w-full'>
            <label htmlFor='username' className='text-sm text-[#7F3D27] font-bold'>Username: </label>
            <input type='text' name='username' autoComplete='off' className='w-full py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-[#7F3D27] placeholder:text-[#A15A3E] focus:outline-none text-[#7F3D27] placeholder:text-xs' placeholder='Username' value={username} onChange={handleUsername}></input>
          </div>

          <div className='profile-form-group flex flex-col items-start w-full'>
            <label htmlFor='password' className='text-sm text-[#7F3D27] font-bold'>Password: </label>
            <input type='password' name='password' className='w-full py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-[#7F3D27] placeholder:text-[#A15A3E] focus:outline-none text-[#7F3D27] placeholder:text-xs' placeholder='nhập password' value={password} onChange={handlePassword}></input>
          </div>


          <input type='submit' value='Lưu thay đổi' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'></input>
        </form>
      </div>
    </div >
  )
}

export default Profilepage