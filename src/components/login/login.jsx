import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import s from '../registration/registration.module.scss'
import { LoginTC } from '../../store/user-reducer'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error: loginError, user } = useSelector((state) => state.user)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })

  const emailValidation = (email) => {
    const EMAIL_REGEXP =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
    return EMAIL_REGEXP.test(email)
  }

  const onSubmit = (data) => {
    dispatch(LoginTC(data.email, data.password))
  }

  useEffect(() => {
    user.username && navigate('/')
  }, [user])

  return (
    <div className={s.wrapper}>
      <h5 className={s.title}>Sign In</h5>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s['input-area']}>
          <label className={s.label}>
            Email address
            <input
              className={`${s.input} ${errors.email || 'email or password' in loginError ? s['input--invalid'] : ''}`}
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
          </label>
          <label className={s.label}>
            Password
            <input
              className={`${s.input} ${
                errors.password || 'email or password' in loginError ? s['input--invalid'] : ''
              }`}
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'Enter your password',
                minLength: { value: 6, message: 'Minimum length is 6' },
                maxLength: { value: 40, message: 'Maximum length is 40' },
              })}
            />
            {errors?.password && <p className={s['error-message']}>{errors?.password.message}</p>}
            {!errors?.password && !errors.email && 'email or password' in loginError && (
              <p className={s['error-message']}>Email or password {loginError['email or password']}</p>
            )}
          </label>
        </div>
        <button type="submit" className={s['submit-btn']}>
          Login
        </button>
        <div className={s.redirect}>
          Don’t have an account?{' '}
          <Link className={s['redirect-link']} to="/sign-up">
            Sign Up.
          </Link>
        </div>
      </form>
    </div>
  )
}
export default Login
