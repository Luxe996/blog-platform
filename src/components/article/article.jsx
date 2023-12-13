import { memo, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'

import { SetArticleTC } from '../../store/article-reducer'
import ArticlePreview from '../article-list/article-preview/article-preview'

import s from './article.module.scss'

const Article = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const { loaded, selectArticle } = useSelector((state) => state.article)
  let articleData = null

  useEffect(() => {
    dispatch(SetArticleTC(slug))
  }, [])

  if (selectArticle) {
    const {
      slug,
      title,
      description,
      updatedAt: date,
      tagList,
      favorited,
      favoritesCount: likes,
      author,
      body,
    } = selectArticle

    const data = {
      slug,
      title,
      description,
      date,
      tagList,
      favorited,
      likes,
      preview: false,
      author: { username: author.username, image: author.image },
    }
    articleData = (
      <>
        <div className={s.header}>
          <ArticlePreview data={data} />
        </div>
        <ReactMarkdown>{body}</ReactMarkdown>
      </>
    )
  }
  return <article className={s.article}>{loaded ? articleData : 'Шота згрузит'}</article>
}

export default memo(Article)
