import React from 'react'
import { useParams } from 'react-router-dom'
import TemplatePreviewer from '../components/templates/preview/TemplatePreviewer'
import { Box } from '@mui/material'

/**
 * 템플릿 미리보기 전용 페이지
 * 독립적인 라우팅으로 처리되며, 레이아웃 없이 전체 화면으로 표시됩니다.
 */
const TemplatePreviewPage = () => {
   const { userTemplateId } = useParams()

   return (
      <Box
         sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            overflow: 'auto',
            bgcolor: '#fff',
            zIndex: 9999,
         }}
      >
         <TemplatePreviewer userTemplateId={userTemplateId} standalone={true} />
      </Box>
   )
}

export default TemplatePreviewPage
