import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const CalendarPreview = styled(Box)(({ theme }) => ({
   backgroundColor: 'rgba(255, 255, 255, 0.95)',
   borderRadius: '12px',
   padding: theme.spacing(3),
   boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
}))

export const PreviewCalendarHeader = styled(Box)(({ theme }) => ({
   textAlign: 'center',
   marginBottom: theme.spacing(2),
}))

export const PreviewCalendarGrid = styled(Box)(({ theme }) => ({
   display: 'grid',
   gridTemplateColumns: 'repeat(7, 1fr)',
   gap: '4px',
   textAlign: 'center',
}))

export const PreviewWeekDay = styled(Box)(({ theme }) => ({
   padding: '8px',
   fontSize: '0.8rem',
   color: 'rgba(0, 0, 0, 0.6)',
}))

export const PreviewDateCell = styled('div')(({ theme, $isselected, $iscurrentmonth, $issunday, $issaturday }) => ({
   padding: '8px',
   fontSize: '0.9rem',
   borderRadius: '8px',
   backgroundColor: $isselected ? theme.palette.primary.main : 'transparent',
   color: $isselected ? '#FFFFFF' : !$iscurrentmonth ? 'rgba(0, 0, 0, 0.3)' : $issunday ? '#FF6B6B' : $issaturday ? '#4C6EF5' : 'rgba(0, 0, 0, 0.8)',
   fontWeight: $isselected ? 600 : 400,
}))
