import React, { useState } from 'react'
import { TextField, Button, Typography, Box } from '@mui/material'
import { styled } from '@mui/system'
import { Link } from 'react-router-dom'

export const PageWrap = styled(Box)(({ theme }) => ({
    width: '100%',
    backgroundColor: '#f5f5f5',
    padding: '40px',
}))

export const SubContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    backgroundColor: 'white',
    padding: '32px',
    maxWidth: '1280px',
    margin:'0 auto',
}))



export const Title = styled(Typography)(({ theme }) => ({}))
