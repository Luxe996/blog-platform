import { memo } from 'react'
import { Outlet } from 'react-router-dom'

import AppHeader from '../app-header/AppHeader'

import s from './layout.module.scss'

const Layout = () => {
  return (
    <>
      <AppHeader />
      <main className={s.main}>
        <Outlet />
      </main>
    </>
  )
}

export default memo(Layout)
