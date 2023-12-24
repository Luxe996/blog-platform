import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { RegistrationTC } from '../../store/user-reducer'

import s from './registration.module.scss'

const Registration = () => {
  const { error: registerError, user } = useSelector((state) => state.user)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: 'onBlur' })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const emailValidation = (email) => {
    const EMAIL_REGEXP =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
    return EMAIL_REGEXP.test(email)
  }

  const passValidation = (pass) => {
    return watch('pass') === pass
  }
  const onSubmit = (data) => {
    dispatch(RegistrationTC(data.username, data.email, data.pass))
  }

  useEffect(() => {
    user.username && navigate('/')
  }, [user])

  return (
    <div className={s.wrapper}>
      <h5 className={s.title}>Create account</h5>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s['input-area']}>
          <label className={s.label}>
            Username
            <input
              className={`${s.input} ${errors.username ? s['input--invalid'] : ''}`}
              type="text"
              placeholder="Username"
              {...register('username', {
                required: 'Enter your username',
                minLength: { value: 3, message: 'Minimum length is 3' },
                maxLength: { value: 20, message: 'Maximum length is 20' },
              })}
            />
            {errors?.username && <p className={s['error-message']}>{errors?.username.message}</p>}
            {registerError?.errors?.username && !errors?.username && (
              <p className={s['error-message']}>This username {registerError?.errors.username}</p>
            )}
          </label>
          <label className={s.label}>
            Email address
            <input
              className={`${s.input} ${errors.email ? s['input--invalid'] : ''}`}
              type="text"
              placeholder="Email address"
              {...register('email', {
                required: 'Enter your email address',
                validate: emailValidation,
              })}
            />
            {errors?.email && (
              <p className={s['error-message']}>{errors?.email.message || 'Enter correct email address'}</p>
            )}
            {registerError?.errors?.email && !errors?.mail && (
              <p className={s['error-message']}>This email {registerError?.errors.email}</p>
            )}
          </label>
          <label className={s.label}>
            Password
            <input
              className={`${s.input} ${errors.pass ? s['input--invalid'] : ''}`}
              type="password"
              placeholder="Password"
              {...register('pass', {
                required: 'Enter your password',
                minLength: { value: 6, message: 'Minimum length is 6' },
                maxLength: { value: 40, message: 'Maximum length is 40' },
              })}
            />
            {errors?.pass && <p className={s['error-message']}>{errors?.pass.message}</p>}
          </label>
          <label className={s.label}>
            Repeat Password
            <input
              className={`${s.input} ${errors.passRepeat ? s['input--invalid'] : ''}`}
              type="password"
              placeholder="Password"
              {...register('passRepeat', {
                required: 'Enter your password',
                validate: passValidation,
              })}
            />
            {errors?.passRepeat && <p className={s['error-message']}>Passwords must match</p>}
          </label>
          <label className={s['checkbox-label']}>
            <input
              className={s.checkbox}
              type="checkbox"
              {...register('agree', {
                required: 'Enter your password',
              })}
            />
            <div>I agree to the processing of my personal information</div>
          </label>
          {errors?.agree && <p className={s['error-message']}>Agreement is required</p>}
        </div>
        <button type="submit" className={s['submit-btn']}>
          Create
        </button>
        <div className={s.redirect}>
          Already have an account?{' '}
          <Link className={s['redirect-link']} to="/sign-in">
            Sign In.
          </Link>
        </div>
      </form>
    </div>
  )
}
export default Registration
