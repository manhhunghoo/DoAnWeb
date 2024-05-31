import React, { useEffect, useRef, memo } from 'react'

const ScrollToBottom = ({children}) => {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [children])

  return (
    <div >
        {children}
        <div ref={bottomRef}></div>
    </div>
  )
}

export default memo(ScrollToBottom)
