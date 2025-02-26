import { Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { styled } from '@mui/system'

import TemplateActive from './templates/TemplateActive'
import TemplateInactive from './templates/TemplateInactive'
import TemplateForm from './templates/TemplateForm'
import TabRouter from './TabRouter'

// const Template = () => {
//    return (
//       <TabRouter
//          defaultTab="tab-active"
//          routes={[
//             { path: 'tab-active', element: <TemplateActive /> },
//             { path: 'tab-inactive', element: <TemplateInactive /> },
//             { path: 'new', element: <TemplateForm /> },
//          ]}
//       />
//    )
// }
const TemplateRoutes = () => {
   return (
      <Routes>
         <Route index element={<Navigate to="tab-active" replace />} />
         <Route path="tab-active" element={<TemplateActive />} />
         <Route path="tab-Inactive" element={<TemplateInactive />} />
         <Route path="new" element={<TemplateForm />} />
      </Routes>
   )
}

export default TemplateRoutes
