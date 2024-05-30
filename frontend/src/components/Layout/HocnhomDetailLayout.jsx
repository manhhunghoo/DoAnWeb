import React from 'react'

export default function HocnhomDetailLayout({children}) {
return (
  <div className="flex flex-col min-h-screen">
    <div className='h-screen'>
      {children}
    </div>
</div >
  )
}
