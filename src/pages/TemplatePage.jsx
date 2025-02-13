import { Container } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useParams, Routes, Route } from 'react-router-dom'

import TemplateList from '../components/templates/TemplateList'
import TemplateDetail from '../components/templates/TemplateDetail'

const StyledContainer = styled(Container)({
   padding: '0px',
})

const TemplatePage = () => {
   const { tab } = useParams()

   return (
      <StyledContainer>
         <Routes>
            <Route index element={<TemplateList tab={tab} />} />
            <Route path=":id" element={<TemplateDetail tab={tab} />} />
         </Routes>
      </StyledContainer>
   )
}

export default TemplatePage
