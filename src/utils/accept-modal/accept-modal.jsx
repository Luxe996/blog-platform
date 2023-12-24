import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { DeleteArticleTC } from '../../store/article-reducer'

import s from './accept-modal.module.scss'

const AcceptModal = ({ setOpen, slug }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onDelete = () => {
    dispatch(DeleteArticleTC(slug))
    navigate('/articles')
  }

  return (
    <div className={s.modal}>
      <div className={s['modal-text']}>Are you sure to delete this article?</div>
      <div className={s['modal-buttons']}>
        <button
          className={`${s['modal-btn']} ${s['modal-btn--no']}`}
          onClick={() => {
            setOpen(false)
          }}
        >
          No
        </button>
        <button className={`${s['modal-btn']} ${s['modal-btn--yes']}`} onClick={onDelete}>
          Yes
        </button>
      </div>
    </div>
  )
}

export default AcceptModal
