import { Routes, Route, Navigate } from 'react-router-dom'

import TemplateForm from './templates/TemplateForm'
import EventForm from './promotions/EventForm'

const CreateRoutes = () => {
   return (
      <Routes>
         <Route path="template" element={<TemplateForm mode="create" />} />
         <Route path="event" element={<EventForm mode="create" />} />
         {/* <Route path="manage" element={<ManageForm mode="create" />} /> */}
      </Routes>
   )
}
export default CreateRoutes
