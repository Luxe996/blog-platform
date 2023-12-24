import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { SetArticleTC } from '../../store/article-reducer'
import NewArticle from '../new-article/new-article'

const EditArticle = () => {
  const dispatch = useDispatch()
  const { slug } = useParams()
  useEffect(() => {
    dispatch(SetArticleTC(slug))
  }, [])
  return <NewArticle />
}

export default EditArticle
