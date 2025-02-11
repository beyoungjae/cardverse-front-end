import { styled } from '@mui/system'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// ✅ theme 없이 스타일 객체만 받아서 styled(Box) 생성
export const createBox = (styles) => {
    return styled(Box)(({ theme }) => {
        const mergedStyles = typeof styles === 'function' ? styles(theme) : styles
        return mergedStyles
    })
}
