import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Button, Typography, Grid, Paper, InputAdornment, Alert, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'

const INITIAL_FORM_DATA = {
    type: 'attendance',
    title: '',
    content: '',
    startDate: new Date(),
    endDate: new Date(),
    isLimited: false,
    bannerUrl: null,
    bannerPreview: null,
    maxParticipants: null,
}

function PostForm() {
    const [formData, setFormData] = useState(INITIAL_FORM_DATA)
    const [errors, setErrors] = useState({})
    const [touchedFields, setTouchedFields] = useState({})

    // 이미지 비율 검증
    const validateImageRatio = useCallback((file) => {
        return new Promise((resolve) => {
            const img = new Image()
            img.onload = () => {
                const ratio = img.width / img.height
                resolve(Math.abs(ratio - 2.5) < 0.1)
            }
            img.src = URL.createObjectURL(file)
        })
    }, [])

    // 파일 변경 핸들러
    const handleFileChange = useCallback(
        async (e) => {
            const file = e.target.files[0]
            if (file) {
                if (file.size > 5000000) {
                    setErrors((prev) => ({
                        ...prev,
                        bannerUrl: '파일 크기는 5MB를 초과할 수 없습니다.',
                    }))
                    return
                }

                const isValidRatio = await validateImageRatio(file)
                if (!isValidRatio) {
                    setErrors((prev) => ({
                        ...prev,
                        bannerUrl: '배너 이미지는 2.5:1 비율이어야 합니다.',
                    }))
                    return
                }

                // 이미지 처리 로직...
            }
        },
        [validateImageRatio],
    )

    // 폼 제출 핸들러
    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault()
            // 폼 검증 및 제출 로직...
        },
        [formData, validateForm],
    )
    Copyreturn(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormContainer>
                <Typography variant="h3" gutterBottom>
                    새 이벤트 등록
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={4}>
                        {/* 이벤트 타입 선택 */}
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>이벤트 타입</InputLabel>
                                <Select name="type" value={formData.type} onChange={handleChange}>
                                    {/* 이벤트 타입 옵션들 */}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* 제목 입력 */}
                        <Grid item xs={12}>
                            <TextField fullWidth label="이벤트 제목" name="title" value={formData.title} onChange={handleChange} error={errors.title} helperText={errors.title} />
                        </Grid>

                        {/* 날짜 선택기 */}
                        <Grid item xs={12} md={6}>
                            <DateTimePicker label="시작일" value={formData.startDate} onChange={(date) => handleDateChange('startDate', date)} renderInput={(params) => <TextField {...params} fullWidth />} />
                        </Grid>

                        {/* 나머지 필드들... */}
                    </Grid>
                </Box>
            </FormContainer>
        </LocalizationProvider>,
    )
}

export default PostForm
