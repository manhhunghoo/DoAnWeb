import React, { useState } from 'react'
import { Avatar } from '@mui/material';
import Badge from '@mui/material/Badge'
import { styled } from '@mui/material/styles'

const StyledBadge = styled(Badge)(({ theme, active }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: active ? '#44b700' : '#bdbdbd',
        color: active ? '#44b700' : '#bdbdbd',
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


function UserAvatar({ userInfo }) {
    return (
        <>
            <div className='flex pd-y-2 gap-3 text-wrap md:my-4' >
                {/* <Link className='flex gap-3' to={`Profile/${user._id}`}> */}
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    active={userInfo.status}
                >
                    <Avatar
                        sx={{
                            width: 50, height: 50, border: '4px solid #BBE2EC',
                            borderRadius: '100%'
                        }}
                        alt={`uit-course-avatar-of-${userInfo.username}`}
                        src={(userInfo.linkimage) ? userInfo.linkimage : 'https://th.bing.com/th/id/OIP.j_sPXvgD1NS2aHjbgAB5UAHaJN?w=150&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7'} />
                </StyledBadge>
                <div className='info avatar'>
                    <p className='font-bold'>{userInfo.username}</p>
                    <p className='font-thin'>{userInfo.email}</p>
                </div>
                {/* </Link> */}
            </div>
        </>

    )
}

export default UserAvatar