import axios from 'axios'

const commonApi = axios.create({
   baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
   withCredentials: true,
   headers: {
      'Content-Type': 'application/json',
   },
})

export default commonApi
