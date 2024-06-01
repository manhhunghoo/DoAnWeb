import React, { useLayoutEffect, useState } from 'react'
import * as authentic from '../../service/authentic'
import { Avatar, Dialog, DialogContent, DialogTitle } from '@mui/material';
import Badge from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import ProfileDetail from '../ProfileDetail';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""'
        }
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0
        }
    }
}))

function ListuserAcitve() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [open, setOpen] = useState(false);

    const handleUserClick = (user) => {
        setSelectedUser(user)
        setOpen(true);

    }
    const handleClose = () => {
        setOpen(false);
    };
    const [usersActive, setUsersActive] = useState([]);
    const [max_List, setMax_List] = useState(5)
    const [buttonSeemore, setButtonSeeMore] = useState({ max_List: 5, text: 'Xem thêm' })
    useLayoutEffect(() => {
        authentic.getAlluserOnline().then((data) => {
            console.log(data)
            setUsersActive(data)
        })
            .catch((error) => {
                console.log(error, 'khong lay duoc ds user online')
            })
    }, [])
    return (

        <div>
            <div className="title justify-between">
                <h3 className='text-[#050506]  font-extrabold  font-sans text-xl pl-[4rem] pt-3'>Người dùng đang hoạt động</h3>
            </div>
            <button onClick={() => {
                if (buttonSeemore.max_List === 5) {
                    setMax_List(usersActive.length)
                    setButtonSeeMore({ max_List: usersActive.length, text: 'Ẩn bớt' })
                } else {
                    setMax_List(5)
                    setButtonSeeMore({ max_List: 5, text: 'Xem thêm' })
                }
            }} className='bg-blue-500 text-white rounded-lg p-1 hover:bg-blue-800 '>{buttonSeemore.text}</button>
            <ul >
                {usersActive.map((user, index) => {
                    if (index >= max_List) {
                        return
                    }
                    return (


                        <li key={index} className='flex pd-y-2 gap-3 text-wrap md:my-4' onClick={() => handleUserClick(user)}>
                            {/* <Link className='flex gap-3' to={`Profile/${user._id}`}> */}
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                            >
                                <Avatar
                                    sx={{ width: 48, height: 48 }}
                                    alt={`uit-course-avatar-of-${user.username}`}
                                    src={(user.linkimage) ? user.linkimage : 'https://th.bing.com/th/id/OIP.j_sPXvgD1NS2aHjbgAB5UAHaJN?w=150&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7'} />
                            </StyledBadge>
                            <div className='info avatar'>
                                <p className='font-bold'>{user.username}</p>
                                <p className='font-thin'>{user.email}</p>
                            </div>
                            {/* </Link> */}

                        </li>
                    )
                })}
            </ul>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Profile</DialogTitle>
                <DialogContent>
                    {selectedUser && (
                        <ProfileDetail selectedUser={selectedUser} />
                    )}
                </DialogContent>
            </Dialog>

        </div>

    )
}

export default ListuserAcitve