import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import { createBox } from '../utils/muiSystem'

const Container = createBox({
    display: 'flex',
    maxWidth: '1280px',
    minWidth: '800px',
    margin: '0 auto',
    padding: '8px',
    gap: '8px',
    backgroundColor: 'black',
    color: 'white',
    breakpoint: [
        { down: 'md', gap: '8px' },
        { down: 'sm', minWidth: '300px' },
    ],
})

const Sidebar = createBox({
    // flex: '0.3',
    width: '200px',
    height: '400px',
    backgroundColor: 'white',
    breakpoint: [
        { down: 'md', width: 'auto', flex: '0.213' },
        { down: 'sm', display: 'none' },
    ],
})

const Content = createBox({
    flex: '1',
    backgroundColor: 'white',
    height: '300px',
    breakpoint: [
        { down: 'md', width: 'auto', flex: '0.787' },
        { down: 'sm', flex:'1' },
    ],
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
