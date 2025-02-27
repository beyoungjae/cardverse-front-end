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
            <Route path="detail/:templateId" element={<TemplateDetail />} />
            <Route path="edit" element={<TemplateEditor />} />
            <Route path="edit/:templateId" element={<TemplateEditor />} />
            <Route path="purchase/:templateId" element={<PurchaseTemplate />} />
            <Route path="preview/:userTemplateId" element={<TemplatePreviewer />} />
         </Routes>
      </>
   )
}

export default TemplatePage
