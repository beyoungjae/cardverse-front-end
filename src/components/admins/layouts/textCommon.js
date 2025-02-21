import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'

//    width: 'fit-content',
export const Title = styled(Typography)(({ theme }) => ({
   fontSize: '2rem',
   letterSpacing: '1.75px',
   padding: '10px',
}))

/* 
   // const [errors, setErrors] = useState({
   //    title: '',
   //    thumbnail: '썸네일 이미지를 업로드해주세요', // 초기 에러 메시지 설정
   //    category: '',
   //    price: '',
   // })

 // const [formData, setFormData] = useState({
   //    title: '',
   //    thumbnail: null,
   //    thumbnailPreview: null,
   //    category: 'wedding',
   //    content: '',
   //    price: 10000,
   //    data: {},
   //    status: 'draft',
   // })

 // const handleFileChange = useCallback((e) => {
   //    const file = e.target.files[0]
   //    if (file) {
   //       if (file.size > 5000000) {
   //          setErrors((prev) => ({
   //             ...prev,
   //             thumbnail: '파일 크기는 5MB를 초과할 수 없습니다.',
   //          }))
   //          return
   //       }
   //       const reader = new FileReader()
   //       reader.onload = () => {
   //          setFormData((prev) => ({
   //             ...prev,
   //             thumbnail: file,
   //             thumbnailPreview: reader.result,
   //          }))
   //          setErrors((prev) => ({
   //             ...prev,
   //             thumbnail: '',
   //          }))
   //       }
   //       reader.readAsDataURL(file)
   //    }
   // }, [])

   // const handleFileChange = useCallback((e) => {
   //    const file = e.target.files[0]
   //    if (file) {
   //       if (file.size > 5000000) {
   //          // 5MB 제한
   //          setError('파일 크기는 5MB를 초과할 수 없습니다.')
   //          return
   //       }
   //       const reader = new FileReader()
   //       reader.onload = () => {
   //          setFormData((prev) => ({
   //             ...prev,
   //             thumbnail: file,
   //             thumbnailPreview: reader.result,
   //          }))
   //       }
   //       reader.readAsDataURL(file)
   //    }
   // }, [])

   // const handleSubmit = useCallback(
   //    async (e) => {
   //       e.preventDefault()
   //       try {
   //          // API 호출 로직
   //          console.log('제출된 데이터:', formData)
   //       } catch (err) {
   //          setError('템플릿 등록 중 오류가 발생했습니다.')
   //       }
   //    },
   //    [formData]
   // )

*/
