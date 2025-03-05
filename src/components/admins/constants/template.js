// constants/template.js
export const CATEGORIES = [
   { value: 'all', label: '전체보기' },
   { value: 'wedding', label: '청첩장' },
   { value: 'invitation', label: '초빙장' },
   { value: 'newyear', label: '연회장' },
   { value: 'gohyeon', label: '고희연' },
]

export const INITIAL_FORM_DATA = {
   title: '',
   thumbnail: null,
   thumbnailPreview: null,
   category: 'wedding',
   content: '',
   price: 10000,
   data: {},
   status: 'draft',
}

export const ITEMS_PER_PAGE = 6
