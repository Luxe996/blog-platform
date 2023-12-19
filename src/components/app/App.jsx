import { Route, Routes } from 'react-router-dom'

import Layout from '../layout/layout'
import ArticleList from '../article-list/article-list'
import Article from '../article/article'
import Registration from '../registration/registration'
import Login from '../login/login'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ArticleList />} />
          <Route path="articles" element={<ArticleList />} />
          <Route path="articles/:slug" element={<Article />} />
          <Route path="sign-up" element={<Registration />} />
          <Route path="sign-in" element={<Login />} />
        </Route>
      </Routes>
    </>
  )
}
export default App
