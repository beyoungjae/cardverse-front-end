import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { useWatch, Controller } from 'react-hook-form'
import { Box, Button, IconButton, Typography, ImageList, ImageListItem, Dialog, DialogContent, DialogActions, Select, MenuItem, FormControl, InputLabel, CircularProgress, Tooltip, Slider, Paper, Chip, LinearProgress } from '@mui/material'
import { styled } from '@mui/material/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import CloseIcon from '@mui/icons-material/Close'
import CropIcon from '@mui/icons-material/Crop'
import TuneIcon from '@mui/icons-material/Tune'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import RotateLeftIcon from '@mui/icons-material/RotateLeft'
import RotateRightIcon from '@mui/icons-material/RotateRight'
import FlipIcon from '@mui/icons-material/Flip'
import BrightnessIcon from '@mui/icons-material/Brightness6'
import ContrastIcon from '@mui/icons-material/Contrast'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import ViewComfyIcon from '@mui/icons-material/ViewComfy'
import ViewDayIcon from '@mui/icons-material/ViewDay'
import CollectionsIcon from '@mui/icons-material/Collections'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CelebrationIcon from '@mui/icons-material/Celebration'
import CakeIcon from '@mui/icons-material/Cake'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel'
import { SectionContainer, SectionTitle, TitleText, HelpText, IconButtonWrapper, fadeInUp, easeTransition, COLORS } from '../styles/commonStyles'

const ImageUploadArea = styled(Box)(({ theme, isDragging }) => ({
   padding: theme.spacing(4),
   backgroundColor: isDragging ? `${COLORS.accent.main}15` : 'rgba(255, 255, 255, 0.8)',
   border: `2px dashed ${isDragging ? COLORS.accent.main : COLORS.accent.main}30`,
   borderRadius: '12px',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: theme.spacing(2),
   cursor: 'pointer',
   transition: 'all 0.3s ease',
   '&:hover': {
      backgroundColor: 'white',
      borderColor: COLORS.accent.main,
      transform: 'translateY(-2px)',
      boxShadow: `0 4px 12px ${COLORS.accent.main}15`,
   },
}))

const StyledImageList = styled(ImageList)(({ theme, layout }) => ({
   width: '100%',
   margin: 0,
   ...(layout === 'grid' && {
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr)) !important',
   }),
   ...(layout === 'masonry' && {
      columnCount: 3,
      [theme.breakpoints.down('sm')]: {
         columnCount: 2,
      },
   }),
   ...(layout === 'polaroid' && {
      gap: '24px !important',
      '& .MuiImageListItem-root': {
         backgroundColor: '#fff',
         padding: theme.spacing(2),
         boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
         transform: 'rotate(var(--rotation))',
         transition: 'transform 0.3s ease',
         '&:hover': {
            transform: 'rotate(var(--rotation)) scale(1.05)',
         },
      },
   }),
}))

const ImageItem = styled(motion.div)(({ theme }) => ({
   position: 'relative',
   borderRadius: '8px',
   overflow: 'hidden',
   backgroundColor: '#fff',
   boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
   '&:hover .image-actions': {
      opacity: 1,
   },
}))

const ImageActions = styled(Box)(({ theme }) => ({
   position: 'absolute',
   top: 0,
   left: 0,
   right: 0,
   bottom: 0,
   backgroundColor: 'rgba(0, 0, 0, 0.5)',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   gap: theme.spacing(1),
   opacity: 0,
   transition: 'opacity 0.3s ease',
   '& .MuiIconButton-root': {
      color: '#fff',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      '&:hover': {
         backgroundColor: 'rgba(255, 255, 255, 0.3)',
      },
   },
}))

const LayoutToggle = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: theme.spacing(1),
   marginBottom: theme.spacing(2),
}))

const LayoutButton = styled(IconButton)(({ theme, isActive }) => ({
   backgroundColor: isActive ? `${COLORS.accent.main}15` : 'transparent',
   color: isActive ? COLORS.accent.main : COLORS.text.secondary,
   '&:hover': {
      backgroundColor: `${COLORS.accent.main}25`,
   },
}))

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
   masonry: <ViewComfyIcon />,
   polaroid: <ViewCarouselIcon />,
}

const GallerySection = ({ control }) => {
   const [previewUrls, setPreviewUrls] = useState([])
   const [selectedImage, setSelectedImage] = useState(null)
   const [layout, setLayout] = useState('grid')
   const [uploading, setUploading] = useState(false)
   const [uploadProgress, setUploadProgress] = useState(0)
   const [showHelp, setShowHelp] = useState(false)
   const [editingImage, setEditingImage] = useState(null)
   const [editSettings, setEditSettings] = useState({
      rotate: 0,
      flip: false,
      brightness: 100,
      contrast: 100,
   })
   const fileInputRef = useRef(null)
   const [imageProcessingState, setImageProcessingState] = useState({
      isUploading: false,
      isOptimizing: false,
      progress: {},
   })
   const [isDragging, setIsDragging] = useState(false)
   const [selectedType, setSelectedType] = useState('wedding')

   // useWatch를 사용하여 gallery 값 관찰
   const gallery = useWatch({
      control,
      name: 'gallery',
      defaultValue: [],
   })

   // 이미지 URL 생성 및 관리
   useEffect(() => {
      const urls = gallery.map((image) => ({
         url: URL.createObjectURL(image),
         id: `${image.name}-${image.lastModified}`,
      }))

      setPreviewUrls(urls)

      // Cleanup
      return () => {
         urls.forEach(({ url }) => URL.revokeObjectURL(url))
      }
   }, [gallery])

   const handleDragEnter = useCallback((e) => {
      e.preventDefault()
      setIsDragging(true)
   }, [])

   const handleDragLeave = useCallback((e) => {
      e.preventDefault()
      setIsDragging(false)
   }, [])

   const handleDrop = useCallback(
      (e) => {
         e.preventDefault()
         setIsDragging(false)
         const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith('image/'))
         if (files.length > 0) {
            control.setValue('gallery', files, { shouldValidate: true })
         }
      },
      [control]
   )

   const handleFileSelect = useCallback(
      (e) => {
         const files = Array.from(e.target.files).filter((file) => file.type.startsWith('image/'))
         if (files.length > 0) {
            // 업로드 진행 상태 시뮬레이션
            setUploadProgress(0)
            const interval = setInterval(() => {
               setUploadProgress((prev) => {
                  if (prev >= 100) {
                     clearInterval(interval)
                     setTimeout(() => setUploadProgress(0), 1000)
                     return 100
                  }
                  return prev + 10
               })
            }, 100)

            control.setValue('gallery', files, { shouldValidate: true })
         }
      },
      [control]
   )

   const handleImageDelete = useCallback(
      (index) => {
         const newGallery = [...gallery]
         newGallery.splice(index, 1)
         control.setValue('gallery', newGallery)
      },
      [control, gallery]
   )

   const handleDragEnd = useCallback(
      (result) => {
         if (!result.destination) return

         const items = Array.from(gallery)
         const [reorderedItem] = items.splice(result.source.index, 1)
         items.splice(result.destination.index, 0, reorderedItem)

         control.setValue('gallery', items)
      },
      [control, gallery]
   )

   const handleEditImage = useCallback(
      (index) => {
         setEditingImage({
            index,
            url: previewUrls[index].url,
            file: gallery[index],
         })
      },
      [previewUrls, gallery]
   )

   const getRandomRotation = useCallback(() => {
      return Math.random() * 6 - 3 + 'deg'
   }, [])

   // 이미지 편집 설정 변경 핸들러
   const handleEditSettingChange = useCallback((setting, value) => {
      setEditSettings((prev) => ({
         ...prev,
         [setting]: value,
      }))
   }, [])

   // 이미지 최적화 로직 개선
   const optimizeImage = useCallback(async (file, maxWidth = 1200) => {
      const optimizedImage = await new Promise((resolve) => {
         const img = new Image()
         img.onload = () => {
            const canvas = document.createElement('canvas')
            let width = img.width
            let height = img.height

            if (width > maxWidth) {
               height = (height * maxWidth) / width
               width = maxWidth
            }

            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext('2d')
            ctx.imageSmoothingQuality = 'high'
            ctx.drawImage(img, 0, 0, width, height)

            canvas.toBlob(
               (blob) => {
                  const optimizedFile = new File([blob], file.name, {
                     type: 'image/jpeg',
                     lastModified: Date.now(),
                  })
                  resolve(optimizedFile)
               },
               'image/jpeg',
               0.8
            )
         }

         const reader = new FileReader()
         reader.onload = (e) => (img.src = e.target.result)
         reader.readAsDataURL(file)
      })

      return optimizedImage
   }, [])

   // 편집된 이미지 저장
   const handleSaveEdit = useCallback(async () => {
      if (!editingImage) return

      try {
         setUploading(true)
         const canvas = document.createElement('canvas')
         const ctx = canvas.getContext('2d')
         const img = new Image()

         await new Promise((resolve, reject) => {
            img.onload = resolve
            img.onerror = reject
            img.src = editingImage.url
         })

         canvas.width = img.width
         canvas.height = img.height

         // 회전 및 반전 적용
         ctx.translate(canvas.width / 2, canvas.height / 2)
         ctx.rotate((editSettings.rotate * Math.PI) / 180)
         ctx.scale(editSettings.flip ? -1 : 1, 1)
         ctx.translate(-canvas.width / 2, -canvas.height / 2)

         // 이미지 그리기
         ctx.drawImage(img, 0, 0)

         // 밝기 및 대비 적용
         const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
         const data = imageData.data
         const brightness = (editSettings.brightness - 100) / 100
         const contrast = (editSettings.contrast - 100) / 100

         for (let i = 0; i < data.length; i += 4) {
            // 밝기 조정
            data[i] += 255 * brightness
            data[i + 1] += 255 * brightness
            data[i + 2] += 255 * brightness

            // 대비 조정
            data[i] = (data[i] - 128) * (contrast + 1) + 128
            data[i + 1] = (data[i + 1] - 128) * (contrast + 1) + 128
            data[i + 2] = (data[i + 2] - 128) * (contrast + 1) + 128
         }

         ctx.putImageData(imageData, 0, 0)

         const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.8))
         const newFile = new File([blob], editingImage.file.name, {
            type: 'image/jpeg',
            lastModified: Date.now(),
         })

         // 이미지 배열 업데이트
         const newValue = [...gallery]
         newValue[editingImage.index] = newFile
         const newUrl = URL.createObjectURL(newFile)
         const newPreviewUrls = [...previewUrls]
         newPreviewUrls[editingImage.index] = { url: newUrl, id: `${newFile.name}-${newFile.lastModified}` }

         setPreviewUrls(newPreviewUrls)
         control.setValue('gallery', newValue)
         setEditingImage(null)
         setEditSettings({
            rotate: 0,
            flip: false,
            brightness: 100,
            contrast: 100,
         })
      } catch (error) {
         console.error('이미지 편집 중 오류 발생:', error)
      } finally {
         setUploading(false)
      }
   }, [editingImage, editSettings, previewUrls, control, gallery])

   const handleHelpToggle = useCallback(() => {
      setShowHelp((prev) => !prev)
   }, [])

   const handleReset = useCallback(() => {
      control.setValue('gallery', [], { shouldValidate: true })
      setUploadProgress(0)
   }, [control])

   const handleTypeSelect = useCallback((type) => {
      setSelectedType(type)
      setLayout(invitationTypes.find((t) => t.id === type).layouts[0])
   }, [])

   const handleLayoutSelect = useCallback((layout) => {
      setLayout(layout)
   }, [])

   const handleImageUpload = useCallback(
      (event) => {
         const files = Array.from(event.target.files)
         const currentImages = gallery || []

         if (currentImages.length + files.length > invitationTypes.find((t) => t.id === selectedType).maxImages) {
            alert(`최대 ${invitationTypes.find((t) => t.id === selectedType).maxImages}장까지 업로드 가능합니다.`)
            return
         }

         // 업로드 진행 상태 시뮬레이션
         let progress = 0
         const interval = setInterval(() => {
            progress += 10
            setUploadProgress(progress)
            if (progress >= 100) {
               clearInterval(interval)
               setUploadProgress(0)
               control.setValue('gallery', [...currentImages, ...files], { shouldValidate: true })
            }
         }, 100)
      },
      [selectedType, gallery, control]
   )

   const currentType = invitationTypes.find((type) => type.id === selectedType)

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
                     <li>고화질 이미지를 권장하며, 최대 5MB까지 업로드 가능합니다.</li>
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
               <Tooltip key={layout} title={`${layout} 레이아웃`}>
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
               {gallery.length}/{currentType.maxImages}장 업로드됨
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
            name="gallery"
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
                                    src={URL.createObjectURL(image)}
                                    alt={`Gallery ${index + 1}`}
                                    loading="lazy"
                                    style={{
                                       borderRadius: layout === 'polaroid' ? '4px' : '8px',
                                       width: '100%',
                                       height: '100%',
                                       objectFit: 'cover',
                                    }}
                                 />
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
