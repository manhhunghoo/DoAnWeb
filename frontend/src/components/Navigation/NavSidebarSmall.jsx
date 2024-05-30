import { current } from '@reduxjs/toolkit'
import React from 'react'
import { redirect } from 'react-router-dom';
import { NavAction } from './NavAction';
import { Divider } from '@mui/material';

export const NavSidebarSmall = () => {
  // const UserProfile = await currentProfile();

  // if(!profile) {
  //   return redirect("/")
  // }

  // const servers = await db.server.findMany({
  //   where: {
  //     members: {
  //       some: {
  //         profileId: profile._id
  //       }
  //     }
  //   }
  // })

  return (
    <div className='space-y-4 flex flex-col items-center h-full text-primary w-full text-white bg-[#4f6bbc] py-3'
    >
      <NavAction />
      <Divider className='h-[2px] rounded-md w-10 mx-auto bg-zinc-700' />

    </div>
  )
}
