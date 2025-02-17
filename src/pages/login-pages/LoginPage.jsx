import React from 'react'
import { Box, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Login } from '../../components/auth'
import { styled } from '@mui/system'

const Containers = styled(Box)(({ theme }) => ({
    backgroundColor: 'transparent',
    padding: '40px',
    border: 'none',
    minWidth: '375px',

    //  backgroundImage: "url('/images/home/login-background.png')",
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)), url('/images/home/login-background.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {},
    [theme.breakpoints.down('sm')]: {
        padding: '0px',
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url('/images/home/login-background.png')`,
    },
}))

const LoginPage = () => {
    return (
        <Containers>
            <Login />
        </Containers>
    )
}
export default LoginPage
