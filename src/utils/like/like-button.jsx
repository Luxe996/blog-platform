import { memo } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { dislikeArticleTC, likeArticleTC } from '../../store/article-reducer'

import s from './like-button.module.scss'

const LikeButton = ({ favorited, slug, likes, token }) => {
  const location = useLocation()
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
        disabled={!token}
      />
      <span className={s['likes-text']}>{likes}</span>
    </>
  )
}

export default memo(LikeButton)
