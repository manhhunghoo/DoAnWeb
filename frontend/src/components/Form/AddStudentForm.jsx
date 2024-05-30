
import { useState, useRef, useEffect } from 'react'
import validator from '../../hook/validate'
import * as studies from "../../service/studies"
import * as courses from "../../service/courses"

const cssButton='border-2 border-blue-400 bg-blue-300  rounded-lg hover:bg-blue-500 m-4 p-2 '

export default function AddStudentForm({ idAdd }) {
    const inputEmailRef = useRef()
    const [studentEmail, setStudentEmail] = useState('')
    const [StudentEmails, setStudentEmails] = useState([])
    const handleChange = (e) => {
        e.preventDefault()
        setStudentEmail(e.target.value)
    }
    const handleAdd = () => {
        setStudentEmails([...StudentEmails, studentEmail])
        setStudentEmail('')
        inputEmailRef.current.focus()
    }
    useEffect(() => {
        validator({
            form: '#add-studen-form',
            formGroup: '.form-group',
            errorMessage: '.form-message',
            styleInvalid: 'border-red-500',
            rules: [
                validator.isEmail1('#student-email', 'Email không hợp lệ')
            ],
            onSubmit: function () {
                console.log('Studentemals',StudentEmails)
                courses.addStudent(idAdd,StudentEmails )
                    .then(res => {
                        console.log('res', res)
                        setStudentEmails([])
                        setStudentEmail('')
                    })
                    .catch(err => {
                        console.log('err', err)
                    })
            }
        })
    }, [StudentEmails])
    return (
        <div className=' min-h-24 w-auto'>
            <div className=" flex justify-center">
                <form id="add-studen-form" className='bg-[#F0F7FF] p-12 rounded-3xl m-4 md:text-xl text-sm '>
                    <div className="form-group">
                        <label htmlFor="student-email">email: </label>
                        <input ref={inputEmailRef} type="email" value={studentEmail} onChange={handleChange} placeholder="@gm.uit.edu.vn" name="studentEmail" id='student-email' className="border-black border-2 w-auto" />
                        <div className="form-message text-red-700 flex justify-center"></div>
                    </div>
                    <br></br>
                    <div>
                        <ul>
                            {StudentEmails.map((email, index) => (
                                <li key={index}>{email}</li>
                            ))}
                        </ul>
                    </div>
                    <br></br>
                    <input type="button" onClick={handleAdd} value="thêm" className={cssButton} />
                    <button onClick={(e) => { e.preventDefault(); setStudentEmails([]) }}
                        className={cssButton}>Xóa tất cả</button>
                    <button type='submit'
                        className={cssButton}>thêm toàn bộ</button>
                </form>
            </div>
        </div>
    )
}
