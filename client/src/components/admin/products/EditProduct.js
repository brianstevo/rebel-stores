import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../utility/Loader'
import Message from '../../../utility/Message'
import { useNavigate } from 'react-router-dom'
import { updateProduct, PRODUCT_CREATE_RESET } from '../../../actions/productActions'
import { useForm } from 'react-hook-form'

const EditProduct = () => {
  // let { id } = useParams()
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()

  const [image, setImage] = useState()

  let navigate = useNavigate()

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const loadingErrorSuccessObject = useSelector((state) => state.loadingErrorSuccess)
  const { loading, success, error } = loadingErrorSuccessObject

  const productDetails = useSelector((state) => state.productDetails)
  const { product } = productDetails

  useEffect(() => {
    // dispatch(listProductDetails(id))
    if (!userInfo.isAdmin) {
      navigate('/login')
    }
    if (!product) {
      navigate('/admin/products/view')
    }
    reset({
      name: product.name,
      price: product.price,
      category: product.category,
      brand: product.brand,
      quantity: product.countInStock,
      description: product.description,
    })
    if (success) {
      navigate('..')
      dispatch({
        type: PRODUCT_CREATE_RESET,
      })
    }
    //eslint-disable-next-line
  }, [product, navigate, userInfo, success])

  const submitHandler = (data, e) => {
    e.preventDefault()
    const formData = new FormData()
    if (data.image.length === 0) {
      formData.append('image', product.image)
      formData.append('imageUpload', 'N')
    } else {
      formData.append('file', data.image[0])
      formData.append('imageUpload', 'Y')
    }
    formData.append('price', data.price)
    formData.append('category', data.category)
    formData.append('brand', data.brand)
    formData.append('countInStock', data.quantity)
    formData.append('name', data.name)
    formData.append('description', data.description)
    dispatch(updateProduct(product._id, formData))
  }

  const handleImage = async (e) => {
    const base64 = await convertToBase64(e.target.files[0])
    setImage(base64)
  }

  return (
    <>
      {loading && <Loader />}
      <section className='section bg-color-grey'>
        <div className='flex-container'>
          <div className='flex-row pdT60 justify-content-center'>
            <div className='flex-col-sm-6 flex-col-md-6  flex-col-lg-6 flex-col-xl-4 pd30 card-border '>
              {error && <Message variant='error' message={error} />}
              <h2 className='pdB10'>Create Product</h2>
              <form className='form' onSubmit={handleSubmit(submitHandler)}>
                <label className='label'>Product Name</label>
                <input
                  className='mgY10 text'
                  {...register('name', {
                    required: 'Name is required',
                  })}
                  aria-invalid={errors.name ? 'true' : 'false'}
                />
                {errors.name && <p className='red'>{errors.name?.message}</p>}
                <label className='label'>Price</label>
                <input
                  type='number'
                  className='mgY10 text'
                  {...register('price', {
                    required: 'Price is required',
                  })}
                  aria-invalid={errors.price ? 'true' : 'false'}
                />
                {errors.price && <p className='red'>{errors.price?.message}</p>}
                <label className='label'>Image</label>
                <input type='file' accept='.png,.jpg,.jpeg,.webp' className='mgY10 text' {...register('image')} onChange={handleImage} />
                {image ? <img className='full-width' src={image} alt='product' /> : <img className='full-width' src={product.image} alt='product' />}
                <label className='label'>Category</label>
                <input
                  className='mgY10 text'
                  {...register('category', {
                    required: 'Category is required',
                  })}
                  aria-invalid={errors.category ? 'true' : 'false'}
                />
                {errors.category && <p className='red'>{errors.category?.message}</p>}
                <label className='label'>Brand</label>
                <input
                  className='mgY10 text'
                  {...register('brand', {
                    required: 'Brand is required',
                  })}
                  aria-invalid={errors.brand ? 'true' : 'false'}
                />
                {errors.brand && <p className='red'>{errors.brand?.message}</p>}
                <label className='label'>Product in Stock</label>
                <input
                  type='number'
                  className='mgY10 text'
                  {...register('quantity', {
                    required: 'Quantity is required',
                  })}
                  aria-invalid={errors.quantity ? 'true' : 'false'}
                />
                {errors.quantity && <p className='red'>{errors.quantity?.message}</p>}
                <label className='label'>Description</label>
                <input
                  className='mgY10 text'
                  {...register('description', {
                    required: 'Description is required',
                  })}
                  aria-invalid={errors.description ? 'true' : 'false'}
                />
                {errors.description && <p className='red'>{errors.description?.message}</p>}
                <button className='mgT20 btn-blue btn-block btn' type='submit'>
                  Edit Product
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

export default EditProduct

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      resolve(fileReader.result)
    }
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}
