import React, { useState } from 'react'
import { TextField, Button, Typography, Box } from '@mui/material'
import { styled } from '@mui/system'
import { Link } from 'react-router-dom'

const Container = styled(Box)(({ theme }) => ({
    width: '100%',
    backgroundColor: '#f4f3f1',
    padding: '40px',
}))

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        alert('로그인 성공!')
    }

    return <Container></Container>
}

export default Login
