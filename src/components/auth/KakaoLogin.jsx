// 일단 구현해놓음

import React, { useState } from 'react'
import { TextField, Button, Typography, Divider, IconButton } from '@mui/material'
import { Container } from '@mui/system'
import { CheckCircle, RadioButtonUnchecked } from '@mui/icons-material'

import KakaoReact from 'react-kakao-login'

const KakaoLogin = () => {
    //   const kakaoAppKey = 'YOUR_KAKAO_APP_KEY' // 카카오 앱 키

    const handleKakaoSuccess = (response) => {
        console.log('카카오 로그인 성공:', response)
    }

    const handleKakaoFailure = (error) => {
        console.error('카카오 로그인 실패:', error)
    }

    return (
        <Container>
            <KakaoReact
                // 카카오 로그인 라이브러리 지원기능
                // token={kakaoAppKey}
                onSuccess={handleKakaoSuccess}
                onFail={handleKakaoFailure}
            />
        </Container>
    )
}

export default KakaoLogin
