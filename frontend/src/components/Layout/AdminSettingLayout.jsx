import React from 'react'
import Navbar from '../Navbar'
import CoursecDetailProvider from '../../state/CoursecDetailProvider'
import { List } from '@mui/material'
import SideBar from '../../Pages/Schoolweb/admin/SideBar'

export default function AdminSettinglayot({ children }) {
  return (
    <div className="flex flex-col h-screen bg-[#F0F7FF]">
      <header>
        <Navbar />
      </header>
      <div className='flex w-full pt-[98px]'>
        <List component="nav">
          <SideBar />
        </List>
      </div>
      <div className="max-h-screen overflow-y-scroll">
        <div className="flex">
          <CoursecDetailProvider><div className='w-full'>{children}</div></CoursecDetailProvider>
        </div>
      </div>
    </div >
  )
}
