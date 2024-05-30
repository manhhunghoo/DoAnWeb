    import * as item from "../../service/item"
    import * as studies from "../../service/studies"
    import validator from "../../hook/validate"
    import { useEffect } from "react"

    export default function CreateItemForm({ user, isCourse, isStudy ,idCourse}) {
        useEffect(() => {
            console.log('mount form create item')
            validator({
                form: '#create-item',
                formGroup: '.form-group',
                errorMessage: '.form-message',
                styleInvalid: 'border-red-500',
                rules: [
                    validator.isRequired('#title', 'Please enter the title'),
                    validator.isRequired('#description', 'Please enter the description'),
                    // validator.isRequired('#avatar', 'Please choose the avatar'),
                ],
                onSubmit: function (data) {
                    console.log(title.description)
                    const req = {
                        courseCode:idCourse,
                        title:data.title,
                        description: data.description,
                    }
                    if (isCourse) {
                        item.createItemOfCourse( req)
                            .then(res => {
                                alert('Create course item successfully' + res)
                            })
                            .catch(err => alert('Create course  item failed: ' + err))
                    }
                    else if (isStudy) {
                        studies.createStudy(user, data)
                            .then(res => alert('Create study successfully' + res))
                            .catch(err => alert('Create study failed: ' + err))
                    }
                }
            })
            return () => {
                console.log('unmount create form item')
            }
        }, [])
        return (
            <form id='create-item' className="h-auto bg-[#ffffee] size-auto md:max-w-[80%] my-6 rounded-2xl mx-auto shadow-2xl">
                <div style={{ display: 'flex' ,flexDirection: 'column', alignItems:"center"}}>
                    <div style={{ width: '80%', paddingRight: '20px' }}>
                        <div className="form-group">
                            <label htmlFor="title">Title: </label>
                            <input type="text" id="title" name="title" required style={{ width: '100%' ,minHeight:'20px' }} />
                            <div className="form-message" style={{ color: "red" }}></div>
                        </div>
                        <br></br>
                        <div className="form-group">
                            <label htmlFor="description">Description: </label>
                            <input type="text" id="description" name="description" required style={{ width: '100%', minHeight: '40px' }}></input>
                            <div className="form-message" style={{ color: "red" }}></div>
                        </div>
                    </div>
                <br></br>
                <input type="submit" value="Create" style={{ border: '2px solid', borderColor: 'black', backgroundColor: '#b5d7fe', borderRadius: '4px', padding: '6px' }} />
                </div>
            </form>
        )
    }
