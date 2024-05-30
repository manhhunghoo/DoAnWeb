import React from 'react'
import CreateStudent from '../../../../components/Form/CreateStudent'
import { useEffect, useState } from 'react'
import * as admin from '../../../../service/admin'
import useTime from '../../../../hook/useTime'
export default function ShowStudents() {
  const [students, setStudents] = useState([])
  useEffect(() => {
    // fetch all students
    admin.getAllStudents()
      .then(response => {
        setStudents(response)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])
  return (
    <div className='flex gap-20'>
      <div>
        <h2>ALL Student</h2>
        <ul role="list" className="divide-y divide-gray-500">
          {students.map((student, index) => {
            const time = useTime(student.createdAt)
            return (
              <li key={index} className='flex justify-between gap-x-6 py-5'>
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">Username: {student.username}</p>
                  <p>Email: {student.email}</p>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <time className="text-sm leading-6 text-gray-900"> đã tạo cách đây:{time}</time>
                </div>
                <button className='bg-red-500 text-white' onClick={() => { }}>Delete</button>
              </li>
            )
          })}
        </ul>

      </div>
      <div>
        <h2>Create Students</h2>
        <CreateStudent/>
      </div>

    </div>
  )
}
