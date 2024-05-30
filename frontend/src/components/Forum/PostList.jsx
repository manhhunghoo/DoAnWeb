import React, { useEffect, useState ,useRef} from 'react'
import PostItem from './PostItem'

import * as forum from '../../service/forum'
import { post } from '../../utils/httpRequest'

export default function PostList() {
    const postForumBottomRef = useRef()
    const [posts,setPosts] =useState( [
    ])
    useEffect(() => {
        console.log('mount PostList')
        const RefInterval = setInterval(() => {
            forum.getForumAll()
            .then(res => {
                setPosts(res)
            })
            .catch(err => {
                console.log('err',err)
            })  
        }, 3000)
        return () => {
            console.log('unmout Post List')
            clearInterval(RefInterval)
        }
    },[])
    useEffect(() => {
        //postForumBottomRef.current.scrollIntoView({behavior: 'smooth'})
    },[posts])
  return (
    <ul>
        {posts.length>0 && posts.map(post => (
            <PostItem post={post} key={post._id} />
        ))}
        <div id='post-forum-bottom' ref={postForumBottomRef}></div>
    </ul>
  )
}
