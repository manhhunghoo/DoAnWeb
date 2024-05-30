import React, {useEffect} from 'react'
import validator from '../../hook/validate';
import {fetchcreateBoard} from '../../apis/index'

export default function CreateBroad({user,setExistBroad}) {

    useEffect(() => {
        validator({
            form: "#form-create-broad",
            formGroup: ".form-group",
            errorMessage: ".form-message",
            styleInvalid: "border-red-500",
            rules: [
                validator.isRequired("#form-create-broad-title"),
                validator.isRequired("#form-create-broad-description"),
                validator.isRequired("#form-create-broad-type"),
            ],
            onSubmit: function (data) {
                fetchcreateBoard(data,user._id)
                .then((res) => {
                    console.log('res tao board', res)
                    setExistBroad(true)
                })
                .catch((err) =>
                alert('loi',err))
            }
        })
    }, [user]);

    return (
        <form id="form-create-broad" >
            <div className="form-group">
                <input
                    type="text"
                    id="form-create-broad-title"
                    name="title"
                    placeholder='title...'
                    className="p-2 mt-2 rounded-xl border"
                ></input>
                <span className="form-message block  text-red-500"></span>
            </div>
            <div className="form-group">
                <input
                    type="text"
                    id="form-create-broad-description"
                    name="description"
                    placeholder='description...'
                    className="p-2 mt-2 rounded-xl border"
                ></input>
                <span className="form-message block  text-red-500"></span>
            </div>
            <div className="form-group">
                <input
                    type="text"
                    id="form-create-broad-type"
                    name="type"
                    placeholder='type...'
                    className="p-2 mt-2 rounded-xl border"
                ></input>
                <span className="form-message block  text-red-500"></span>
            </div>
            <button type='submit'
                className='bg-[#0077FF] hover:scale-110 mt-6 rounded-lg text-white px-4 py-1 inline-block font-semibold hover:bg-[#2e7bd9] hover:text-white'> 
                submit di clm</button>
        </form>
    )
}
