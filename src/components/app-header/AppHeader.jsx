import { Link } from 'react-router-dom'
import { memo } from 'react'

import s from './AppHeader.module.scss'

const AppHeader = () => {
  return (
    <header className={s.header}>
      <Link to="/">RealWorld Blog</Link>
    </header>
  )
}

export default memo(AppHeader)
