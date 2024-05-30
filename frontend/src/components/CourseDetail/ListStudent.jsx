import  {useState,useEffect} from 'react'
import * as courses from '../../service/courses'
import useUser from '../../hook/useUser'
import MarkDialog from './MarkDialog'
export default function ListStudent({ courseId }) {
    const{user} = useUser()
    const [listStudent, setListStudent] = useState([{}])
    useEffect(() => {
        courses.GetListStudent(courseId)
          .then(res => {
            console.log('res list student', res)
            setListStudent(res)
          })
          .catch(err => {
            console.log('err list student', err)
          })
      },[courseId])
    return (
        <ol>
            {listStudent.map((student, index) => (
                <li key={index}>
                    <div className="flex justify-between">
                        <span>{student.username}</span>
                        <span>{student.email}</span>
                    </div>
                    <hr />
                    <button className="bg-blue-500 text-white" onClick={() => {
                        courses.deleteStudent(student._id, courseId)
                            .then(res => {
                                console.log('res delete student', res)
                            })
                            .catch(err => {
                                console.log('err delete student', err)
                            })
                    }}>Delete</button>
                    <MarkDialog studentId={student._id}/>
                </li>
            ))
            }
        </ol>
    )
}
