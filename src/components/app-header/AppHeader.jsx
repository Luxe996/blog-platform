import { Link, useNavigate } from 'react-router-dom'
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { LogOutAC } from '../../store/user-reducer'

import s from './AppHeader.module.scss'

const AppHeader = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { username, image } = useSelector((state) => state.user.user)

  const signIn = username ? null : <Link to="sign-in">Sign In</Link>

  const signUp = username ? null : (
    <Link to="sign-up" className={s['sign-up']}>
      Sign Up
    </Link>
  )
  const createArticle = username ? (
    <Link to="new-article" className={s.create}>
      Create article
    </Link>
  ) : null

  const profile = username ? (
    <Link to="/profile" className={s.profile}>
      <h6 className={s['profile-title']}>{username}</h6>
      <img className={s['profile-img']} src={image} alt="avatar" />
    </Link>
  ) : null

  const logOutBtn = username ? (
    <button
      className={s.logout}
      onClick={() => {
        dispatch(LogOutAC())
        return navigate('/articles')
      }}
    >
      Log Out
    </button>
  ) : null

  return (
    <header className={s.header}>
      <Link to="/">RealWorld Blog</Link>
      <div className={s['link-area']}>
        {signIn}
        {signUp}
        {createArticle}
        {profile}
        {logOutBtn}
      </div>
    </header>
  )
}

export default memo(AppHeader)
