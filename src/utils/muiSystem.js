// import { styled } from '@mui/system'
// import { Box } from '@mui/material'
// import { useTheme } from '@mui/material/styles'

// // ✅ theme 없이 스타일 객체만 받아서 styled(Box) 생성
// export const createBox = (styles) => {
//     return styled(Box)(({ theme }) => {
//         const mergedStyles = typeof styles === 'function' ? styles(theme) : styles
//         return mergedStyles
//     })
// }

import { styled } from '@mui/system'
import { Box } from '@mui/material'

// ✅ `breakpoint` 키를 자동 변환하여 적용
export const createBox = (styles) => {
    return styled(Box)(({ theme }) => {
        const { breakpoint, ...baseStyles } = styles // 기본 스타일과 breakpoint 분리

        if (!breakpoint) return baseStyles // breakpoint 없으면 기본 스타일만 반환

        // ✅ breakpoint 배열을 theme.breakpoints로 변환
        const responsiveStyles = breakpoint.reduce((acc, bp) => {
            if (bp.down) {
                acc[theme.breakpoints.down(bp.down)] = { ...bp }
                delete acc[theme.breakpoints.down(bp.down)].down // `down` 키 제거
            }
            return acc
        }, {})

        return { ...baseStyles, ...responsiveStyles }
    })
}
