import React, { useState, useCallback, useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Box, Button, IconButton, Typography, ImageList, ImageListItem, Tooltip, Chip, LinearProgress } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { motion, AnimatePresence } from 'framer-motion'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import CollectionsIcon from '@mui/icons-material/Collections'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CelebrationIcon from '@mui/icons-material/Celebration'
import CakeIcon from '@mui/icons-material/Cake'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel'
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt'
import { SectionContainer, SectionTitle, TitleText, HelpText, IconButtonWrapper, fadeInUp, easeTransition, COLORS } from '../styles/commonStyles'
import { deleteImage } from '../../../../api/galleryApi'
import useImageUpload from '../hooks/useImageUpload'

const invitationTypes = [
   {
      id: 'wedding',
      label: '청첩장',
      icon: <FavoriteIcon />,
      maxImages: 10,
      description: '웨딩 포토, 웨딩 촬영 사진을 추가해보세요',
      layouts: ['grid', 'masonry', 'polaroid'],
      placeholderText: '신랑, 신부의 아름다운 순간을 담아보세요',
   },
   {
      id: 'newYear',
      label: '연하장',
      icon: <CelebrationIcon />,
      maxImages: 6,
      description: '새해 분위기 사진을 추가해보세요',
      layouts: ['grid', 'masonry'],
      placeholderText: '새해를 맞이하는 특별한 순간을 담아보세요',
   },
   {
      id: 'birthday',
      label: '고희연',
      icon: <CakeIcon />,
      maxImages: 8,
      description: '가족 사진, 축하 사진을 추가해보세요',
      layouts: ['grid', 'polaroid'],
      placeholderText: '70년의 소중한 순간들을 담아보세요',
   },
   {
      id: 'invitation',
      label: '초빙장',
      icon: <EmojiEventsIcon />,
      maxImages: 6,
      description: '행사 관련 사진을 추가해보세요',
      layouts: ['grid', 'masonry'],
      placeholderText: '특별한 행사의 모습을 담아보세요',
   },
]

const layoutIcons = {
   grid: <ViewModuleIcon />,
   masonry: <ViewQuiltIcon />,
   polaroid: <ViewCarouselIcon />,
}

const layoutDescriptions = {
   grid: '균일한 정사각형 그리드',
   masonry: '이미지 비율을 유지하는 벽돌형',
   polaroid: '회전하는 슬라이드쇼',
}

const GallerySection = () => {
   const [previewUrls, setPreviewUrls] = useState([])
   const [layout, setLayout] = useState('grid')
   const [uploadProgress, setUploadProgress] = useState(0)
   const [showHelp, setShowHelp] = useState(false)
   const [selectedType, setSelectedType] = useState('wedding')
   const { uploadImage } = useImageUpload()

   const { control, watch, setValue } = useFormContext()
   const images = watch('images') || []

   // 이미지 URL 생성 및 관리
   useEffect(() => {
      const urls = images
         .map((image) => {
            // 이미 URL이 있는 경우 (서버에서 받은 이미지)
            if (image.url) {
               return {
                  url: image.url.startsWith('http') ? image.url : `${process.env.REACT_APP_API_URL}${image.url}`,
                  id: image.id || `image-${Date.now()}`,
               }
            }

            // File 객체인 경우 (새로 업로드한 이미지)
            if (image instanceof File) {
               return {
                  url: URL.createObjectURL(image),
                  id: `${image.name}-${Date.now()}`,
               }
            }

            // 잘못된 데이터인 경우
            console.warn('Invalid image data:', image)
            return null
         })
         .filter(Boolean) // null 값 제거

      setPreviewUrls(urls)

      // Cleanup
      return () => {
         urls.forEach((urlObj) => {
            if (urlObj && urlObj.url && urlObj.url.startsWith('blob:')) {
               URL.revokeObjectURL(urlObj.url)
            }
         })
      }
   }, [images])

   const handleImageDelete = async (index) => {
      try {
         const imageToDelete = images[index]

         // 서버에 저장된 이미지인 경우
         if (imageToDelete.id) {
            await deleteImage(imageToDelete.id)
         }

         // form 상태 업데이트
         setValue(
            'images',
            images.filter((_, i) => i !== index),
            { shouldValidate: true }
         )

         // 프리뷰 URL 정리
         if (previewUrls[index]?.url && !previewUrls[index].url.startsWith('http')) {
            URL.revokeObjectURL(previewUrls[index].url)
         }
         setPreviewUrls((prev) => prev.filter((_, i) => i !== index))
      } catch (error) {
         console.error('이미지 삭제 실패:', error)
      }
   }

   const getRandomRotation = useCallback(() => {
      return Math.random() * 6 - 3 + 'deg'
   }, [])

   const handleHelpToggle = useCallback(() => {
      setShowHelp((prev) => !prev)
   }, [])

   const handleReset = useCallback(() => {
      setValue('images', [], { shouldValidate: true })
      setUploadProgress(0)
   }, [setValue])

   const handleTypeSelect = useCallback((type) => {
      setSelectedType(type)
      setLayout(invitationTypes.find((t) => t.id === type).layouts[0])
   }, [])

   const handleLayoutSelect = useCallback(
      (newLayout) => {
         setLayout(newLayout)
         setValue('galleryLayout', newLayout, { shouldValidate: true })
      },
      [setValue]
   )

   const handleImageUpload = async (event) => {
      const files = Array.from(event.target.files)
      if (!files.length) return

      try {
         const currentType = invitationTypes.find((type) => type.id === selectedType)
         if (files.length + images.length > currentType.maxImages) {
            alert(`이미지는 최대 ${currentType.maxImages}장까지 업로드 가능합니다.`)
            return
         }

         setUploadProgress(0)
         const uploadPromises = files.map((file) => uploadImage(file, 'gallery'))
         const uploadedImages = await Promise.all(uploadPromises)
         setUploadProgress(100)

         const validImages = uploadedImages.filter(Boolean)
         if (validImages.length > 0) {
            setValue('images', [...images, ...validImages], { shouldValidate: true })
         }
      } catch (error) {
         console.error('이미지 업로드 오류:', error)
         setUploadProgress(0)
      }
   }

   const currentType = invitationTypes.find((type) => type.id === selectedType)

   // 컴포넌트 마운트/언마운트 시 이미지 상태 복원
   useEffect(() => {
      const savedImages = watch('images') || []
      const savedLayout = watch('galleryLayout') || 'grid'

      if (savedImages.length > 0) {
         setLayout(savedLayout)
         const urls = savedImages.map((image) => ({
            url: image.url || URL.createObjectURL(image.file),
            id: `${image.name}-${image.lastModified || Date.now()}`,
         }))
         setPreviewUrls(urls)
      }

      return () => {
         // cleanup URLs
         previewUrls.forEach(({ url }) => {
            if (url && !url.startsWith('data:') && !url.startsWith('http')) {
               URL.revokeObjectURL(url)
            }
         })
      }
   }, [watch])

   // 컴포넌트 언마운트 시 URL 정리
   useEffect(() => {
      return () => {
         images.forEach((image) => {
            if (image?.url) {
               URL.revokeObjectURL(image.url)
            }
         })
      }
   }, [])

   return (
      <SectionContainer component={motion.div} variants={fadeInUp} initial="initial" animate="animate" exit="exit" transition={easeTransition}>
         <SectionTitle>
            <TitleText>
               <CollectionsIcon className="icon" />
               <Box className="title">갤러리</Box>
            </TitleText>
            <IconButtonWrapper>
               <HelpOutlineIcon onClick={handleHelpToggle} />
               <RestartAltIcon onClick={handleReset} />
            </IconButtonWrapper>
         </SectionTitle>

         <AnimatePresence>
            {showHelp && (
               <HelpText>
                  <strong>갤러리 설정 도움말</strong>
                  <ul>
                     <li>초대장 유형에 맞는 이미지를 선택해주세요.</li>
                     <li>다양한 레이아웃으로 이미지를 배치할 수 있습니다.</li>
                     <li>이미지는 유형별로 제한된 개수만큼 업로드 가능합니다.</li>
                     <li>고화질 이미지를 권장하며, 최대 20MB까지 업로드 가능합니다.</li>
                  </ul>
               </HelpText>
            )}
         </AnimatePresence>

         <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3, mt: 2 }}>
            {invitationTypes.map((type) => (
               <Tooltip key={type.id} title={type.description}>
                  <Chip
                     icon={type.icon}
                     label={type.label}
                     onClick={() => handleTypeSelect(type.id)}
                     sx={{
                        backgroundColor: selectedType === type.id ? `${COLORS.accent.main}15` : 'rgba(255, 255, 255, 0.8)',
                        color: selectedType === type.id ? COLORS.accent.main : COLORS.text.primary,
                        border: `1px solid ${selectedType === type.id ? COLORS.accent.main : COLORS.accent.main}15`,
                        '&:hover': {
                           backgroundColor: selectedType === type.id ? `${COLORS.accent.main}25` : 'white',
                           transform: 'translateY(-2px)',
                           boxShadow: `0 4px 12px ${COLORS.accent.main}15`,
                        },
                        transition: 'all 0.3s ease',
                     }}
                  />
               </Tooltip>
            ))}
         </Box>

         <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
            {currentType.layouts.map((layout) => (
               <Tooltip key={layout} title={layoutDescriptions[layout]}>
                  <Chip
                     icon={layoutIcons[layout]}
                     label={layout.charAt(0).toUpperCase() + layout.slice(1)}
                     onClick={() => handleLayoutSelect(layout)}
                     sx={{
                        backgroundColor: layout === layout ? `${COLORS.accent.main}15` : 'rgba(255, 255, 255, 0.8)',
                        color: layout === layout ? COLORS.accent.main : COLORS.text.primary,
                        border: `1px solid ${layout === layout ? COLORS.accent.main : COLORS.accent.main}15`,
                        '&:hover': {
                           backgroundColor: layout === layout ? `${COLORS.accent.main}25` : 'white',
                        },
                     }}
                  />
               </Tooltip>
            ))}
         </Box>

         <Box
            sx={{
               position: 'relative',
               p: 3,
               border: `2px dashed ${COLORS.accent.main}30`,
               borderRadius: '12px',
               backgroundColor: 'rgba(255, 255, 255, 0.5)',
               textAlign: 'center',
               transition: 'all 0.3s ease',
               '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderColor: COLORS.accent.main,
               },
            }}
         >
            <input type="file" accept="image/*" multiple onChange={handleImageUpload} style={{ display: 'none' }} id="gallery-upload" />
            <label htmlFor="gallery-upload">
               <Button
                  component="span"
                  startIcon={<AddPhotoAlternateIcon />}
                  sx={{
                     color: COLORS.accent.main,
                     '&:hover': {
                        backgroundColor: `${COLORS.accent.main}15`,
                     },
                  }}
               >
                  이미지 추가하기
               </Button>
            </label>
            <Typography variant="body2" sx={{ mt: 1, color: COLORS.text.secondary }}>
               {currentType.placeholderText}
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: COLORS.text.hint }}>
               {images.length}/{currentType.maxImages}장 업로드됨
            </Typography>
            {uploadProgress > 0 && (
               <LinearProgress
                  variant="determinate"
                  value={uploadProgress}
                  sx={{
                     mt: 2,
                     height: 6,
                     borderRadius: 3,
                     backgroundColor: `${COLORS.accent.main}15`,
                     '& .MuiLinearProgress-bar': {
                        backgroundColor: COLORS.accent.main,
                     },
                  }}
               />
            )}
         </Box>

         <Controller
            name="images"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
               <AnimatePresence>
                  {field.value?.length > 0 && (
                     <Box
                        component={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        sx={{
                           mt: 3,
                           p: 3,
                           backgroundColor: 'rgba(255, 255, 255, 0.9)',
                           borderRadius: '12px',
                           border: `1px dashed ${COLORS.accent.main}`,
                           overflow: 'hidden',
                        }}
                     >
                        <ImageList
                           sx={{
                              width: '100%',
                              m: 0,
                              ...(layout === 'polaroid' && {
                                 gap: '24px !important',
                              }),
                           }}
                           cols={layout === 'masonry' ? 2 : 3}
                           rowHeight={layout === 'masonry' ? 'auto' : 164}
                           variant={layout === 'masonry' ? 'masonry' : 'quilted'}
                        >
                           {field.value.map((image, index) => (
                              <ImageListItem
                                 key={index}
                                 component={motion.div}
                                 initial={{ opacity: 0, scale: 0.8 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 transition={{ delay: index * 0.1 }}
                                 sx={{
                                    ...(layout === 'polaroid' && {
                                       backgroundColor: '#fff',
                                       padding: 2,
                                       boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                       transform: `rotate(${getRandomRotation()})`,
                                       '&:hover': {
                                          transform: 'rotate(0deg) scale(1.05)',
                                       },
                                    }),
                                 }}
                              >
                                 <img
                                    src={image.url}
                                    alt={`Gallery ${index + 1}`}
                                    loading="lazy"
                                    style={{
                                       borderRadius: layout === 'polaroid' ? '4px' : '8px',
                                       width: '100%',
                                       height: '100%',
                                       objectFit: 'cover',
                                    }}
                                 />
                                 <Box
                                    sx={{
                                       position: 'absolute',
                                       top: 0,
                                       right: 0,
                                       p: 1,
                                    }}
                                 >
                                    <IconButton
                                       onClick={() => handleImageDelete(index)}
                                       sx={{
                                          color: 'white',
                                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                          '&:hover': {
                                             backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                          },
                                       }}
                                    >
                                       <DeleteIcon />
                                    </IconButton>
                                 </Box>
                              </ImageListItem>
                           ))}
                        </ImageList>
                     </Box>
                  )}
               </AnimatePresence>
            )}
         />
      </SectionContainer>
   )
}

export default GallerySection
