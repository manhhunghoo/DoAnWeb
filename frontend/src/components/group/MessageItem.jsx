import React from 'react'
import useUser from '../../hook/useUser'
import useTime from '../../hook/useTime'

function MessageItem({ message, isSameSender }) {
    const { user } = useUser()
    const [seeTime, setSeeTime] = React.useState(false)

    const handleToggleTime = () => {
        setSeeTime(!seeTime)
    }

    if (user._id === message.userid) {
        return (
            <div className='flex gap-3 justify-end m-2'>
                <div className='flex gap-3'>
                    <div>
                        <p
                            onClick={handleToggleTime}
                            className='font-thin p-2 bg-white inline-block box-content border-[2px] border-blue-300 rounded-xl max-w-[300px] break-words'>
                            {message.message}
                        </p>
                        {seeTime && (
                            <time className='block text-[0.7rem] font-thin'>
                                {useTime(message.createdAt)}
                            </time>
                        )}
                    </div>
                    {isSameSender ? (
                        <img className='w-10 h-10 rounded-full' src={message.linkimage} alt='avatar' />
                    ) : (
                        <div className='w-10 h-10 rounded-full'></div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className='flex gap-3 m-2'>
            <div className='flex gap-3'>
                {isSameSender ? (
                    <img className='w-10 h-10  rounded-full' src={message.linkimage} alt='avatar' />
                ) : (
                    <div className='w-10 h-10 rounded-full'></div>
                )}
                <div className='w-auto'>
                    {isSameSender && <h4 className='font-bold'>{message.username}</h4>}
                    <p
                        onClick={handleToggleTime}
                        className='font-thin p-2 bg-gradient-to-r max-w-[300px] border-[2px] border-gray-500 from-[#7de2fc] to-[#7de2fc] inline-block box-content rounded-xl break-words'>
                        {message.message}
                    </p>
                    {seeTime && (
                        <time className='block text-[0.7rem] font-thin'>
                            {useTime(message.createdAt)}
                        </time>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MessageItem
