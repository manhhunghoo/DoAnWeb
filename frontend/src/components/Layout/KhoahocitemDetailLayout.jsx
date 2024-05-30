import React from 'react'
import Navbar from '../Navbar'
import CoursecDetailProvider from '../../state/CoursecDetailProvider'

export default function KhoahocitemDetailLayout({children}) {
  return (
    <div className="flex flex-col bg-[#F0F7FF]">
      <header>
        <Navbar />
      </header>
      <div className="max-h-[calc(100vh-100px)] overflow-y-scroll mt-[100px]">
        <div className="flex">
          <CoursecDetailProvider><div className='w-full'>{children}</div></CoursecDetailProvider>
        </div>
      </div>
    </div >
  )
}
