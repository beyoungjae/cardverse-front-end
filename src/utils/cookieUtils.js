/**
 * 쿠키에서 특정 이름의 값을 가져오는 함수
 * @param {string} name - 가져올 쿠키의 이름
 * @returns {string|null} - 쿠키 값 또는 null
 */
export const getCookieValue = (name) => {
   const cookies = document.cookie.split(';')
   const cookie = cookies.find((c) => c.trim().startsWith(`${name}=`))

   if (cookie) {
      return cookie.trim().substring(name.length + 1) // name= 부분 제외
   }
   return null
}

/**
 * 쿠키에서 리프레시 토큰을 가져오는 함수
 * @returns {string|null} - 리프레시 토큰 또는 null
 */
export const getRefreshTokenFromCookie = () => {
   return getCookieValue('refreshToken')
}

/**
 * 쿠키 설정 함수
 * @param {string} name - 쿠키 이름
 * @param {string} value - 쿠키 값
 * @param {Object} options - 쿠키 옵션 (expires, path 등)
 */
export const setCookie = (name, value, options = {}) => {
   let cookieString = `${name}=${value}`

   if (options.expires) {
      cookieString += `; expires=${options.expires.toUTCString()}`
   }

   if (options.path) {
      cookieString += `; path=${options.path}`
   }

   if (options.secure) {
      cookieString += '; secure'
   }

   if (options.sameSite) {
      cookieString += `; samesite=${options.sameSite}`
   }

   document.cookie = cookieString
}

/**
 * 쿠키 삭제 함수
 * @param {string} name - 삭제할 쿠키 이름
 */
export const removeCookie = (name) => {
   document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}
