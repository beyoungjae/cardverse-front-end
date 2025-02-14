import React, { useState } from 'react'
import { TextField, Button, Typography, Box } from '@mui/material'
import { styled } from '@mui/system'
import { Link } from 'react-router-dom'
import { SubContainer } from '../../styles/common'

const Title = styled(Typography)(({ theme }) => ({}))

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        alert('로그인 성공!')
    }

    return <SubContainer sx={{ maxWidth: '800px' }}></SubContainer>
}

export default Login
