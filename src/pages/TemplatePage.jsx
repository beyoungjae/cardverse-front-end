import { useParams, Routes, Route } from 'react-router-dom'

import TemplateList from '../components/templates/TemplateList'
import TemplateDetail from '../components/templates/TemplateDetail'

const TemplatePage = () => {
   const { tab } = useParams()

   return (
      <>
         <Routes>
            <Route index element={<TemplateList tab={tab} />} />
            <Route path=":id" element={<TemplateDetail tab={tab} />} />
         </Routes>
      </>
   )
}

export default TemplatePage
