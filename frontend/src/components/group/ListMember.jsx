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
        <div className='w-full h-full grid grid-cols-[48px,1fr] bg-white'>
            <div className='w-full'>
                <div className='h-16 flex items-center'>
                    <h2 className='text-xl font-bold p-4 text-slate-800'>Message</h2>
                </div>
                <div className='bg-slate-200 p-[0.5px]'></div>

                <div className=' h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto'>
                    {listMember.length > 0 && listMember.map((member, index) => {
                        return (
                            <>{member.listMemOfGroup &&
                                <li key={index} className='flex items-center gap-2 py-3 px-2 border border-transparent hover:border-primary rounded hover:bg-slate-100 cursor-pointer'>
                                    <UserAvatar userInfo={member.listMemOfGroup} />
                                    {member.listMemOfGroup._id == owner && <p className='font-bold'>Owner</p>}
                                    {((user.role == 'admin' || user._id == owner) && !(member.listMemOfGroup._id == owner)) && <Button onClick={() => handleKick(member.listMemOfGroup._id)}>Kick</Button>}
                                </li>}</>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ListMember
