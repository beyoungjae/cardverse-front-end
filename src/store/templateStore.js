import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useTemplateStore = create(
   persist(
      (set) => ({
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
               backgroundColor: '#ffffff',
               fontFamily: 'Malgun Gothic',
               primaryColor: '#000000',
               secondaryColor: '#666666',
            },
            animation: null,
         },

         // 임시저장 상태
         isDirty: false,
         lastSaved: null,

         // 액션
         updateTemplate: (updates) =>
            set((state) => ({
               template: { ...state.template, ...updates },
               isDirty: true,
            })),

         updateStyle: (styleUpdates) =>
            set((state) => ({
               template: {
                  ...state.template,
                  style: { ...state.template.style, ...styleUpdates },
               },
               isDirty: true,
            })),

         saveTemplate: () =>
            set((state) => ({
               lastSaved: new Date().toISOString(),
               isDirty: false,
            })),

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
      }),
      {
         name: 'template-storage',
         getStorage: () => localStorage,
      }
   )
)

export default useTemplateStore
