import { Box, Tabs, Tab } from '@mui/material'
import { createText, createBox } from '../../../utils/muiSystem'

const Title = createText((theme) => ({
    variant: 'h3',
    fontSize: 'clamp(1.4rem, 3vw, 1.75rem)',
}))

const Label = createText((theme) => ({
    variant: 'body1',
    fontSize: 'clamp(0.9rem, 1.8vw, 1rem)',
    fontWeight: 'bold',
    minWidth: '80px',
}))

const LabelValue = createText((theme) => ({
    variant: 'body1',
    fontSize: 'clamp(0.9rem, 1.8vw, 1rem)',
}))
const MyReview = () => {
    return (
        <>
        <Title>MY 리뷰</Title>
        </>
    )
}

export default MyReview
