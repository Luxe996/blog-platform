import axios from 'axios'

const baseURL = 'https://blog.kata.academy/api'

const instance = axios.create({
  baseURL,
})

export const ArticleAPI = {
  getArticles() {
    return instance.get('/articles')
  },
}
