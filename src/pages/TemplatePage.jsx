import { useParams, Routes, Route } from 'react-router-dom'

import TemplateList from '../components/templates/TemplateList'
import TemplateDetail from '../components/templates/TemplateDetail'
import TemplateEditor from '../components/templates/TemplateEditor'

const TemplatePage = () => {
   const { tab } = useParams()

   return (
      <>
         <Routes>
            <Route index element={<TemplateList tab={tab} />} />
            <Route path=":id" element={<TemplateDetail tab={tab} />} />
            <Route path="edit" element={<TemplateEditor />} />
         </Routes>
      </>
   )
}

export default TemplatePage
