import { useParams, Routes, Route, Navigate } from 'react-router-dom'

import TemplateList from '../components/templates/TemplateList'
import TemplateDetail from '../components/templates/TemplateDetail'
import TemplateEditor from '../components/templates/TemplateEditor'
import PurchaseTemplate from '../components/templates/purchase/PurchaseTemplate'

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

            {/* preview 라우트를 독립적인 페이지로 이동 */}
            <Route
               path="preview/:userTemplateId"
               element={
                  <Navigate
                     replace
                     to={(location) => {
                        const userTemplateId = location.pathname.split('/').pop()
                        return `/preview/${userTemplateId}`
                     }}
                  />
               }
            />

            {/* 이전 경로 호환성을 위한 리다이렉트 */}
            <Route
               path="templates/preview/:userTemplateId"
               element={
                  <Navigate
                     replace
                     to={(location) => {
                        const userTemplateId = location.pathname.split('/').pop()
                        return `/preview/${userTemplateId}`
                     }}
                  />
               }
            />
         </Routes>
      </>
   )
}

export default TemplatePage
