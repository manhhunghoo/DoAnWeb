import React, {  useState } from 'react'
import { Avatar} from '@mui/material';
import Badge from '@mui/material/Badge'
import { styled } from '@mui/material/styles'

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

function UserAvatar({userInfo}) {
    console.log('userInfo',userInfo)
    //if(!userInfo) return null
    return (
        <>
            <div  className='flex pd-y-2 gap-3 text-wrap md:my-4' >
                {/* <Link className='flex gap-3' to={`Profile/${user._id}`}> */}
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar
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