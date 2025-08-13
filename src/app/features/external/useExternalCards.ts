import { useCallback, useEffect, useState } from 'react'
import { validateToken } from '~/app/utils/tokenAuth'
import { fetchImageWithProxy } from '~/app/utils/imageProxy'
import { CardImageData } from '~/domains/settings'
import { getCardPattern } from './cardPatterns'

interface ExternalCardData {
  cardId: string
  count: number
}

interface ExternalCardsResult {
  isLoading: boolean
  error: string | null
  cards: CardImageData[]
  isExternalLoad: boolean
}

const parseCountsParam = (countsParam: string): ExternalCardData[] => {
  try {
    return countsParam.split(',').map(item => {
      const [cardId, countStr] = item.split(':')
      const count = parseInt(countStr, 10)
      return { cardId: cardId.trim(), count: isNaN(count) ? 1 : count }
    })
  } catch {
    return []
  }
}

const fetchImageAsBlob = async (url: string): Promise<{ file: Blob; width: number; height: number }> => {
  try {
    console.log(`Fetching image from: ${url}`)
    
    const response = await fetchImageWithProxy(url)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`)
    }
    
    const blob = await response.blob()
    console.log(`Fetched blob: ${blob.size} bytes, type: ${blob.type}`)
    
    return new Promise((resolve, reject) => {
      const img = new Image()
      const objectUrl = URL.createObjectURL(blob)
      
      img.onload = () => {
        URL.revokeObjectURL(objectUrl)
        console.log(`Image loaded: ${img.width}x${img.height}`)
        
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')!
        
        canvas.width = img.width
        canvas.height = img.height
        
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, img.width, img.height)
        ctx.drawImage(img, 0, 0)
        
        canvas.toBlob(
          (jpegBlob) => {
            if (jpegBlob) {
              console.log(`Converted to JPEG: ${jpegBlob.size} bytes`)
              resolve({
                file: jpegBlob,
                width: img.width,
                height: img.height
              })
            } else {
              reject(new Error('Failed to convert to JPEG'))
            }
          },
          'image/jpeg',
          0.9
        )
      }
      
      img.onerror = (err) => {
        URL.revokeObjectURL(objectUrl)
        console.error('Image load error:', err)
        reject(new Error('Failed to load image'))
      }
      
      img.crossOrigin = 'anonymous'
      img.src = objectUrl
    })
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

export const useExternalCards = (): ExternalCardsResult => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cards, setCards] = useState<CardImageData[]>([])
  const [isExternalLoad, setIsExternalLoad] = useState(false)

  const loadExternalCards = useCallback(async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    const patternId = urlParams.get('pattern')
    const countsParam = urlParams.get('counts')

    if (!token || !patternId || !countsParam) {
      return
    }

    if (!validateToken(token)) {
      console.warn('Invalid token for external card loading', {
        token,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      })
      setError('認証に失敗しました')
      return
    }

    console.log('Valid external card request', {
      patternId,
      timestamp: new Date().toISOString()
    })

    const pattern = getCardPattern(patternId)
    if (!pattern) {
      console.warn(`Unknown pattern: ${patternId}`)
      setError('指定されたパターンが見つかりません')
      return
    }

    const externalCards = parseCountsParam(countsParam)
    if (externalCards.length === 0) {
      setError('カードデータが正しくありません')
      return
    }

    setIsLoading(true)
    setError(null)
    setIsExternalLoad(true)

    try {
      const cardImagePromises: Promise<CardImageData>[] = []
      
      for (const { cardId, count } of externalCards) {
        const patternCard = pattern.cards.find(card => card.id === cardId)
        if (!patternCard) continue

        for (let i = 0; i < count; i++) {
          cardImagePromises.push(fetchImageAsBlob(patternCard.imageUrl))
        }
      }

      const loadedCards = await Promise.all(cardImagePromises)
      setCards(loadedCards)
      
      console.log(`Loaded ${loadedCards.length} cards from external source`)
    } catch (err) {
      console.error('Failed to load external cards:', err)
      setError('カードの読み込みに失敗しました')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadExternalCards()
  }, [loadExternalCards])

  return {
    isLoading,
    error,
    cards,
    isExternalLoad
  }
}