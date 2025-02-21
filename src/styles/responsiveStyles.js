export const bps = (theme, styles) => ({
   [theme.breakpoints.down(1600)]: styles[1600] || {},
   [theme.breakpoints.down(1280)]: styles[1280] || {},
   [theme.breakpoints.down(960)]: styles[960] || {},
   [theme.breakpoints.down(600)]: styles[600] || {},
   [theme.breakpoints.down(480)]: styles[480] || {},
})
