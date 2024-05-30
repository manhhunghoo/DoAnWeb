

import React, { useContext, useEffect } from 'react'
import validator from '../../hook/validate';
import { markStudent } from '../../service/courses';
import { useParams } from 'react-router-dom';
import { Alert, AlertTitle } from '@mui/material';
function MarkStudent({ studentId }) {
    const { courseId } = useParams()
    const [success, setSuccess] = React.useState(0);
    useEffect(() => {

        validator({
            form: '#form-mark-student',
            formGroup: ".form-group",
            errorMessage: ".form-message",
            rules: [
                validator.isRequired('#form-input-mark-student', 'Please enter mark'),
            ],
            onSubmit: function (data) {
                markStudent(studentId, courseId, data.mark)
                    .then(res => {
                        setSuccess(true)
                    })
                    .catch(err => {
                        console.log('err mark student', err)
                        setSuccess(false)
                    })
            }
        })
    }, [])
    return (
        <form style={{ width: "auto", padding: "16px" }} id="form-mark-student">
            <div className="form-group">
                <input type="number" placeholder="Enter mark" name="mark" id="form-input-mark-student" />
                <div className='form-message' style={{ color: "red" }}></div>
            </div>
            <button type="submit">Submit</button>
            {success && <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                Đã chấm điểm
            </Alert>}
            {success === false && <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Vui lòng thử lại
            </Alert>
            }
        </form>
    )
}

export default MarkStudent
