export interface CardPatternCard {
  id: string
  name: string
  imageUrl: string
}

export interface CardPattern {
  id: string
  name: string
  description?: string
  cards: CardPatternCard[]
}

export const cardPatterns: CardPattern[] = [
  {
    id: 'onepiece_op01_luffy',
    name: 'OP01 ルフィデッキ',
    description: 'ワンピースカードゲーム OP01 ルフィ中心デッキ',
    cards: [
      {
        id: 'OP01-001',
        name: 'モンキー・D・ルフィ',
        imageUrl: 'https://punkdb.sakura.ne.jp/op/cardOP01-001.webp'
      },
      {
        id: 'OP01-025',
        name: 'ロロノア・ゾロ',
        imageUrl: 'https://punkdb.sakura.ne.jp/op/cardOP01-025.webp'
      },
      {
        id: 'OP01-016',
        name: 'ナミ',
        imageUrl: 'https://punkdb.sakura.ne.jp/op/cardOP01-016.webp'
      },
      {
        id: 'OP01-004',
        name: 'ウソップ',
        imageUrl: 'https://punkdb.sakura.ne.jp/op/cardOP01-004.webp'
      },
      {
        id: 'OP01-013',
        name: 'サンジ',
        imageUrl: 'https://punkdb.sakura.ne.jp/op/cardOP01-013.webp'
      }
    ]
  },
  {
    id: 'onepiece_op02_whitebeard',
    name: 'OP02 白ひげデッキ',
    description: 'ワンピースカードゲーム OP02 白ひげ中心デッキ',
    cards: [
      {
        id: 'OP02-001',
        name: 'エドワード・ニューゲート',
        imageUrl: 'https://punkdb.sakura.ne.jp/op/cardOP02-001.webp'
      },
      {
        id: 'OP02-013',
        name: 'ポートガス・D・エース',
        imageUrl: 'https://punkdb.sakura.ne.jp/op/cardOP02-013.webp'
      },
      {
        id: 'OP02-018',
        name: 'マルコ',
        imageUrl: 'https://punkdb.sakura.ne.jp/op/cardOP02-018.webp'
      },
      {
        id: 'OP02-025',
        name: 'ジョズ',
        imageUrl: 'https://punkdb.sakura.ne.jp/op/cardOP02-025.webp'
      }
    ]
  },
  {
    id: 'onepiece_op13_latest',
    name: 'OP13 最新カード',
    description: 'ワンピースカードゲーム OP13 最新弾',
    cards: [
      {
        id: 'OP13-089',
        name: '最新カード例',
        imageUrl: 'https://punkdb.sakura.ne.jp/op/OP13-089.webp'
      },
      {
        id: 'OP13-001',
        name: '最新カード例2',
        imageUrl: 'https://punkdb.sakura.ne.jp/op/OP13-001.webp'
      }
    ]
  }
]

export const getCardPattern = (patternId: string): CardPattern | undefined => {
  return cardPatterns.find(pattern => pattern.id === patternId)
}

export const getAllPatternIds = (): string[] => {
  return cardPatterns.map(pattern => pattern.id)
}