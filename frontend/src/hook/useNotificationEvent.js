import { useContext } from "react"
import { NotificationEventContext } from "../state/NotificationEvent"
function useNotificationEvent() {
  return useContext(NotificationEventContext)
}

export default useNotificationEvent
