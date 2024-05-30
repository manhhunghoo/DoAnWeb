import React, { useEffect } from 'react'

import * as notification from '../../service/notification'
import validator from '../../hook/validate'

export default function AddNotiItem({idItem}) {
    useEffect(() => {
        validator({
            form: "#add-noti-form",
            formGroup: ".form-group",
            errorMessage: ".form-message",
            styleInvalid: "border-red-500",
            rules: [
                validator.isRequired('#add-noti-title','vui lòng nhập title'),
                validator.isRequired('#add-noti-description','vui lòng nhập description'),
                validator.isRequired('#add-noti-deadline','vui lòng nhập deadline'),
            ],
            onSubmit: (data) => {
                console.log(data)
                const {title, description, deadline} = data
                notification.createNoti({title, description, deadline, item : idItem})   
                .then(res => {
                    console.log('res create noti', res)
                })
                .catch(err => {
                    console.log('err create noti', err)
                })
            }
        })
        return () => {
        }
    }, [idItem])
    return (
        <form id='add-noti-form' className='absolute w-[10rem] right-[15.2rem]' style={{display:"none"}} >
                <div className="border-b bg-white rounded-lg p-4 border-gray-900/10 pb-12 shadow-lg w-full">
                    <div className='form-group mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                        <div className="sm:col-span-6">
                            <label htmlFor='title' className='block text-ml font-medium leading-6 text-gray-900'>Title: </label>
                            <div className="mt-2">
                                <input type='text' name='title' id='add-noti-title' autoComplete='title' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' placeholder='Tên nhóm' />
                                <div className='form-message text-red-700 flex justify-center'></div>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div className='form-group grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                        <div className="sm:col-span-6 ">
                            <label htmlFor='description' className='block text-ml font-medium leading-6 text-gray-900'>description: </label>
                            <div className="mt-2">
                                <input type='text' name='description' id='add-noti-description' autoComplete='description'
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' placeholder='Nhập mã code' />
                                <div className='form-message text-red-700 flex justify-center'></div>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div className='form-group grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                        <div className="sm:col-span-6 ">
                            <label htmlFor='deadline' className='block text-ml font-medium leading-6 text-gray-900'>deadline: </label>
                            <div className="mt-2">
                                <input type='date' name='deadline' id='add-noti-deadline' autoComplete='deadline'
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' placeholder='Nhập mã code' />
                                <div className='form-message text-red-700 flex justify-center'></div>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div className='flex justify-center items-center '>
                        <button type="submit" className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Tạo Notification</button>
                    </div>
                </div>
        </form>
    )
}
