import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { memo, useState } from 'react'

import s from './article-preview.module.scss'
const ArticlePreview = ({ data }) => {
  // const { title, likes, description, author, date, favorited, tagList, slug, preview } = data
  const { title, description, author, date, tagList, slug } = data

  const formatedDate = format(new Date(date), 'MMMM	d, Y')
  // const formatedDate = date instanceof Date ? format(new Date(date), 'MMMM d, Y') : ''

  const [image, setImage] = useState(data.author?.image)

  const tags = tagList.map((tag, i) => {
    return (
      <li className={s.tag} key={i}>
        {tag}
      </li>
    )
  })

  return (
    <>
      <div className={s.content}>
        <div className={s['title-area']}>
          <h5 className={s.title}>
            <Link to={`/articles/${slug}`}>{title}</Link>
          </h5>
          {/*    likebtn*/}
        </div>
        <ul className={`${s['tag-list']} ${s['tag-list--article']}`}>{tags}</ul>
        <p className={s.text}>{description}</p>
      </div>
      <div className={s.description}>
        <div className={s['description-content']}>
          <div className={s['description-text']}>
            <h6 className={s['profile-title']}>{author.username}</h6>
            <span className={s.date}>{formatedDate}</span>
          </div>
          <img
            className={s['profile-img']}
            src={image}
            alt="profile photo"
            onError={() => {
              setImage('https://static.productionready.io/images/smiley-cyrus.jpg')
            }}
          />
        </div>
        {/*    user*/}
      </div>
    </>
  )
}

export default memo(ArticlePreview)
