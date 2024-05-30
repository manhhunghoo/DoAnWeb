import React from 'react'
import loginImg from '../assets/BackgroundLogin.svg'

export const Signin = () => {
    return (
        <div className='flex bg-[#F0F7FF] flex-col items-center justify-center   px-20 text-center'>
            <main className='flex  flex-col items-center w-full flex-1 px-20 text-center  mt-9'>
                <div className='rounded-2xl shadow-2xl h-[500px] flex max-w-3xl '>
                    <div className='w-3/5 flex'>

                        <div className='w-3/7 bg-[#71ACF2] md:block hidden justify-center items-center rounded-md max-w-3xl relative'>
                            <h2 className='text-3xl absolute ml-6 mt-9 text-white font-bold mb-2'>Chào mừng bạn quay trở lại!</h2>
                            <img className='w-full  ' src={loginImg} alt="#" />
                            <div className='absolute bottom-0 left-0'>

                                <div className='flex gap-3 justify-center  items-center'>
                                    <p className='mb-2 text-gray-500 mt-2 p-2 ml-20'>Bạn đã có tài khoản?</p>
                                    <button> <a href='#' className='bg-white hover:scale-110 duration-300 rounded-lg text-[#0077FF] px-4 py-1 inline-block font-semibold hover:bg-[#0077FF] hover:text-white'>Đăng nhập</a></button>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div>
                        <div className=' py-8'>
                            <img className='px-24 ' src="./src/assets/LogoUIT.svg" alt="logiUIT" />

                            <h2 className='text-3xl mt-2 font-bold text-black mb-2'>Đăng ký</h2>

                        </div>
                        <div>
                            <form className='flex flex-col gap-2'>
                                <div>
                                    <lable className='font-bold'>Họ và tên:</lable>
                                    <input className='p-1 rounded-xl border' type="text" name="hoten" placeholder='Nhập Họ và tên' />
                                </div>
                                <div>
                                    <lable className='font-bold'>Email:</lable>
                                    <input className='p-1 rounded-xl border' type="email" name="email" placeholder='Bao gồm uit.edu.vn' />
                                </div>
                                <div className='relative'>

                                    <lable className='font-bold'>Email:</lable>
                                    <input className='p-1 rounded-xl border' type="email" name="email" placeholder='Email' />


                                    <lable className='font-bold'>Email:</lable>
                                    <input className='p-1 rounded-xl border' type="email" name="email" placeholder='Email' />
                                </div>

                                <div className='relative'>
                                    <lable className='font-bold'>Mật khẩu:</lable>
                                    <input className='p-1 mt-2 rounded-xl border' type="password" name="password" placeholder='Mật khẩu' />
                                </div>



                                <button> <a href='#' className='bg-[#0077FF] hover:scale-110 mt-6 rounded-lg text-white px-4 py-1 inline-block font-semibold hover:bg-[#2e7bd9] hover:text-white'>Đăng ký</a></button>
                            </form>
                        </div>
                    </div>
                </div>

            </main >
        </div >
    )
}
