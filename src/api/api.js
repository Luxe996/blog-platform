import axios from 'axios'

const baseURL = 'https://blog.kata.academy/api'

const instance = axios.create({
  baseURL,
})

// const urlsSkipAuth = ['/users', '/users/login', '/articles']
const urlsSkipAuth = ['/users', '/users/login']

instance.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem('token')

  if (config.url && urlsSkipAuth.includes(config.url)) {
    return config
  }
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

export const ArticleAPI = {
  getArticles(offset) {
    return instance.get(`/articles?limit=5&offset=${offset}`)
  },
  getArticle(slug) {
    return instance.get(`/articles/${slug}`)
  },
  createArticle(data) {
    return instance.post('/articles', {
      article: data,
    })
  },
  editArticle(slug, data) {
    return instance.put(`/articles/${slug}`, {
      article: data,
    })
  },
  deleteArticle(slug) {
    return instance.delete(`/articles/${slug}`)
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
  getImage(username) {
    return instance.get(`/profiles/${username}`)
  },
  editProfile(data) {
    return instance.put('/user', {
      user: data,
    })
  },
  relog() {
    return instance.get('/user')
  },
}
