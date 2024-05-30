import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const axiosNew = axios.create({
  baseURL: "http://localhost:8017/api",
});

const Profile = () => {
  let { id } = useParams();
  const [imageUrl, setImageUrl] = React.useState(null); // State để lưu trữ URL hình ảnh

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData();
    const fileField = document.querySelector('input[type="file"]');

    if (fileField.files.length > 0) {
      formData.append('image', fileField.files[0]); // Append the selected file to formData
    }

    try {
      const response = await axiosNew.post('/upload/image', formData); // Removed unnecessary body and headers configuration

      console.log(response.data); // Log the response data
    } catch (error) {
      console.error('There has been a problem with your axios request:', error);
    }
  };


  const hanleFileChange = (e) => {
    const file = e.target.files[0]
    setImageUrl(URL.createObjectURL(file))
  }


  return (
    <div>
      <li>{id}</li>
      <form onSubmit={handleSubmit}>
        <input type="file" name="image" onChange={(e) => hanleFileChange(e)} />
        <button type="submit">Upload hình ảnh</button>
      </form>
      {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />} {/* Hiển thị hình ảnh */}
    </div>
  );
};

export default Profile;



// import { useEffect, useState } from 'react'
// import Avatar from '@mui/material/Avatar'

// import * as update from '../service/updates'
// import useUser from '../hook/useUser'

// const Profilepage = () => {
//   const { user } = useUser()
//   const [username, setUsername] = useState('')

//   useEffect(() => {
//     setUsername(user?.username)
//   }, [user])

//   const handleOnchangeUsername = (e) => {
//     setUsername(e.target.value)
//   }

//   const handleUpdate = () => {
//     update.updateUser(user._id, { username })
//       .then(response => {
//         console.log(response)
//         alert('Profile updated successfully')
//       })
//       .catch(error => {
//         alert('Profile update failed', error)
//       })
//     console.log('update', username)
//   }

//   return (
//     <div className='m-28 bg-slate-100 w-full flex-row'>
//       <h1 className='text-4xl font-bold text-center'>Profile Page</h1>
//       <p>Username: {user.username}</p>
//       <form id='form-profile'>
//         <div className='profile-form-group flex'>
//           <label htmlFor='username' className='p-6 w-30 sm:w-40'>Change Username: </label>
//           <input type='text'
//             name='username'
//             className='border-2 border-black flex-1 '
//             placeholder='Enter new username'
//             value={username}
//             onChange={handleOnchangeUsername}
//           ></input>
//           <button
//             className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
//             onClick={handleUpdate}
//           >
//             Update
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default Profilepage