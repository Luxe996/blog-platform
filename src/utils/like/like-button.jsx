import { memo } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { dislikeArticleTC, likeArticleTC } from '../../store/article-reducer'

import s from './like-button.module.scss'

const LikeButton = ({ favorited, slug, likes }) => {
  const location = useLocation()
  console.log(location.pathname)
  const dispatch = useDispatch()
  const req = location.pathname === '/' ? 'all' : 'one'
  const clickButton = () => {
    favorited ? dispatch(dislikeArticleTC(slug, req)) : dispatch(likeArticleTC(slug, req))
  }
  return (
    <>
      <button
        className={`${s.likes}  ${favorited ? s['likes--checked'] : s['likes--unchecked']}`}
        onClick={() => clickButton()}
      />
      <span className={s['likes-text']}>{likes}</span>
    </>
  )
}

export default memo(LikeButton)
