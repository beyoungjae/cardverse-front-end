import { styled } from '@mui/system'
import { Link, Routes, Route, Navigate, useParams } from 'react-router-dom'

import AdminNavbar from '../components/admins/layouts/AdminNavbar'
// import Content from '../components/admins/layouts/Content'
import AnalyticsRoutes from '../components/admins/AnalyticsRoutes'
import ManageRoutes from '../components/admins/ManageRoutes'
import PromotionRoutes from '../components/admins/PromotionRoutes'
import TemplateRoutes from '../components/admins/TemplateRoutes'
import CreateRoutes from '../components/admins/CreateRoutes'
import EditRoutes from '../components/admins/EditRoutes'

import { Box } from '@mui/material'

const Container = styled(Box)(({ theme }) => ({
   backgroundColor: '#f0f0f0',
   minWidth: '1630px',
   height: '100%',
   display: 'flex',
   flexDirection: 'column',
   padding: '3px',
   position: 'absolute',
   left: '280px',
   top: '0px',
}))

function AdminPage() {
   const { id } = useParams()

   const renderComponent = () => {
      switch (id) {
         case 'analytics':
            return <AnalyticsRoutes />
         case 'manage':
            return <ManageRoutes />
         case 'promotion':
            return <PromotionRoutes />
         case 'template':
            return <TemplateRoutes />
         case 'new': // 추가
            return <CreateRoutes />
         case 'edit': // 추가
            return <EditRoutes />
         default:
            return <Navigate to="/admin/analytics" replace />
      }
   }

   return (
      <>
         <AdminNavbar />
         <Container>{renderComponent()}</Container>
      </>
   )

   // return (
   //    <>
   //       <AdminNavbar />
   //       <Container>
   //          <Routes>
   //             <Route path="analytics/*" element={<Analytics />} />
   //             <Route path="manage/*" element={<Manage />} />
   //             <Route path="promotion/*" element={<Promotion />} />
   //             <Route path="template/*" element={<Template />} />

   //             <Route index element={<Navigate to="analytics" replace />} />
   //             <Route path="*" element={<Navigate to="analytics" replace />} />
   //          </Routes>
   //       </Container>
   //    </>
   // )
}

export default AdminPage
