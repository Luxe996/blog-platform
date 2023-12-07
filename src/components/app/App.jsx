import { Route, Routes } from 'react-router-dom'

import Layout from '../layout/layout'
import ArticleList from '../article-list/article-list'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ArticleList />} />
        </Route>
      </Routes>
    </>
  )
}
export default App
