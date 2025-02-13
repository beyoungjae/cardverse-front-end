import { styled } from '@mui/system'
import { Box, Typography } from '@mui/material'
// import { useTheme } from '@mui/material/styles'

/* export const createBox = (styles) => {
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
} */
export const createBox = (styles) => {
    return styled(Box, { shouldForwardProp: (prop) => prop[0] !== '$' })(({ theme = {}, ...props }) => {
        // ✅ theme 기본값을 빈 객체 `{}`로 설정
        const resolvedStyles = typeof styles === 'function' ? styles(theme, props) : styles
        const { variant, breakpoint, ...baseStyles } = resolvedStyles

        // ✅ Typography variant 적용 (기본값)
        const variantStyles = variant ? theme?.typography?.[variant] || {} : {}

        // ✅ 반응형 처리 간소화
        let responsiveStyles = {}
        if (breakpoint) {
            responsiveStyles = Object.fromEntries(breakpoint.map((bp) => [theme?.breakpoints?.[`${bp.down ? 'down' : 'up'}`]?.(bp.down || bp.up) || '', { ...bp, down: undefined, up: undefined }]))
        }

        return { ...variantStyles, ...baseStyles, ...responsiveStyles }
    })
}
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
