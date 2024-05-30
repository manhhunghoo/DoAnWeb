import React, { useEffect } from 'react'
import validator from '../../hook/validate'

import * as videos from '../../service/videos' 

export default function CreateVideoForm({item}) {

    useEffect(() => {
        validator({
            form: '#create-video-form',
            formGroup: '.form-group',
            errorMessage: '.form-message',
            styleInvalid: 'border-red-500' ,
            rules: [
                validator.isRequired('#title', 'Vui lòng nhập title'),
                validator.isRequired('#description', 'Vui lòng nhập description'),
                validator.isRequired('#link', 'Vui lòng nhập link video')
            ],
            onSubmit: function (data) {
                ///call api
                console.log('data', data)
                const { title, description, link } = data
                videos.addVideo({ title, description, link , item: item._id})
                    .then(res => {
                        alert('oke r cu')
                        console.log('res post', res)
                    })
                    .catch(err => {
                        alert('loi r cu')
                        console.log('loi', err)
                    })
            }

        })
    },[])    
  return (
    <form id='create-video-form'>
        <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input type='text' id='title' name='title' className='form-control' />
            <div className='form-message'></div>
        </div>
        <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <textarea id='description' name='description' className='form-control'></textarea>
            <div className='form-message'></div>
        </div>
        <div className='form-group'>
            <label htmlFor='link'>Link Video: </label>
            <input type='text' id='link' name='link' className='form-control' />
            <div className='form-message'></div>
        </div>
        <button type='submit' className=' rounded-xl p-2 m-2 bg-custom-gradient hover:bg-blue-400'>Submit</button>
    </form>
  )
}
