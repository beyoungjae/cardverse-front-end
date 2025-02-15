import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { produce } from 'immer'

const useTemplateStore = create(
   devtools(
   persist(
      (set, get) => ({
         // API 상태
         isLoading: false,
         error: null,
         
         // 템플릿 기본 상태
         template: {
            title: '',
            description: '',
            greeting: '',
            date: '',
            location: '',
            gallery: [],
            traffic: '',
            contact: '',
            account: '',
            attendance: '',
            closing: '',
            style: {
               backgroundColor: '#F2E5E1',
               backgroundGradient: 'linear-gradient(135deg, #F2E5E1 0%, #EEE8E0 100%)',
               fontFamily: 'Noto Serif KR',
               bodyFontFamily: 'Pretendard',
               primaryColor: '#2C2C2C',
               secondaryColor: '#666666',
               accentColor: '#C0A583',
               spacing: 'comfortable',
               borderStyle: 'minimal',
               imageStyle: 'modern',
               animation: 'fade',
            },
            history: [],
            lastModified: null,
         },

         // 임시저장 상태
         isDirty: false,
         lastSaved: null,

         // API 액션
         setLoading: (isLoading) => set({ isLoading }),
         setError: (error) => set({ error }),
         
         // 템플릿 액션
         updateTemplate: (updates) => {
            const currentTemplate = get().template
            const hasChanges = Object.keys(updates).some((key) => JSON.stringify(currentTemplate[key]) !== JSON.stringify(updates[key]))

            if (hasChanges) {
               set((state) => ({
                  template: { ...state.template, ...updates },
                  isDirty: true,
               }))
            }
         },

         updateStyle: (styleUpdates) =>
            set((state) => ({
               template: {
                  ...state.template,
                  style: { ...state.template.style, ...styleUpdates },
               },
               isDirty: true,
            })),

         saveTemplate: async () => {
            const state = get()
            set({ isLoading: true, error: null })
            
            try {
               // API 연동 시 아래 주석을 해제하고 실제 API 호출로 대체
               /*
               const response = await api.saveTemplate(state.template)
               set({
                  template: response.data,
                  lastSaved: new Date().toISOString(),
                  isDirty: false,
               })
               */
               
               // 임시 저장 로직 (API 연동 전)
               set({
                  lastSaved: new Date().toISOString(),
                  isDirty: false,
               })
            } catch (error) {
               set({ error: error.message })
            } finally {
               set({ isLoading: false })
            }
         },

         resetTemplate: () =>
            set({
               template: {
                  title: '',
                  description: '',
                  greeting: '',
                  date: '',
                  location: '',
                  gallery: [],
                  traffic: '',
                  contact: '',
                  account: '',
                  attendance: '',
                  closing: '',
                  style: {
                     backgroundColor: '#ffffff',
                     fontFamily: 'Malgun Gothic',
                     primaryColor: '#000000',
                     secondaryColor: '#666666',
                  },
                  animation: null,
               },
               isDirty: false,
               lastSaved: null,
            }),

         // 배치 업데이트 추가
         batchUpdate: (updates) => {
            set((state) => {
               const newState = { ...state }
               updates.forEach((update) => {
                  newState.template = { ...newState.template, ...update }
               })
               return { ...newState, isDirty: true }
            })
         },
      }),
      {
         name: 'template-storage',
         getStorage: () => localStorage,
         partialize: (state) => ({
            template: state.template,
         }),
      }
   ),
   {
         name: 'template-storage',
         getStorage: () => localStorage,
         partialize: (state) => ({
            template: state.template,
            // lastSaved와 isDirty는 제외
         }),
      }
   )
)

export default useTemplateStore
