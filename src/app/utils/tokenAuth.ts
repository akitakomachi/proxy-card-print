const SECRET_PHRASE = 'proxy-card-print-secret-2024'

const simpleHash = (str: string): string => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(36)
}

export const generateToken = (timestamp?: number): string => {
  const now = timestamp || Date.now()
  const hourKey = Math.floor(now / 3600000)
  return simpleHash(hourKey + SECRET_PHRASE).slice(0, 8)
}

export const validateToken = (token: string): boolean => {
  if (!token || token.length !== 8) return false
  
  const now = Date.now()
  const currentToken = generateToken(now)
  
  if (token === currentToken) return true
  
  const previousHourToken = generateToken(now - 3600000)
  return token === previousHourToken
}