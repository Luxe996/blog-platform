import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from 'antd'

import { SetArticlesTC } from '../../store/article-reducer'

import s from './article-list.module.scss'
const ArticleList = () => {
  const dispatch = useDispatch()

  const { articles, loaded } = useSelector((state) => state.article)

  useEffect(() => {
    dispatch(SetArticlesTC())
  }, [])

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
      console.log(data)
      return (
        <li key={slug} className={s.item}>
          {/*<ArticlePreview data={data} header={false} />*/}
        </li>
      )
    }
  )

  const list = loaded ? (
    <>
      <ul className={s.list}>{items}</ul>
      <Pagination
        count={10}
        // count={10 + pages}
        // page={pages}
        shape="rounded"
        color="primary"
        // onChange={(_, num) => {
        //   setPages(num)
        // }}
        // renderItem={(item) => <PaginationItem component={Link} to={`/articles?page=${item.page}`} {...item} />}
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
