import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import { createBox } from '../utils/muiSystem'

const Container = createBox({
    display: 'flex',
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '16px',
    gap: '16px',
    backgroundColor: 'black',
    color: 'white',
    breakpoint: [
        // { down: 'md', margin: '0px auto' }, // 960px 이하에서 height 변경
        // { down: 'sm', height: '250px' }, // 600px 이하에서 height 변경
    ],
})

const Sidebar = createBox({
    width: '300px',
    height: '400px',
    backgroundColor: 'white',
})

const Content = createBox({
    flex: '1',
    backgroundColor: 'white',
    height: '300px',
})

// const Container = styled(Box)(({ theme }) => ({
//     maxWidth: '1280px',
//     margin: '0 auto',
//     padding: '16px',

//     backgroundColor: 'black',
// }))

// const SideNavbar = styled(Box)(({ theme }) => ({}))

const MyPage = () => {
    return (
        <Container>
            <Sidebar />
            {/* <></> */}
            <Content />
        </Container>
        // <Container>
        // <></>
        // </Container>
    )
}

export default MyPage
