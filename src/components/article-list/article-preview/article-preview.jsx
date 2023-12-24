import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { memo, useState } from 'react'
import { useSelector } from 'react-redux'

import AcceptModal from '../../../utils/accept-modal/accept-modal'
import LikeButton from '../../../utils/like/like-button'

import s from './article-preview.module.scss'
const ArticlePreview = ({ data }) => {
  const { title, description, author, date, tagList, slug, preview, favorited, likes } = data
  const { user } = useSelector((state) => state.user)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const formatedDate = format(new Date(date), 'MMMM	d, Y')

  const [image, setImage] = useState(data.author?.image)

  const tags = tagList.map((tag, i) => {
    return (
      <li className={s.tag} key={i}>
        {tag}
      </li>
    )
  })

  const buttons = (
    <div className={s.buttons}>
      <button className={`${s.btn} ${s['btn--delete']}`} onClick={() => setIsModalOpen(true)}>
        Delete
      </button>
      {isModalOpen && <AcceptModal setOpen={setIsModalOpen} slug={slug} />}
      <Link className={`${s.btn} ${s['btn--edit']}`} to={`/articles/${slug}/edit`}>
        Edit
      </Link>
    </div>
  )

  return (
    <>
      <div className={s.content}>
        <div className={s['title-area']}>
          <h5 className={s.title}>
            <Link to={`/articles/${slug}`}>{title}</Link>
          </h5>
          <LikeButton favorited={favorited} slug={slug} likes={likes} token={user.token} />
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
        {user.username === author.username && !preview && buttons}
      </div>
    </>
  )
}

export default memo(ArticlePreview)
