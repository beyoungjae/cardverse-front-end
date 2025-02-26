import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, IconButton, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import PreviewPanel from '../editor/preview/PreviewPanel'
import PreviewLoading from '../editor/preview/PreviewLoading'
import { templateApi } from '../../../api/templateApi'

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
            const data = await templateApi.getTemplate(templateId)

            // 백엔드 데이터 구조를 프론트엔드 구조로 변환
            const templateData = {
               type: data.templateSet.intro.type,
               title: data.templateSet.intro.title,
               greeting: data.templateSet.greeting.content,
               dateTime: data.templateSet.calendar.dateTime,
               showCountdown: data.templateSet.calendar.showCountdown,
               location: {
                  name: data.templateSet.map.name,
                  address: data.templateSet.map.address,
                  detail: data.templateSet.map.detail,
                  guide: data.templateSet.map.guide,
                  showMap: data.templateSet.map.showMap,
                  coordinates: data.templateSet.map.coordinates,
               },
               images: data.templateSet.gallery.images,
               galleryLayout: data.templateSet.gallery.layout,
               accounts: data.templateSet.bankAccount.accounts,
               showAccounts: data.templateSet.bankAccount.showAccounts,
               backgroundColor: data.templateSet.other.backgroundColor,
               primaryColor: data.templateSet.other.primaryColor,
               secondaryColor: data.templateSet.other.secondaryColor,
               fontFamily: data.templateSet.other.fontFamily,
               animation: data.templateSet.other.animation,
            }

            setTemplateData(templateData)
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
