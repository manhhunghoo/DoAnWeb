import { useEffect, useRef, useState } from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

import useUser from '../../hook/useUser';
import * as groups from '../../service/groups'
import validator from '../../hook/validate';
import { Chip } from '@mui/material';

export const CreateGroup = ({setReRender}) => {
  const memberInputRef = useRef()
  const [memberInput, setMemeberInput] = useState('')
  const [memberList, setMemeberList] = useState([])
  const { user } = useUser()
  useEffect(() => {
    validator({
      form: '#add-group-form',
      formGroup: '.form-group',
      errorMessage: '.form-message',
      styleInvalid: 'border-red-500',
      rules: [
        validator.isRequired('#add-group-name', 'Nhập tên nhóm'),
        validator.isRequired('#add-group-code', 'Nhập mã code'),
        validator.isRequired('#add-group-desrciption', 'Nhập mô tả'),
        validator.isRequired('#add-group-image', 'Nhập ảnh'),
      ],
      onSubmit: function (data) {
        console.log('member: ', memberList)
        groups.addGroup(memberList, data, user)
          .then((res) => {
            setReRender(pre=>!pre)
          })
          .catch((error) => {
            console.log('tạo nhóm err', error)
          })
      }
    })
  }, [memberList])
  const addMemeber = (e) => {
    e.preventDefault()
    setMemeberList([...memberList, memberInput])
    setMemeberInput('')
    memberInputRef.current.focus()
  }
  const removeMember = (e, index) => {
    e.preventDefault()
    const newMemberList = [...memberList]
    newMemberList.splice(index, 1)
    setMemeberList(newMemberList)
  }

  return (
    <form id='add-group-form'  >
      <div className="space-y-12" role="dialog">
        <div className="border-b bg-white rounded-lg p-4 border-gray-900/10 pb-12 shadow-lg">
          <div className='form-group mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className="sm:col-span-3">
              <label htmlFor='name' className='block text-ml font-medium leading-6 text-gray-900'>Tên nhóm: </label>
              <div className="mt-2">
                <input type='text' name='name' id='add-group-name' autoComplete='name' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' placeholder='Tên nhóm' />
                <div className='form-message text-red-700 flex justify-center'></div>
              </div>
            </div>
          </div>
          <br></br>

          <div className='form-group grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className="sm:col-span-3 ">
              <label htmlFor='code' className='block text-ml font-medium leading-6 text-gray-900'>Mã code: </label>
              <div className="mt-2">
                <input type='text' name='code' id='add-group-code' autoComplete='code' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' placeholder='Nhập mã code' />
                <div className='form-message text-red-700 flex justify-center'></div>
              </div>
            </div>
          </div>

          <br></br>
          <div className='form-group col-span-4'>
            <label htmlFor='description' className='block text-ml font-medium leading-6 text-gray-900'>Mô tả: </label>
            <div className="mt-2">
              <input type="text" placeholder='Thêm mô tả' id='add-group-desrciption' name='description' rows="2" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
            </div>
            <div className='form-message text-red-700 flex justify-center'></div>
          </div>

          <br></br>
          <div>
          <div className='form-group col-span-4'>
            <label htmlFor='description' className='block text-ml font-medium leading-6 text-gray-900'>Ảnh: </label>
            <div className="mt-2">
              <input type="text" placeholder='url link image' id='add-group-image' name='linkImage' rows="2" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
            </div>
            <div className='form-message text-red-700 flex justify-center'></div>
          </div>
          </div>
          <div className='form-group grid grid-cols-1 gap-x-6 gap-y-8 mt-4 sm:grid-cols-6'>
            <div className="sm:col-span-3">
              <div >
                <label htmlFor='add-member' className='block text-ml font-medium leading-6 text-gray-900'>Thêm thành viên: </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset  ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input name='add-member' id='add-group-member' ref={memberInputRef} value={memberInput} onChange={(e) => setMemeberInput(e.target.value)} type='text' placeholder='Nhập mail sinh viên' className='block flex-1 rounded-md border-0 bg-transparent py-1.5 pl-1 text-gray-900  placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6' />
                    <span className='items-center justify-center p-2'><button onClick={addMemeber} ><PersonAddIcon /></button></span>
                  </div>
                  <div className='form-message text-red-700 flex justify-center'></div>
                </div>
              </div>

            </div>
            <ul>
              {memberList.map((member, index) => (
                <li key={index} id={`memberList-${index}`}>
                  <Chip

                    label={member}
                    deleteIcon={<PersonRemoveIcon />}
                    onDelete={(e) => removeMember(e, index)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <br></br>
          <div className='flex justify-center items-center '>
            <button type="submit" className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Tạo nhóm</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export const JoinGroup = () => {
  const { user } = useUser()
  useEffect(() => {
    validator({
      form: '#join-group-form',
      formGroup: '.form-group',
      errorMessage: '.form-message',
      styleInvalid: 'border-red-500',
      rules: [
        validator.isRequired('#add-group-name', 'Nhập mã code'),
      ],
      onSubmit: function (data) {
        console.log('join group data', data)
        groups.joinGroup(data, user._id)
          .then((res) => {
            console.log('join group response', res)
          })
          .catch((error) => {
            console.log('join group err', error)
          })
      }
    })
  }, [user])

  return (
    <form id='join-group-form' className='border-b bg-white rounded-lg p-4 border-gray-900/10  pb-12 shadow-lg'>
      <div className='form-group'>
        <label htmlFor='code'>Mã code: </label>
        <input type='text' placeholder='Nhập mã code' name='code' id='add-group-name' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
        <div className='form-message text-red-700 flex justify-center'>
        </div>
      </div>
      <button type="submit" className="rounded-md bg-blue-500 px-3 py-2 mt-5 text-sm font-semibold text-white  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Tham gia nhóm</button>
    </form>
  )
}