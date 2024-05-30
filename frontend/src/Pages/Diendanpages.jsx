import React, { useState } from "react"
import { styled } from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CropOriginalIcon from '@mui/icons-material/CropOriginal'
import { Link } from "react-router-dom"

import config from '../config/routes'
import PostList from "../components/Forum/PostList"
import CreatePost from '../components/Forum/CreatePost'
import { Fab } from "@mui/material"


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

const Diendanpages = () => {
  const [showCreatePost, setShowCreatePost] = useState(false)

  const handleCreatePost = () => {
    setShowCreatePost(!showCreatePost)
  }
  return (
    <div className="ml-2 bg-[#f0f7ff] w-full">
      <div className="w-full flex-col md:flex-row flex justify-between">

        <h1 className="text-3xl mb-5 ml-2 font-bold">Diễn đàn</h1>
        <Fab variant="extended" onClick={handleCreatePost} className='bg-[#0077ff] text-white' sx={{ position: 'absolute', right: 25 }}>
          Creat post
        </Fab>
      </div>
      <div className="flex justify-center">{showCreatePost && <CreatePost setShowCreatePost={setShowCreatePost} />}</div>
      {/* <VideoList /> */}
      <PostList />
    </div >
  )
}

export default Diendanpages
