import { createClient } from 'microcms-js-sdk'

// microCMS設定が存在しない場合はnullにする
const client = import.meta.env.MICROCMS_SERVICE_DOMAIN && import.meta.env.MICROCMS_API_KEY 
  ? createClient({
      serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
      apiKey: import.meta.env.MICROCMS_API_KEY,
    })
  : null

interface ResultList<T> {
  contents: T[]
  totalCount: number
  offset: number
  limit: number
}

export interface Article {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  title: string
  content: string
  // eyecatch: any
  // category: any
}

export const getPosts = async () => {
  // microCMS設定がない場合は空配列を返す
  if (!client) {
    return []
  }
  
  // TODO 100件上限対応
  const res = await client.get<ResultList<Article>>({ endpoint: 'articles' })

  return res.contents
}

export const getPost = async (contentId: string, draftKey?: string) => {
  // microCMS設定がない場合はダミーデータを返す
  if (!client) {
    return {
      id: contentId,
      createdAt: '',
      updatedAt: '',
      publishedAt: '',
      revisedAt: '',
      title: 'Article not available',
      content: 'microCMS configuration is not available.',
    } as Article
  }
  
  const res = await client.get<Article>({
    endpoint: 'articles',
    contentId,
    queries: { draftKey },
  })

  return res
}
