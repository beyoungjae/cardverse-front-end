// constants/template.js
export const CATEGORIES = [
   { value: 'wedding', label: '청첩장' },
   { value: 'invitation', label: '초대장' },
   { value: 'newyear', label: '연하장' },
   { value: 'gohyeon', label: '고현' },
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
