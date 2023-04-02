import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ERROR } from '../../actions/changeActions'
import { signup } from '../../actions/userActions'

const SignupUser = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const userSignup = useSelector((state) => state.userLogin)
  const { userInfo } = userSignup

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
    if (data.name.length === 0 || data.mail.length === 0 || data.password.length === 0) {
      return dispatch({
        type: ERROR,
        payload: 'Enter All Fields',
      })
    }
    dispatch(signup(data.name, data.mail, data.password))
  }
  return (
    <section className='section bg-color-grey'>
      <div className='flex-container'>
        <div className='flex-row pdT50 justify-content-center'>
          <div className=' flex-col-sm-6 flex-col-lg-4 pd30 card-border'>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
              <label className='label'>Name</label>
              <input
                className='mgY10 text'
                {...register('name', {
                  required: 'name is required',
                })}
                aria-invalid={errors.name ? 'true' : 'false'}
              />
              {errors.name && <p className='red'>{errors.name?.message}</p>}
              <label className='label'>Email</label>
              <input
                className='mgY10 text'
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
              <input type='password' className='mgY10 text' {...register('password', { required: true })} aria-invalid={errors.password ? 'true' : 'false'} />
              {errors.password?.type === 'required' && <p className='red'>First name is required</p>}
              <button className='mgT20 btn-blue btn-block btn' type='submit'>
                Signup
              </button>
            </form>
            <div className='mgT10'>
              Have an Account?
              <Link to='/login' className='blue'>
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignupUser
