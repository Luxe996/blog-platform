import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import Layout from '../layout/layout'
import ArticleList from '../article-list/article-list'
import Article from '../article/article'
import Registration from '../registration/registration'
import Login from '../login/login'
import EditProfile from '../edit-profile/edit-profile'
import { RelogTC } from '../../store/user-reducer'
import NewArticle from '../new-article/new-article'
import EditArticle from '../edit-article/edit-article'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const accessToken = localStorage.getItem('token')
    if (accessToken) {
      dispatch(RelogTC())
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ArticleList />} />
          <Route path="articles" element={<ArticleList />} />
          <Route path="articles/:slug" element={<Article />} />
          <Route path="sign-up" element={<Registration />} />
          <Route path="sign-in" element={<Login />} />
          <Route path="profile" element={<EditProfile />} />
          <Route path="new-article" element={<NewArticle />} />
          <Route path="articles/:slug/edit" element={<EditArticle />} />
        </Route>
      </Routes>
    </>
  )
}
export default App
