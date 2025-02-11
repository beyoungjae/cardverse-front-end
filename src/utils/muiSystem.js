import { styled } from '@mui/system'
import { Box, Typography } from '@mui/material'
// import { useTheme } from '@mui/material/styles'


export const createBox = (styles) => {
     return styled(Box)(({ theme }) => {
         const resolvedStyles = typeof styles === 'function' ? styles(theme) : styles
         const { variant, breakpoint, ...baseStyles } = resolvedStyles

         // ✅ variant가 설정되었으면 자동으로 theme.typography[variant] 스타일 적용
         const variantStyles = variant ? theme.typography[variant] || {} : {}

         // ✅ breakpoint가 없으면 기본 스타일 + variant 스타일만 반환
         if (!breakpoint) return { ...variantStyles, ...baseStyles }

         const responsiveStyles = breakpoint.reduce((acc, bp) => {
             if (bp.down) {
                 acc[theme.breakpoints.down(bp.down)] = { ...bp }
                 delete acc[theme.breakpoints.down(bp.down)].down
             }
             if (bp.up) {
                 acc[theme.breakpoints.up(bp.up)] = { ...bp }
                 delete acc[theme.breakpoints.up(bp.up)].up
             }
             return acc
         }, {})

         return { ...variantStyles, ...baseStyles, ...responsiveStyles }
     })
}

/* export const createText = (styles) => {
    return styled(Typography)(({ theme }) => {
        const resolvedStyles = typeof styles === 'function' ? styles(theme) : styles
        const { breakpoint, ...baseStyles } = resolvedStyles
        if (!breakpoint) return baseStyles

        const responsiveStyles = breakpoint.reduce((acc, bp) => {
            if (bp.down) {
                acc[theme.breakpoints.down(bp.down)] = { ...bp }
                delete acc[theme.breakpoints.down(bp.down)].down
            }
            if (bp.up) {
                acc[theme.breakpoints.up(bp.up)] = { ...bp }
                delete acc[theme.breakpoints.up(bp.up)].up
            }
            return acc
        }, {})

        return { ...baseStyles, ...responsiveStyles }
    })
} */

    export const createText = (styles) => {
        return styled(Typography)(({ theme }) => {
            const resolvedStyles = typeof styles === 'function' ? styles(theme) : styles
            const { variant, breakpoint, ...baseStyles } = resolvedStyles

            // ✅ variant가 설정되었으면 자동으로 theme.typography[variant] 스타일 적용
            const variantStyles = variant ? theme.typography[variant] || {} : {}

            // ✅ breakpoint가 없으면 기본 스타일 + variant 스타일만 반환
            if (!breakpoint) return { ...variantStyles, ...baseStyles }

            const responsiveStyles = breakpoint.reduce((acc, bp) => {
                if (bp.down) {
                    acc[theme.breakpoints.down(bp.down)] = { ...bp }
                    delete acc[theme.breakpoints.down(bp.down)].down
                }
                if (bp.up) {
                    acc[theme.breakpoints.up(bp.up)] = { ...bp }
                    delete acc[theme.breakpoints.up(bp.up)].up
                }
                return acc
            }, {})

            return { ...variantStyles, ...baseStyles, ...responsiveStyles }
        })
    }