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

export const UserAPI = {
  registration(username, email, password) {
    return instance.post('/users', {
      user: {
        username,
        email,
        password,
      },
    })
  },
  login(email, password) {
    return instance.post('/users/login', {
      user: {
        email,
        password,
      },
    })
  },
}
