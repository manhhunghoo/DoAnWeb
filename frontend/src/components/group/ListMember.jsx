import React, { useState,useEffect } from 'react'
import * as groups from '../../service/groups'
import UserAvatar from '../UserAvatar/UserAvatar'
function ListMember({code}) {
    const [listMember, setListMember] = useState([{}])
    useEffect(() => {
        groups.getListStudentOfGroup(code)
        .then(res => {
            console.log('res',res)
            if(res && res.length > 0 && res != [])
            setListMember(res)
        })
        .catch(err => {
            console.log(err)
        })
    },[code])
  return (
    <div>
        <h3 className='mt-2 mr-2 p-2 
                        font-medium md:font-extrabold
                        text-lg  md:text-xl '>Danh sách thành viên</h3>
        <ul>
            {listMember.length>0&&listMember.map((member,index) => {
                return (
                    <>{member.listMemOfGroup &&<li key={index}><UserAvatar userInfo={member.listMemOfGroup}/></li>}</>
                )
            })}
        </ul>
    </div>
  )
}

export default ListMember
