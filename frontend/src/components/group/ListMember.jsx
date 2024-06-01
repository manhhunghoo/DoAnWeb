import React, { useState, useEffect } from 'react'
import * as groups from '../../service/groups'
import UserAvatar from '../UserAvatar/UserAvatar'
import { Button } from '@mui/material'
import useUser from '../../hook/useUser'
import { set } from 'lodash'
function ListMember({ code, owner }) {
    const { user } = useUser()
    const [listMember, setListMember] = useState([{}])
    useEffect(() => {
        groups.getListStudentOfGroup(code)
            .then(res => {
                console.log('res', res)
                if (res && res.length > 0 && res != [])
                    setListMember(res)
            })
            .catch(err => {
                console.log(err)
            })
    }, [code])
    const handleKick = (id) => {
        const a = window.confirm('Are you sure to Kick this member?')
        if (a) {
            groups.leaveGroup(code, id)
                .then(res => {
                    alert('Kick member success')
                    setListMember(listMember.filter(member => member.listMemOfGroup._id != id))
                })
                .catch(err => {
                    console.log('err', err)
                })
        }
    }
    return (
        <div>
            <h3 className='mt-2 mr-2 p-2 
                        font-medium md:font-extrabold
                        text-lg  md:text-xl '>Danh sách thành viên</h3>
            <ul>
                {listMember.length > 0 && listMember.map((member, index) => {
                    return (
                        <>{member.listMemOfGroup &&
                            <li key={index} className='flex'>
                                <UserAvatar userInfo={member.listMemOfGroup} />
                                {member.listMemOfGroup._id == owner && <p className='font-bold'>Owner</p>}
                                {((user.role == 'admin' || user._id == owner) && !(member.listMemOfGroup._id == owner)) && <Button onClick={() => handleKick(member.listMemOfGroup._id)}>Kick</Button>}
                            </li>}</>
                    )
                })}
            </ul>
        </div>
    )
}

export default ListMember