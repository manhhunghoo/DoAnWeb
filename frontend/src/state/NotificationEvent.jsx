import { createContext, useEffect, useState } from 'react'
import useUser from '../hook/useUser'
import * as event from '../service/event'

export const NotificationEventContext = createContext()

function NotificationEvent({ children }) {
  const { user } = useUser()
  const [notificationEvent, setNotificationEvent] = useState([])
  useEffect(() => {
    if (user&&user?._id) {
      var notificationEventInterval = setInterval(() => {
        if (user.role === "student") {
          event.getStudentEventList(user._id).then(res => {
            setNotificationEvent(res)
          }).catch(err => {
            console.log(err)
          })
        }
        else if (user.role === "admin" || user.role === "teacher") {
          event.getAllEventList().then(res => {
            setNotificationEvent(res)
          }).catch(err => {
            console.log(err)
          })
        }
      }, 5000)
    }
    else (setNotificationEvent([]))
    return () => {
      clearInterval(notificationEventInterval)
    }
  }, [user])
  return (
    <NotificationEventContext.Provider value={{ notificationEvent, setNotificationEvent }}>
      {children}
    </NotificationEventContext.Provider>
  )
}

export default NotificationEvent
