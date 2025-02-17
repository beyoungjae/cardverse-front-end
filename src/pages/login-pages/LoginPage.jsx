import React from 'react'
import { Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

const LoginPage = () => {
    return (
        <Container maxWidth="md">
            <Outlet />
        </Container>
    )
}
export default LoginPage
