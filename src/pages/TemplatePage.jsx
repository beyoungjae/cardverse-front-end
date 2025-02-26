import { useParams, Routes, Route } from 'react-router-dom'

import TemplateList from '../components/templates/TemplateList'
import TemplateDetail from '../components/templates/TemplateDetail'
import TemplateEditor from '../components/templates/TemplateEditor'
import PurchaseTemplate from '../components/templates/purchase/PurchaseTemplate'
import TemplatePreviewer from '../components/templates/preview/TemplatePreviewer'

const TemplatePage = () => {
   const { tab } = useParams()

   return (
      <>
         <Routes>
            <Route index element={<TemplateList tab={tab} />} />
            <Route path=":id" element={<TemplateDetail tab={tab} />} />
            <Route path="edit" element={<TemplateEditor />} />
            <Route path="purchase/:id" element={<PurchaseTemplate />} />
            <Route path="preview/:templateId" element={<TemplatePreviewer />} />
         </Routes>
      </>
   )
}

export default TemplatePage
