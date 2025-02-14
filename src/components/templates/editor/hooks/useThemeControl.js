import { useState, useCallback, useEffect } from 'react'
import { debounce } from 'lodash'
import useTemplateStore from '../../../../store/templateStore'

const THEME_STORAGE_KEY = 'template_theme_draft'

const defaultTheme = {
   backgroundColor: '#ffffff',
   fontFamily: 'Malgun Gothic',
   primaryColor: '#000000',
   secondaryColor: '#666666',
   animation: null,
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
      backgroundColor: '#f9f5f0',
      fontFamily: 'Nanum Myeongjo',
      primaryColor: '#8b4513',
      secondaryColor: '#a0522d',
      animation: 'slide',
   },
   minimal: {
      backgroundColor: '#ffffff',
      fontFamily: 'Pretendard',
      primaryColor: '#333333',
      secondaryColor: '#999999',
      animation: 'scale',
   },
}

const useThemeControl = () => {
   const { template, updateStyle } = useTemplateStore()
   const [theme, setTheme] = useState(template.style || defaultTheme)
   const [history, setHistory] = useState([template.style || defaultTheme])
   const [historyIndex, setHistoryIndex] = useState(0)

   // 테마 변경 처리 (디바운스 적용)
   const handleThemeChange = useCallback(
      debounce((type, value) => {
         setTheme((prev) => {
            const newTheme = { ...prev, [type]: value }
            // 히스토리에 새로운 상태 추가
            setHistory((prevHistory) => {
               const newHistory = prevHistory.slice(0, historyIndex + 1)
               return [...newHistory, newTheme]
            })
            setHistoryIndex((prev) => prev + 1)
            // 스토어 업데이트
            updateStyle(newTheme)
            // 로컬 스토리지에 저장
            try {
               localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(newTheme))
            } catch (error) {
               console.error('Failed to save theme:', error)
            }
            return newTheme
         })
      }, 300),
      [historyIndex, updateStyle]
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
   }, [updateStyle])

   // 폰트 로드 상태 관리
   const [loadedFonts, setLoadedFonts] = useState(new Set())

   // 폰트 동적 로드
   const loadFont = useCallback(
      async (fontFamily) => {
         if (loadedFonts.has(fontFamily)) return

         try {
            const font = new FontFace(fontFamily, `url(https://fonts.googleapis.com/css2?family=${fontFamily.replace(/\s+/g, '+')})`)
            await font.load()
            document.fonts.add(font)
            setLoadedFonts((prev) => new Set([...prev, fontFamily]))
         } catch (error) {
            console.error('Failed to load font:', error)
         }
      },
      [loadedFonts]
   )

   // 테마 변경 시 필요한 폰트 로드
   useEffect(() => {
      if (theme.fontFamily) {
         loadFont(theme.fontFamily)
      }
   }, [theme.fontFamily, loadFont])

   return {
      theme,
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
