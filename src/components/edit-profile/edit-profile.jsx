import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import s from '../registration/registration.module.scss'
import { EditProfileTC } from '../../store/user-reducer'

const EditProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.user)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })

  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [image, setImage] = useState(user.image)

  const onSubmit = (data) => {
    dispatch(EditProfileTC(data))
  }

  const mailValidation = (email) => {
    const EMAIL_REGEXP =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
    return EMAIL_REGEXP.test(email)
  }

  const urlValidation = (url) => {
    if (url === '') return true
    try {
      new window.URL(url)
    } catch (_) {
      return false
    }
    return true
  }

  useEffect(() => {
    if (!user.username) {
      navigate('/')
    }
  }, [])

  return (
    <div className={s.wrapper}>
      <h5 className={s.title}>Edit Profile</h5>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s['input-area']}>
          <label className={s.label}>
            Username
            <input
              value={username}
              className={`${s.input} ${errors.username ? s['input--invalid'] : ''}`}
              type="text"
              placeholder="Username"
              {...register('username', {
                required: 'Enter your username',
                minLength: { value: 3, message: 'Minimum length is 3' },
                maxLength: { value: 20, message: 'Maximum length is 20' },
              })}
              onChange={(e) => {
                setUsername(e.target.value)
              }}
            />
            {errors?.username && <p className={s['error-message']}>{errors?.username.message}</p>}
          </label>
          <label className={s.label}>
            Email address
            <input
              value={email}
              className={`${s.input} ${errors.email ? s['input--invalid'] : ''}`}
              type="text"
              placeholder="Email address"
              {...register('email', {
                required: 'Enter your email address',
                validate: mailValidation,
              })}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            {errors?.email && (
              <p className={s['error-message']}>{errors?.email.message || 'Enter correct email address'}</p>
            )}
          </label>
          <label className={s.label}>
            New password
            <input
              className={`${s.input} ${errors.pass ? s['input--invalid'] : ''}`}
              type="password"
              placeholder="New password"
              {...register('pass', {
                minLength: { value: 6, message: 'Minimum length is 6' },
                maxLength: { value: 40, message: 'Maximum length is 40' },
              })}
            />
            {errors?.pass && <p className={s['error-message']}>{errors?.pass.message}</p>}
          </label>
          <label className={s.label}>
            Avatar image (url)
            <input
              value={image}
              className={`${s.input} ${errors.username ? s['input--invalid'] : ''}`}
              type="text"
              placeholder="Avatar image"
              {...register('image', {
                validate: urlValidation,
              })}
              onChange={(e) => {
                setImage(e.target.value)
              }}
            />
            {errors?.image && <p className={s['error-message']}>Enter valid image url</p>}
          </label>
        </div>
        <button type="submit" className={s['submit-btn']}>
          Save
        </button>
      </form>
    </div>
  )
}

export default EditProfile
