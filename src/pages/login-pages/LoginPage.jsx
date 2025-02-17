import React from 'react'
import { Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Login } from '../../components/auth'

const LoginPage = () => {
    return (
        <Container maxWidth="md">
            <Login />
        </Container>
    )
}
export default LoginPage
