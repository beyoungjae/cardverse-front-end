import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import { Typography } from '@mui/material'
import { styled } from '@mui/system'

const StyledLink = styled(Link)(({ theme }) => ({
   color: 'black',
   display: 'flex',
   alignItems: 'center',
   textDecoration: 'none',
   gap: '8px',
   padding: '10px 15px 10px 10px',
   borderRadius: '4px',
   border: '1px solid #e5e5e5',
   '&:hover': {
      backgroundColor: '#eeeeee',
   },
   position: 'absolute',
   top: '10px',
   right: '10px',
}))

const NewPostButton = () => {
   const { id, tabId } = useParams() // id = promotion, template, manage / tabId = 현재 탭

   // 탭 ID에 따라 new 타입 변환
   const tabToNewTypeMap = {
      'tab-event': 'event-new',
      'tab-coupon': 'coupon-new',
      'tab-active': 'template-new',
      'tab-inactive': 'template-new',
      'tab-notice': 'notice-new',
      'tab-qna': 'qna-new',
      'tab-faq': 'faq-new',
      'tab-review': 'review-new',
      'tab-overview': 'overview-new',
   }

   const newType = tabToNewTypeMap[tabId] || 'default-new' // 매칭되지 않으면 기본값 설정

   return (
      <StyledLink to={`/admin/posts/${newType}`}>
         <AddIcon sx={{ fontSize: '1.5rem', color: 'black' }} />
         <Typography>새 등록</Typography>
      </StyledLink>
   )
}

export default NewPostButton
