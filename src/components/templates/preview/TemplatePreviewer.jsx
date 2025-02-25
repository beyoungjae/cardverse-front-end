import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, IconButton, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import PreviewPanel from '../editor/preview/PreviewPanel'
import PreviewLoading from '../editor/preview/PreviewLoading'

const PreviewContainer = styled(Box)(({ theme }) => ({
   position: 'relative',
   width: '100%',
   height: '100vh',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#f5f5f5',
   padding: theme.spacing(2),
}))

const PreviewWrapper = styled(Box)(({ theme }) => ({
   width: '100%',
   maxWidth: '430px',
   height: '100%',
   backgroundColor: '#ffffff',
   borderRadius: theme.shape.borderRadius,
   boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
   overflow: 'hidden',
   position: 'relative',
}))

const CloseButton = styled(IconButton)(({ theme }) => ({
   position: 'absolute',
   top: theme.spacing(2),
   right: theme.spacing(2),
   backgroundColor: 'rgba(0,0,0,0.1)',
   '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.2)',
   },
}))

const TemplatePreviewer = () => {
   const { templateId } = useParams()
   const navigate = useNavigate()
   const [isLoading, setIsLoading] = useState(true)
   const [templateData, setTemplateData] = useState(null)
   const [error, setError] = useState(null)

   useEffect(() => {
      const fetchTemplateData = async () => {
         try {
            setIsLoading(true)
            // TODO: API 연동 시 실제 엔드포인트로 변경
            const response = await fetch(`/templates/${templateId}`)
            if (!response.ok) throw new Error('템플릿을 불러오는데 실패했습니다.')

            const data = await response.json()
            setTemplateData(data)
         } catch (err) {
            setError(err.message)
         } finally {
            setIsLoading(false)
         }
      }

      fetchTemplateData()
   }, [templateId])

   const handleClose = () => {
      navigate(-1)
   }

   if (error) {
      return (
         <PreviewContainer>
            <Box sx={{ textAlign: 'center', color: 'error.main' }}>{error}</Box>
         </PreviewContainer>
      )
   }

   return (
      <PreviewContainer>
         <PreviewWrapper>
            <CloseButton onClick={handleClose}>
               <CloseIcon />
            </CloseButton>
            {isLoading ? (
               <PreviewLoading />
            ) : (
               <PreviewPanel
                  formData={templateData}
                  theme={templateData?.theme}
                  isPreview={true}
                  previewState={{
                     showInvitation: true,
                     showSections: true,
                     sectionAnimationIndex: -1,
                  }}
               />
            )}
         </PreviewWrapper>
      </PreviewContainer>
   )
}

export default TemplatePreviewer
