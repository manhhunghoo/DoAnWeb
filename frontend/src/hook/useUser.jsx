import {useContext}from 'react'
import {UserContext} from '../App'

export default function useUser() {
    const {user, setUser} = useContext(UserContext)
  return ({user, setUser})
}

// Path: src/hook/useUser.jsx
