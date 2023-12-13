import axios from 'axios'

const baseURL = 'https://blog.kata.academy/api'

const instance = axios.create({
  baseURL,
})

export const ArticleAPI = {
  getArticles(offset) {
    return instance.get(`/articles?limit=5&offset=${offset}`)
  },
  getArticle(slug) {
    return instance.get(`/articles/${slug}`)
  },
}
