const CORS_PROXY_URLS = [
  'https://corsproxy.io/?',
  'https://cors-anywhere.herokuapp.com/',
  'https://api.allorigins.win/raw?url=',
]

const DIRECT_FETCH_DOMAINS = [
  'via.placeholder.com',
  'picsum.photos',
]

const shouldUseDirect = (url: string): boolean => {
  try {
    const urlObj = new URL(url)
    return DIRECT_FETCH_DOMAINS.some(domain => urlObj.hostname.includes(domain))
  } catch {
    return false
  }
}

export const fetchImageWithProxy = async (originalUrl: string): Promise<Response> => {
  if (shouldUseDirect(originalUrl)) {
    console.log(`Direct fetch: ${originalUrl}`)
    return fetch(originalUrl, {
      mode: 'cors',
      credentials: 'omit',
    })
  }

  const errors: Error[] = []

  try {
    console.log(`Direct fetch attempt: ${originalUrl}`)
    const directResponse = await fetch(originalUrl, {
      mode: 'cors',
      credentials: 'omit',
    })
    
    if (directResponse.ok) {
      console.log(`Direct fetch successful: ${originalUrl}`)
      return directResponse
    }
    
    errors.push(new Error(`Direct fetch failed: ${directResponse.status}`))
  } catch (error) {
    console.log(`Direct fetch failed, trying proxy: ${error}`)
    errors.push(error instanceof Error ? error : new Error(String(error)))
  }

  for (const proxyUrl of CORS_PROXY_URLS) {
    try {
      const proxiedUrl = proxyUrl + encodeURIComponent(originalUrl)
      console.log(`Proxy fetch attempt: ${proxiedUrl}`)
      
      const response = await fetch(proxiedUrl, {
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
      })
      
      if (response.ok) {
        console.log(`Proxy fetch successful: ${proxiedUrl}`)
        return response
      }
      
      errors.push(new Error(`Proxy ${proxyUrl} failed: ${response.status}`))
    } catch (error) {
      console.log(`Proxy ${proxyUrl} failed:`, error)
      errors.push(error instanceof Error ? error : new Error(String(error)))
    }
  }

  console.error('All fetch attempts failed:', errors)
  throw new Error(`All fetch methods failed. Errors: ${errors.map(e => e.message).join(', ')}`)
}