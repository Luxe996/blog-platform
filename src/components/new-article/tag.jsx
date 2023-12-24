import { memo } from 'react'

import s1 from '../registration/registration.module.scss'

import s from './new-article.module.scss'
const Tag = ({ data, deleteTag }) => {
  const { name, id } = data
  return (
    <li className={s.tag}>
      <span className={`${s1.input} ${s['tag-name']}`}>{name}</span>
      <button
        type="button"
        onClick={() => {
          deleteTag(id)
        }}
        className={`${s.btn} ${s['btn--delete']}`}
      >
        Delete
      </button>
    </li>
  )
}

export default memo(Tag)
