import React from 'react'
import Signup from '../components/auth/Signup'
import { Box } from '@mui/material'
import { styled } from '@mui/system'

const Container = styled(Box)(({ theme }) => ({
    minWidth: '375px',
}))

const SignupPage = () => {
    return (
        <Container>
            <Signup />
        </Container>
    )
}
export default SignupPage
