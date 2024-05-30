import React from 'react'
import { useContext } from 'react'
import { CurrentVideoContext } from '../../Pages/Hoctap/HocTapDetails'

export default function HocTapDetailVideo() {
  const {curVideo} = useContext(CurrentVideoContext)
  console
  return (
    <div>
      <iframe width="560" 
      height="315" 
      src={curVideo}
      title="YouTube video player" 
      frameBorder="0" 
      allow="accelerometer; 
      autoplay; 
      clipboard-write; 
      encrypted-media; gyroscope; picture-in-picture; web-share" 
      referrerPolicy="strict-origin-when-cross-origin" 
      allowF  ullScreen>

      </iframe>
    </div>
  )
}

