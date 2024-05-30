import React from 'react'
import ItemsContainer from './ItemsContainer'

const Footer = () => {
  const Year = new Date().getFullYear()
  return (
    <footer className="bg-gradient-to-r from-[#0077FF] to-[#B5D5FB]  rounded-t-lg pt-8 opacity-50 text-white box-border">
      <ItemsContainer />
      <div className=" text-center pt-2 text-[#656567] text-sm pb-7">
        <time>Copyright © UITeCo {Year} . All rights reserved.</time>
      </div>
    </footer>
  )
}

export default Footer
