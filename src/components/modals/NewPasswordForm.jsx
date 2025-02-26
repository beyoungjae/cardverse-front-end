import { styled, shouldForwardProp } from '@mui/system'
import { Box, IconButton, TextField, Typography, Alert, Button } from '@mui/material'

import { Visibility, VisibilityOff, Lock, Error } from '@mui/icons-material'

import CloseIcon from '@mui/icons-material/Close'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isEmailValid } from '../../utils/validation'

import useMessage from '../../utils/useMessage'
import { bps } from '../../styles/responsiveStyles'
import { Title, ButtonBox, StyledButton } from '.'

const StyledForm = styled('form')(({ theme }) => ({
   //    all: 'inherit',
   display: 'flex',
   flexDirection: 'column',
   gap: '30px',
}))

function NewPasswordForm({ onGoBack }) {
   return (
      <StyledForm>
         <Title variant="h3">
            <Lock /> 비밀번호 변경
         </Title>
         <ButtonBox>
            <StyledButton onClick={onGoBack}>뒤로가기</StyledButton>
            <StyledButton>버튼2</StyledButton>
         </ButtonBox>
      </StyledForm>
   )
}

export default NewPasswordForm
