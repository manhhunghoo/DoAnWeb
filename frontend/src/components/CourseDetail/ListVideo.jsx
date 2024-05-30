import React, { useEffect, useContext, useState } from 'react'

import { CurrentVideoListContext, CurrentVideoContext } from '../../state/CoursecDetailProvider'

import * as videos from '../../service/videos'
import useUser from '../../hook/useUser'
import { memo } from 'react'

function ListVideo({ item }) {
    const { user } = useUser()
    const {curVideoList, setCurVideoList} = useContext(CurrentVideoListContext)
    const { setCurVideo } = useContext(CurrentVideoContext)
    useEffect(() => {
        videos.getVideoOfItem(item._id)
            .then(res => {
                if (res)
                setCurVideoList(res)
            })
            .catch(err => {
                console.log('err get video list', err)
            })
    }, [item])
    const handleDeleteVideo = (id) => {
        videos.deleteVideo(id)
            .then(res => {
                console.log('res delete video', res)
            })
            .catch(err => {
                console.log('err delete video', err)
            })
    }
    return (
        <ul className='bg-blue-200 w-full rounded-xl '>
            {curVideoList?.map((video, index) => {
                return (
                    <li  key={index} className='mt-0 round-xl border-[1px] border-b-black '>
                        <div onClick={() => { setCurVideo(video) }} >
                            <h5> Title: {video.title}</h5>
                            <p className='text-sm font-thin'> Description: {video.description}</p>
                        </div>
                        {(user.role === 'teacher' || user.role === 'admin') && (
                            <button className='ml-[30%] bg-blue-300 rounded-xl hover:bg-blue-500'
                                onClick={() => handleDeleteVideo(video._id)}
                            >Delete</button>
                        )}
                    </li>
                )
            })
            }
        </ul>
    )
}

export default memo(ListVideo)