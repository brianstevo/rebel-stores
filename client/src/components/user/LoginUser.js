import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ERROR } from '../../actions/changeActions'
import { login } from '../../actions/userActions'

const LoginUser = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const loadingErrorSuccessObject = useSelector((state) => state.loadingErrorSuccess)
  const { loading, error } = loadingErrorSuccessObject

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo])

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const onSubmit = (data, e) => {
    e.preventDefault()
    if (data.mail.length === 0 || data.password.length === 0) {
      return dispatch({
        type: ERROR,
        payload: 'Enter login Details',
      })
    }
    dispatch(login(data.mail, data.password))
  }
  return (
    <section className='section bg-color-grey'>
      <div className='flex-container'>
        <div className='flex-row pdT50 justify-content-center'>
          <div className=' flex-col-sm-6 flex-col-lg-4 pd30 card-border'>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
              <label className='label'>Email</label>
              <input
                className='text mgY10'
                {...register('mail', {
                  required: 'Email Address is required',
                  pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Please enter a valid email',
                  },
                })}
                aria-invalid={errors.mail ? 'true' : 'false'}
              />
              {errors.mail && <p className='red'>{errors.mail?.message}</p>}
              <label className='label'>Password</label>
              <input type='password' className='text mgY10' {...register('password', { required: true })} aria-invalid={errors.password ? 'true' : 'false'} />
              {errors.password?.type === 'required' && <p className='red'>First name is required</p>}
              <button className='mgT20 btn-blue btn-block btn' type='submit'>
                Login
              </button>
            </form>
            <div className='mgT10'>
              New Customer?
              <Link to='/signup' className='blue'>
                Signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginUser
