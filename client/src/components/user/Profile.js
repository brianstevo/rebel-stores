import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../utility/Loader'
import Message from '../../utility/Message'
import { updateProfile, userDetails } from '../../actions/userActions'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const Profile = () => {
  let navigate = useNavigate()

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const userDetail = useSelector((state) => state.userDetails)
  const { user } = userDetail

  const loadingErrorSuccessObject = useSelector((state) => state.loadingErrorSuccess)
  const { loading, success, message, error } = loadingErrorSuccessObject

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()

  useEffect(() => {
    reset({
      name: userInfo.name,
      mail: userInfo.email,
    })
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user?.name) {
        dispatch(userDetails())
      }
    }
    //eslint-disable-next-line
  }, [dispatch, navigate, user, userInfo])

  const onSubmit = (data, e) => {
    e.preventDefault()
    dispatch(updateProfile(data.name, data.mail, data.password))
  }
  return (
    <>
    {loading &&  <Loader />}
    <section className='section bg-color-grey'>
      <div className='flex-container'>
        <div className='flex-row pdT50 justify-content-center'>
          <div className='flex-col-sm-6 flex-col-md-6  flex-col-lg-4 pd30 card-border '>
            {error && <Message variant='error' message={error} />}
            {success && <Message variant='success' message={message} />}
            <h2 className='pdB10'>Edit Profile</h2>
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
              {errors.password?.type === 'required' && <p className='red'>Password is required</p>}
              <button className='mgT20 btn-blue btn-block btn' type='submit'>
                Update
              </button>
            </form>
          </div>
          {/* <div className=' flex-col-sm-8 flex-col-md-8 pdL30'>
            <h1 className='headingTitle'>Order Details</h1>
          </div> */}
        </div>
      </div>
    </section>
    </>
  )
}

export default Profile
