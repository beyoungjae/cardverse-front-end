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

const DateTimeSection = ({ dateTime, showCountdown, style, textStyle, formatDDay, type }) => {
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
            <PreviewWeekDay key={`weekday-${day}`} style={{ color: textStyle.color }}>
               <Typography sx={{ fontSize: '0.7rem' }}>{day}</Typography>
            </PreviewWeekDay>
         )
      })

      // 날짜 셀 생성
      let currentDate = startDate
      while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
         const isCurrentMonth = currentDate.month() === date.month()
         const isSelected = currentDate.isSame(date, 'day')
         const isSunday = currentDate.day() === 0
         const isSaturday = currentDate.day() === 6

         cells.push(
            <PreviewDateCell key={currentDate.format('YYYY-MM-DD')} isSelected={isSelected} isCurrentMonth={isCurrentMonth} isSunday={isSunday} isSaturday={isSaturday}>
               <Typography sx={{ fontSize: '0.7rem' }}>{currentDate.date()}</Typography>
            </PreviewDateCell>
         )
         currentDate = currentDate.add(1, 'day')
      }

      return <PreviewCalendarGrid>{cells}</PreviewCalendarGrid>
   }

   return (
      <Section style={style}>
         <Typography sx={{ textAlign: 'center', color: style.color, fontWeight: 'bold', mb: 2 }}>날짜/시간</Typography>
         <CalendarPreview>
            <PreviewCalendarHeader>
               <Typography sx={{ fontSize: '0.9rem', fontWeight: 500, color: style.color, mb: 0.5 }}>{date.format('YYYY.MM')}</Typography>
               <Typography sx={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.6)' }}>{date.format('dddd A hh:mm')}</Typography>
            </PreviewCalendarHeader>

            <CalendarGrid />

            {showCountdown && <Box sx={{ mt: 2, textAlign: 'center', color: textStyle.color, fontWeight: 500, fontSize: '0.6rem' }}>{formatDDay(dateTime, type)}</Box>}
         </CalendarPreview>
      </Section>
   )
}

export default DateTimeSection
