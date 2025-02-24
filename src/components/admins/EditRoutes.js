import { Routes, Route, Navigate } from 'react-router-dom'

import TemplateForm from './templates/TemplateForm'
import EventForm from './promotions/EventForm'

const EditRoutes = () => {
   return (
      <Routes>
         <Route path="template/:id" element={<TemplateForm mode="edit" />} />
         <Route path="event/:id" element={<EventForm mode="edit" />} />
         {/* <Route path="manage/:id" element={<ManageForm mode="edit" />} /> */}
      </Routes>
   )
}
export default EditRoutes
