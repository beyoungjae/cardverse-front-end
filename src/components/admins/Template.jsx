import { Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { styled } from '@mui/system'

import TemplateActive from './templates/TemplateActive'
import TemplateInactive from './templates/TemplateInactive'
import TemplateNew from './templates/TemplateNew'

const Template = () => {
    return (
        <>
            <Routes>
                <Route index element={<Navigate to="tab-acitve" replace />} />
                <Route path="tab-active" element={<TemplateActive />} />
                <Route path="tab-inactive" element={<TemplateInactive />} />
                <Route path="new" element={<TemplateNew />} />
            </Routes>
        </>
    )
}

export default Template
