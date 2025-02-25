import React from 'react'
import { Box, Typography } from '@mui/material'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { Section } from '../styles/PreviewStyles'
import { CalendarPreview, PreviewCalendarHeader, PreviewCalendarGrid, PreviewWeekDay, PreviewDateCell } from '../styles/CalendarStyles'

// dayjs 플러그인
dayjs.extend(weekday)
dayjs.extend(weekOfYear)
dayjs.locale('ko')

const DateTimeSection = ({ dateTime, showCountdown, style, textStyle, formatDDay, type, combinedStyle }) => {
   const date = dayjs(dateTime)

   const CalendarGrid = () => {
      const startOfMonth = date.startOf('month')
      const endOfMonth = date.endOf('month')
      const startDate = startOfMonth.startOf('week')
      const endDate = endOfMonth.endOf('week')

      const weekDays = ['일', '월', '화', '수', '목', '금', '토']
      const cells = []

      // 요일 헤더
      weekDays.forEach((day) => {
         cells.push(
            <PreviewWeekDay
               key={`weekday-${day}`}
               sx={{
                  color: combinedStyle?.color || 'inherit',
                  fontFamily: combinedStyle?.fontFamily || 'inherit',
                  fontSize: '0.9rem',
               }}
            >
               <Typography sx={{ fontSize: '0.7rem', fontFamily: combinedStyle?.fontFamily || 'inherit' }}>{day}</Typography>
            </PreviewWeekDay>
         )
      })

      // 날짜 셀 생성
      let currentDate = startDate
      while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
         const iscurrentmonth = currentDate.month() === date.month()
         const isselected = currentDate.isSame(date, 'day')
         const issunday = currentDate.day() === 0
         const issaturday = currentDate.day() === 6

         cells.push(
            <PreviewDateCell key={currentDate.format('YYYY-MM-DD')} $isselected={isselected} $iscurrentmonth={iscurrentmonth} $issunday={issunday} $issaturday={issaturday}>
               <Typography sx={{ fontSize: '0.7rem', fontFamily: combinedStyle?.fontFamily || 'inherit' }}>{currentDate.date()}</Typography>
            </PreviewDateCell>
         )
         currentDate = currentDate.add(1, 'day')
      }

      return <PreviewCalendarGrid>{cells}</PreviewCalendarGrid>
   }

   return (
      <Section style={style}>
         <Typography sx={{ textAlign: 'center', color: combinedStyle?.color || 'inherit', fontFamily: combinedStyle?.fontFamily || 'inherit', fontWeight: 'bold', mb: 2 }}>날짜/시간</Typography>
         <CalendarPreview>
            <PreviewCalendarHeader>
               <Typography sx={{ fontSize: '0.9rem', fontWeight: 500, color: combinedStyle?.color || 'inherit', fontFamily: combinedStyle?.fontFamily || 'inherit', mb: 0.5 }}>{date.format('YYYY.MM')}</Typography>
               <Typography sx={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.6)', fontFamily: combinedStyle?.fontFamily || 'inherit' }}>{date.format('dddd A hh:mm')}</Typography>
            </PreviewCalendarHeader>

            <CalendarGrid />

            {showCountdown && <Box sx={{ mt: 2, textAlign: 'center', color: textStyle.color, fontFamily: combinedStyle?.fontFamily || 'inherit', fontWeight: 500, fontSize: '0.6rem' }}>{formatDDay(dateTime, type)}</Box>}
         </CalendarPreview>
      </Section>
   )
}

export default DateTimeSection
