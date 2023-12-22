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
        </Route>
      </Routes>
    </>
  )
}
export default App
