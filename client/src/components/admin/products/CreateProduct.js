import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../utility/Loader'
import Message from '../../../utility/Message'
import { useNavigate } from 'react-router-dom'
import { createProduct, PRODUCT_CREATE_RESET } from '../../../actions/productActions'
import { useForm } from 'react-hook-form'

const CreateProduct = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()

  let navigate = useNavigate()

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // const productCreate = useSelector((state) => state.productCreate)
  // const { product } = productCreate

  const loadingErrorSuccessObject = useSelector((state) => state.loadingErrorSuccess)
  const { loading, success, error } = loadingErrorSuccessObject

  const productDetails = useSelector((state) => state.productDetails)
  const { product } = productDetails

  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate('/login')
    }
    if (product) {
      reset({
        name: userInfo.name,
        price: userInfo.email,
        image: '',
        category: '',
        brand: '',
        countInStock: '',
        description: '',
      })
    }
    if (success) {
      navigate('..')
      dispatch({
        type: PRODUCT_CREATE_RESET,
      })
    }
    //eslint-disable-next-line
  }, [dispatch, navigate, userInfo, success])

  const submitHandler = (data, e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', data.image[0])
    formData.append('price', data.price)
    formData.append('category', data.category)
    formData.append('brand', data.brand)
    formData.append('countInStock', data.quantity)
    formData.append('name', data.name)
    formData.append('description', data.name)
    dispatch(createProduct(formData))
  }

  // const handleImage = async (e) => {
  //   console.log(e.target)
  //   console.log(e.target.files[0])
  // const base64 = await convertToBase64(e.target.files[0])
  // setImage(base64)
  // }

  return (
    // <Container>
    //   <Row className=' my-3 mx-3'>
    //     <Col xs={12} md={5}>
    //       <h4>Create Product</h4>
    //       {error && <Message variant='danger' message={error} />}
    //       {loading && <Loader />}
    //       <Form onSubmit={submitHandler}>
    //         <Form.Group controlId='name'>
    //           <Form.Label>Product Name</Form.Label>
    //           <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
    //         </Form.Group>
    //         <Form.Group controlId='price'>
    //           <Form.Label>Price</Form.Label>
    //           <Form.Control type='number' placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)} />
    //         </Form.Group>
    //         <Form.Group controlId='image'>
    //           <Form.Label>Image</Form.Label>
    //           <Form.Control type='file' accept='.png,.jpg,.jpeg ,.webp' placeholder='Enter Image' onChange={handleImage} />
    //         </Form.Group>
    //         {image && (
    //           <div className='createImage mt-3 me-3'>
    //             <img src={image} alt='' style={{ width: '300px', height: '300px', objectFit: 'contain' }} />
    //           </div>
    //         )}
    //         <Form.Group controlId='category'>
    //           <Form.Label>Category</Form.Label>
    //           <Form.Control type='text' placeholder='Enter Category' value={category} onChange={(e) => setCategory(e.target.value)} />
    //         </Form.Group>
    //         <Form.Group controlId='brand'>
    //           <Form.Label>Brand</Form.Label>
    //           <Form.Control type='text' placeholder='Enter Brand' value={brand} onChange={(e) => setBrand(e.target.value)} />
    //         </Form.Group>
    //         <Form.Group controlId='countInStock'>
    //           <Form.Label>Product in Stock</Form.Label>
    //           <Form.Control type='number' placeholder='Enter Quantity' value={countInStock} onChange={(e) => SetCountInStock(e.target.value)} />
    //         </Form.Group>
    //         <Form.Group controlId='description'>
    //           <Form.Label>Product Name</Form.Label>
    //           <Form.Control type='text' placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)} />
    //         </Form.Group>
    //         <Button variant='primary' type='submit' className='mt-3'>
    //           Create Product
    //         </Button>
    //       </Form>
    //     </Col>
    //   </Row>
    // </Container>
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
                <input
                  type='file'
                  accept='.png,.jpg,.jpeg,.webp'
                  className='mgY10 text'
                  {...register('image', {
                    required: 'Image is required',
                  })}
                  aria-invalid={errors.image ? 'true' : 'false'}
                />
                {errors.image && <p className='red'>{errors.image?.message}</p>}
                <label className='label'>Category</label>
                <input
                  className='mgY10 text'
                  {...register('category', {
                    required: 'Categoryv is required',
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
                  Create Product
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

export default CreateProduct

// function convertToBase64(file) {
//   return new Promise((resolve, reject) => {
//     const fileReader = new FileReader()
//     fileReader.readAsDataURL(file)
//     fileReader.onload = () => {
//       resolve(fileReader.result)
//     }
//     fileReader.onerror = (error) => {
//       reject(error)
//     }
//   })
// }
