import React from 'react';
import useUser from '../../hook/useUser';
import * as authentic from '../../service/authentic'
import { removeUserInLocalStorage } from '../../hook/useCheckLogin';
const Dangxuat = () => {
  const {user,setUser} = useUser()
  const hanldeLogout = () =>{
    authentic.logout(user._id,user.role)
    .then((res) => {
      setUser(null)
      removeUserInLocalStorage()
    })
    .catch((err) => {
      console.log('err logout', err)
    })
  }
  return (
    <div className='mt-9 text-lg text-[#ff3e3e] font-bold w-[135px] mb-16 rounded' onClick={hanldeLogout}>
      {/* <LuLogOut className='inline-block w-6 h-6 mr-2 -mt-2'></LuLogOut> */}
      Đăng xuất
    </div>
  );
};

export default Dangxuat;
