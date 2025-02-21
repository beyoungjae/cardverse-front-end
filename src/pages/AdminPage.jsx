import { styled } from '@mui/system'
import { Link, Routes, Route, Navigate } from 'react-router-dom'

import AdminNavbar from '../components/admins/layouts/AdminNavbar'
import Content from '../components/admins/layouts/Content'
import Analytics from '../components/admins/Analytics'
import Manage from '../components/admins/Manage'
import Promotion from '../components/admins/Promotion'
import Template from '../components/admins/Template'

function AdminPage() {
   return (
      <>
         <AdminNavbar />
         <Content>
            <Routes>
               <Route path="analytics/*" element={<Analytics />} />
               <Route path="manage/*" element={<Manage />} />
               <Route path="promotion/*" element={<Promotion />} />
               <Route path="template/*" element={<Template />} />

               <Route index element={<Navigate to="analytics" replace />} />
               <Route path="*" element={<Navigate to="analytics" replace />} />
            </Routes>
         </Content>
      </>
   )
}

export default AdminPage
