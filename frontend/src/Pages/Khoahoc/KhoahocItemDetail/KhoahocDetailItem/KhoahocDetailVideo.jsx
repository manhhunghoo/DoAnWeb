import React from 'react'

export default function KhoahocDetailVideo({url}) {
  return (
    <div className='w-full h-full flex justify-center'>
      <iframe
      className='top-0 left-0 w-4/5 h-full'
      src={url}
      title="YouTube video player" 
      frameBorder="0" 
      allow="accelerometer; 
      autoplay; 
      clipboard-write; 
      encrypted-media; gyroscope; picture-in-picture; web-share" 
      referrerPolicy="strict-origin-when-cross-origin" 
      allowFullScreen>
      </iframe>
    </div>
  )
}

