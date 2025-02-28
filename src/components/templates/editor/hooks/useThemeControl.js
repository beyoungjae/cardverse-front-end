import { useState, useCallback, useEffect, useMemo } from 'react'
import useTemplateStore from '../../../../store/templateStore'

const THEME_STORAGE_KEY = 'template_theme_draft'

const defaultTheme = {
   backgroundColor: '#ffffff',
   fontFamily: 'Malgun Gothic',
   primaryColor: '#000000',
   secondaryColor: '#666666',
   animation: 'fade',
}

// 미리 정의된 테마 프리셋
const themePresets = {
   modern: {
      backgroundColor: '#ffffff',
      fontFamily: 'Noto Sans KR',
      primaryColor: '#2c3e50',
      secondaryColor: '#7f8c8d',
      animation: 'fade',
   },
   classic: {
      backgroundColor: '#ffffff',
      fontFamily: 'Malgun Gothic',
      primaryColor: '#000000',
      secondaryColor: '#666666',
      animation: 'fade',
   },
   minimal: {
      backgroundColor: '#ffffff',
      fontFamily: 'Pretendard',
      primaryColor: '#333333',
      secondaryColor: '#999999',
      animation: 'fade',
   },
}

const useThemeControl = () => {
   const { template, updateStyle } = useTemplateStore()
   const [theme, setTheme] = useState({
      ...defaultTheme,
      animation: 'fade',
      animationTargets: ['title', 'greeting'],
   })
   const [history, setHistory] = useState([template.style || defaultTheme])
   const [historyIndex, setHistoryIndex] = useState(0)

   // 테마 변경 핸들러 최적화
   const handleThemeChange = useCallback(
      (key, value) => {
         setTheme((prev) => ({
            ...prev,
            [key]: value,
         }))
         updateStyle({ [key]: value })

         // 테마 변경 로그 추가
         console.log(`테마 속성 변경: ${key} = ${value}`)
      },
      [updateStyle]
   )

   // 실행 취소
   const undo = useCallback(() => {
      if (historyIndex > 0) {
         setHistoryIndex((prev) => prev - 1)
         const prevTheme = history[historyIndex - 1]
         setTheme(prevTheme)
         updateStyle(prevTheme)
      }
   }, [history, historyIndex, updateStyle])

   // 다시 실행
   const redo = useCallback(() => {
      if (historyIndex < history.length - 1) {
         setHistoryIndex((prev) => prev + 1)
         const nextTheme = history[historyIndex + 1]
         setTheme(nextTheme)
         updateStyle(nextTheme)
      }
   }, [history, historyIndex, updateStyle])

   // 테마 초기화
   const resetTheme = useCallback(() => {
      setTheme(defaultTheme)
      updateStyle(defaultTheme)
      setHistory([defaultTheme])
      setHistoryIndex(0)
      localStorage.removeItem(THEME_STORAGE_KEY)
   }, [updateStyle])

   // 프리셋 테마 적용
   const applyPreset = useCallback(
      (presetName) => {
         const preset = themePresets[presetName]
         if (preset) {
            setTheme(preset)
            updateStyle(preset)
            setHistory((prev) => [...prev, preset])
            setHistoryIndex((prev) => prev + 1)
         }
      },
      [updateStyle]
   )

   // 컴포넌트 마운트 시 저장된 테마 불러오기
   useEffect(() => {
      try {
         const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
         if (savedTheme) {
            const parsedTheme = JSON.parse(savedTheme)
            setTheme(parsedTheme)
            updateStyle(parsedTheme)
            setHistory([parsedTheme])
            setHistoryIndex(0)
         }
      } catch (error) {
         console.error('Failed to load theme:', error)
      }
   }, [])

   // 테마 변경 시 localStorage에 저장
   useEffect(() => {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme))
   }, [theme])

   // 폰트 동적 로드
   const loadFont = async (fontFamily) => {
      try {
         // 폰트 URL 인코딩
         const encodedFont = encodeURIComponent(fontFamily.replace(/\s*,\s*serif$/, ''))
         const fontUrl = `https://fonts.googleapis.com/css2?family=${encodedFont}&display=swap`

         // 폰트 로드 전에 존재 여부 확인
         const existingLink = document.querySelector(`link[href="${fontUrl}"]`)
         if (existingLink) return

         const link = document.createElement('link')
         link.href = fontUrl
         link.rel = 'stylesheet'
         document.head.appendChild(link)

         await document.fonts.load(`1em ${fontFamily}`)
      } catch (error) {
         console.warn(`Font loading warning: ${error.message}`)
      }
   }

   // 테마 변경 시 필요한 폰트 로드
   useEffect(() => {
      if (theme.fontFamily) {
         loadFont(theme.fontFamily)
      }
   }, [theme.fontFamily, loadFont])

   // 메모이제이션된 테마 값 반환
   const memoizedTheme = useMemo(() => theme, [theme])

   return {
      theme: memoizedTheme,
      handleThemeChange,
      resetTheme,
      undo,
      redo,
      applyPreset,
      canUndo: historyIndex > 0,
      canRedo: historyIndex < history.length - 1,
      presets: Object.keys(themePresets),
   }
}

export default useThemeControl
