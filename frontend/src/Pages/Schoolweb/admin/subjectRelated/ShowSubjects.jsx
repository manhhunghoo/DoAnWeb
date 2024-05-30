import React, { useEffect, useState } from 'react';
import * as groups from '../../../../service/groups'
import useUser from '../../../../hook/useUser';


const ShowSubjects = () => {
    const {user}   = useUser()
    const [listGroups, setListGroups] = useState([])
    useEffect(() => {
        groups.getAllGroupByAdmin(user._id)
            .then((res) => {
                console.log('res hoc nhom get all', res)
                setListGroups(res)
            })
            .catch((err) => {
                console.log('err get list group', err)
            })

    },[])

    return (
        <div className='  w-full
        bg-gradient-to-r from-[#7BD5F5] to-[#787FF6]'>
            <h1>See all group</h1>
            <ul>
                {listGroups.map((group, index) => (
                    <li key={index} className='mt-2 border-2 border-black rounded-2xl p-4 m-4
                    bg-gradient-to-r from-[#FFDCA2] to-[#FF7A7B]'>
                        <p>{group.name}</p>
                        <p>{group.code}</p>
                        <p>{group.owner}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShowSubjects;