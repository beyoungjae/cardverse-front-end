import React, { useState, useCallback } from 'react'
import { Box, Button, IconButton, Typography, ImageList, ImageListItem, Dialog, DialogContent, DialogActions, Select, MenuItem, FormControl, InputLabel, CircularProgress, Tooltip } from '@mui/material'
import { styled } from '@mui/material/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import CloseIcon from '@mui/icons-material/Close'
import { motion, AnimatePresence } from 'framer-motion'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const SectionTitle = styled(Typography)(({ theme }) => ({
   fontSize: '1.1rem',
   fontWeight: 500,
   marginBottom: theme.spacing(2),
   color: theme.palette.text.primary,
}))

const VisuallyHiddenInput = styled('input')({
   clip: 'rect(0 0 0 0)',
   clipPath: 'inset(50%)',
   height: 1,
   overflow: 'hidden',
   position: 'absolute',
   bottom: 0,
   left: 0,
   whiteSpace: 'nowrap',
   width: 1,
})

const ImageContainer = styled(motion.div)(({ theme }) => ({
   position: 'relative',
   width: '100%',
   height: '100%',
   cursor: 'pointer',
   '&:hover': {
      '& .image-overlay': {
         opacity: 1,
      },
   },
}))

const ImageOverlay = styled(Box)(({ theme }) => ({
   position: 'absolute',
   top: 0,
   left: 0,
   right: 0,
   bottom: 0,
   backgroundColor: 'rgba(0, 0, 0, 0.5)',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   opacity: 0,
   transition: 'opacity 0.3s ease',
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
         '&:hover': {
            transform: 'rotate(var(--rotation)) scale(1.05)',
         },
      },
   }),
}))

const UploadProgress = styled(Box)(({ theme }) => ({
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: theme.spacing(1),
}))

const GallerySection = ({ value = [], onChange }) => {
   const [previewUrls, setPreviewUrls] = useState([])
   const [selectedImage, setSelectedImage] = useState(null)
   const [layout, setLayout] = useState('grid') // grid, masonry, carousel, polaroid
   const [uploading, setUploading] = useState(false)
   const [uploadProgress, setUploadProgress] = useState(0)

   const handleImageUpload = useCallback(
      async (event) => {
         const files = Array.from(event.target.files)
         setUploading(true)
         setUploadProgress(0)

         try {
            // 업로드 진행 상태를 시뮬레이션
            await new Promise((resolve) => {
               let progress = 0
               const interval = setInterval(() => {
                  progress += 10
                  setUploadProgress(progress)
                  if (progress >= 100) {
                     clearInterval(interval)
                     resolve()
                  }
               }, 200)
            })

            const newPreviewUrls = files.map((file) => URL.createObjectURL(file))
            setPreviewUrls((prev) => [...prev, ...newPreviewUrls])
            onChange([...value, ...files])
         } catch (error) {
            console.error('Upload failed:', error)
         } finally {
            setUploading(false)
            setUploadProgress(0)
         }
      },
      [value, onChange]
   )

   const handleImageDelete = useCallback(
      (index) => {
         const newPreviewUrls = previewUrls.filter((_, i) => i !== index)
         const newValue = value.filter((_, i) => i !== index)

         setPreviewUrls(newPreviewUrls)
         onChange(newValue)
      },
      [previewUrls, value, onChange]
   )

   const handleDragEnd = useCallback(
      (result) => {
         if (!result.destination) return

         const items = Array.from(previewUrls)
         const [reorderedItem] = items.splice(result.source.index, 1)
         items.splice(result.destination.index, 0, reorderedItem)

         const newValue = Array.from(value)
         const [reorderedValue] = newValue.splice(result.source.index, 1)
         newValue.splice(result.destination.index, 0, reorderedValue)

         setPreviewUrls(items)
         onChange(newValue)
      },
      [previewUrls, value, onChange]
   )

   const getRandomRotation = useCallback(() => {
      return Math.random() * 6 - 3 + 'deg'
   }, [])

   return (
      <Box sx={{ mb: 4 }}>
         <SectionTitle>갤러리</SectionTitle>

         <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 2 }}>
            <InputLabel>레이아웃</InputLabel>
            <Select value={layout} onChange={(e) => setLayout(e.target.value)} label="레이아웃">
               <MenuItem value="grid">그리드</MenuItem>
               <MenuItem value="masonry">매스너리</MenuItem>
               <MenuItem value="carousel">캐러셀</MenuItem>
               <MenuItem value="polaroid">폴라로이드</MenuItem>
            </Select>
         </FormControl>

         <Button component="label" variant="outlined" startIcon={<AddPhotoAlternateIcon />} sx={{ mb: 2, width: '100%', height: 50 }} disabled={uploading}>
            {uploading ? '업로드 중...' : '이미지 업로드'}
            <VisuallyHiddenInput type="file" multiple accept="image/*" onChange={handleImageUpload} disabled={uploading} />
         </Button>

         {uploading && (
            <Box sx={{ mb: 2, position: 'relative', height: 4, bgcolor: 'grey.100', borderRadius: 1 }}>
               <Box
                  component={motion.div}
                  sx={{
                     height: '100%',
                     bgcolor: 'primary.main',
                     borderRadius: 1,
                     width: `${uploadProgress}%`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
               />
            </Box>
         )}

         <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="gallery" direction={layout === 'carousel' ? 'horizontal' : 'vertical'}>
               {(provided) => (
                  <StyledImageList ref={provided.innerRef} {...provided.droppableProps} layout={layout} cols={layout === 'masonry' ? undefined : 3} gap={16} variant={layout === 'masonry' ? 'masonry' : undefined}>
                     <AnimatePresence>
                        {previewUrls.map((url, index) => (
                           <Draggable key={url} draggableId={url} index={index}>
                              {(provided, snapshot) => (
                                 <ImageListItem
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                       ...provided.draggableProps.style,
                                       ...(layout === 'polaroid' && {
                                          '--rotation': getRandomRotation(),
                                       }),
                                    }}
                                 >
                                    <ImageContainer
                                       initial={{ opacity: 0, scale: 0.8 }}
                                       animate={{ opacity: 1, scale: 1 }}
                                       exit={{ opacity: 0, scale: 0.8 }}
                                       transition={{ duration: 0.3 }}
                                       onClick={() => setSelectedImage(url)}
                                       style={{
                                          transform: snapshot.isDragging ? 'scale(1.05)' : 'scale(1)',
                                       }}
                                    >
                                       <img
                                          src={url}
                                          alt={`갤러리 이미지 ${index + 1}`}
                                          loading="lazy"
                                          style={{
                                             width: '100%',
                                             height: '100%',
                                             objectFit: 'cover',
                                          }}
                                       />
                                       <ImageOverlay className="image-overlay">
                                          <Tooltip title="삭제">
                                             <IconButton
                                                onClick={(e) => {
                                                   e.stopPropagation()
                                                   handleImageDelete(index)
                                                }}
                                                sx={{ color: 'white' }}
                                             >
                                                <DeleteIcon />
                                             </IconButton>
                                          </Tooltip>
                                       </ImageOverlay>
                                    </ImageContainer>
                                 </ImageListItem>
                              )}
                           </Draggable>
                        ))}
                        {provided.placeholder}
                     </AnimatePresence>
                  </StyledImageList>
               )}
            </Droppable>
         </DragDropContext>

         <Dialog
            open={!!selectedImage}
            onClose={() => setSelectedImage(null)}
            maxWidth="md"
            fullWidth
            TransitionComponent={motion.div}
            PaperComponent={motion.div}
            PaperProps={{
               initial: { opacity: 0, y: 20 },
               animate: { opacity: 1, y: 0 },
               exit: { opacity: 0, y: 20 },
               transition: { duration: 0.3 },
            }}
         >
            <DialogContent sx={{ p: 0 }}>{selectedImage && <img src={selectedImage} alt="확대 보기" style={{ width: '100%', height: 'auto', display: 'block' }} />}</DialogContent>
            <DialogActions>
               <IconButton onClick={() => setSelectedImage(null)} sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}>
                  <CloseIcon />
               </IconButton>
            </DialogActions>
         </Dialog>
      </Box>
   )
}

export default GallerySection
