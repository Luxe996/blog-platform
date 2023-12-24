import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { v4 } from 'uuid'

import s from '../registration/registration.module.scss'
import { CreateArticleAC, CreateArticleTC, EditArticleTC, SetArticleAC } from '../../store/article-reducer'

import s1 from './new-article.module.scss'
import Tag from './tag'

const NewArticle = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { selectArticle, createArticle, loaded } = useSelector((state) => state.article)
  const [tags, setTags] = useState([])
  const [tagsInput, setTagsInput] = useState('')
  const [titleInput, setTitleInput] = useState('')
  const [descriptionInput, setDescriptionInput] = useState('')
  const [bodyInput, setBodyInput] = useState('')
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })

  const addTag = (name) => {
    if (name) {
      const tag = { name, id: v4() }
      setTagsInput('')
      setTags((tags) => {
        return [...tags, tag]
      })
    }
  }

  const deleteTag = (id) => {
    setTags((tags) => {
      const i = tags.findIndex((el) => el.id === id)
      return [...tags.slice(0, i), ...tags.slice(i + 1)]
    })
  }

  useEffect(() => {
    setTags([])
    setTagsInput('')
    dispatch(SetArticleAC(null))
  }, [])

  useEffect(() => {
    if (createArticle) {
      dispatch(CreateArticleAC(null))
      navigate(`/articles/${createArticle.slug}`)
    }
    if (selectArticle) {
      setTitleInput(selectArticle.title)
      setDescriptionInput(selectArticle.description)
      setBodyInput(selectArticle.body)
      setTags([])
      selectArticle.tagList.map((el) => {
        addTag(String(el))
      })
    } else {
      setTitleInput('')
      setDescriptionInput('')
      setBodyInput('')
      setTags([])
    }
  }, [selectArticle, createArticle])

  const onSubmit = (data) => {
    const tagNames = tags.map((el) => el.name)
    const requestData = {
      ...data,
      tagList: tagNames,
    }
    if (location.pathname === '/new-article') {
      dispatch(CreateArticleTC(requestData))
    } else {
      dispatch(EditArticleTC(selectArticle.slug, requestData))
    }
  }

  const form = (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s['input-area']}>
        <label className={`${s.label} ${s1.label}`}>
          Title
          <input
            value={titleInput}
            className={`${s.input}  ${errors.title ? s['input--invalid'] : ''}`}
            type="text"
            placeholder="Title"
            {...register('title', {
              required: 'Title is required',
            })}
            onChange={(e) => setTitleInput(e.target.value)}
          />
          {errors?.title && <p className={s['error-message']}>{errors?.title.message}</p>}
        </label>
        <label className={`${s.label} ${s1.label}`}>
          Short description
          <input
            value={descriptionInput}
            className={`${s.input}  ${errors.description ? s['input--invalid'] : ''}`}
            type="text"
            placeholder="Title"
            {...register('description', {
              required: 'Short description is required',
            })}
            onChange={(e) => setDescriptionInput(e.target.value)}
          />
          {errors?.description && <p className={s['error-message']}>{errors?.description.message}</p>}
        </label>
        <label className={`${s.label} ${s1.label}`}>
          Text
          <textarea
            value={bodyInput}
            className={`${s.input} ${s1.textarea} ${errors.body ? s['input--invalid'] : ''}`}
            placeholder="Text"
            {...register('body', {
              required: 'Text is required',
            })}
            onChange={(e) => setBodyInput(e.target.value)}
          />
          {errors?.body && <p className={s['error-message']}>{errors?.body.message}</p>}
        </label>
        <div className={`${s.label} ${s1.label}`}>
          Tags
          <ul>
            {tags.map((el) => {
              return <Tag data={el} key={el.id} deleteTag={deleteTag} />
            })}
          </ul>
          <div>
            <input
              value={tagsInput}
              className={`${s.input} ${s1['tag-name']}`}
              type="text"
              placeholder="Tag"
              onChange={(e) => setTagsInput(e.target.value)}
            />
            <button
              type="button"
              className={`${s1.btn} ${s1['btn--delete']}`}
              onClick={() => {
                const el = tags[tags.length - 1].id
                deleteTag(el)
              }}
            >
              Delete
            </button>
            <button className={`${s1.btn} ${s1['btn--add']}`} type="button" onClick={() => addTag(tagsInput)}>
              Add tag
            </button>
          </div>
        </div>
      </div>
      <button type="submit" className={`${s['submit-btn']} ${s1.submit}`}>
        Send
      </button>
    </form>
  )
  const title = location.pathname === '/new-article' ? 'Create new article' : 'Edit article'

  return (
    <div className={`${s.wrapper} ${s1.wrapper}`}>
      <h5 className={s.title}>{title}</h5>
      {/*{!loaded && <Loader />}*/}
      {!loaded && 'Шота згрузит'}
      {loaded && form}
    </div>
  )
}

export default NewArticle
