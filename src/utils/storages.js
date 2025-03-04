export const saveUserData = (user, token = null) => {
   const userId = user.id
   const userData = {
      user: {
         id: userId,
         nick: user.nick,
         email: user.email,
      },
      provider: user.provider,
      token: token ?? null,
   }

   localStorage.setItem(`userData_${userId}`, JSON.stringify(userData))
   sessionStorage.setItem(`userData_${userId}`, JSON.stringify(userData))
}

export const getUserData = (userId) => {
   if (!userId) {
      console.warn('유저 ID가 없습니다.')
      return null
   }

   const localData = localStorage.getItem(`userData_${userId}`)
   const sessionData = sessionStorage.getItem(`userData_${userId}`)

   return localData ? JSON.parse(localData) : sessionData ? JSON.parse(sessionData) : null
}

export const removeUserData = (userId) => {
   if (!userId) {
      console.error('유저 ID가 없습니다.')
      return
   }

   localStorage.removeItem(`userData_${userId}`)
   sessionStorage.removeItem(`userData_${userId}`)
   console.log(`유저 데이터 삭제됨: userData_${userId}`)
}

export const getAllUserData = () => {
   const allUsers = {}

   for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key.startsWith('userData_')) {
         allUsers[key.replace('userData_', '')] = JSON.parse(localStorage.getItem(key))
      }
   }

   return allUsers
}
