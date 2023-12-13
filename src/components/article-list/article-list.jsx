import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination, PaginationItem } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

import { SetArticlesTC } from '../../store/article-reducer'

import s from './article-list.module.scss'
import ArticlePreview from './article-preview/article-preview'
const ArticleList = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const { articles, loaded } = useSelector((state) => state.article)
  const [pages, setPages] = useState(parseInt(location.search?.split('=')[1] || '1'))

  useEffect(() => {
    if (!location.search) {
      setPages(1)
    }
    dispatch(SetArticlesTC((pages - 1) * 5))
  }, [pages])

  const items = articles.map(
    ({ slug, title, description, updatedAt: date, tagList, favorited, favoritesCount: likes, author }) => {
      const data = {
        slug,
        title,
        description,
        date,
        tagList,
        favorited,
        likes,
        preview: true,
        author: { username: author.username, image: author.image },
      }
      return (
        <li key={slug} className={s.item}>
          {/*<ArticlePreview data={data} header={false} />*/}
          <ArticlePreview data={data} />
        </li>
      )
    }
  )

  const list = loaded ? (
    <>
      <ul className={s.list}>{items}</ul>
      <Pagination
        count={10 + pages}
        page={pages}
        shape="rounded"
        color="primary"
        onChange={(_, num) => {
          setPages(num)
        }}
        renderItem={(item) => <PaginationItem component={Link} to={`/articles?page=${item.page}`} {...item} />}
      />
    </>
  ) : null
  const loader = loaded ? null : 'Шота згрузит'
  return (
    <>
      {loader}
      {list}
    </>
  )
}

export default ArticleList
