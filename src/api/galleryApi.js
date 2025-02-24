import commonApi from './commonApi'

export const uploadImages = async (files) => {
   const formData = new FormData()
   files.forEach((file) => {
      formData.append('images', file)
   })

   return await commonApi.post('/images/upload', formData, {
      headers: {
         'Content-Type': 'multipart/form-data',
      },
   })
}

export const deleteImage = async (imageId) => {
   return await commonApi.delete(`/images/${imageId}`)
}
