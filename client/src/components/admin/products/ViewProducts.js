import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../../utility/Loader"
import Message from "../../../utility/Message"
import { listProducts } from "../../../actions/productActions"
import { Table } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
// import Rating from "../../../utility/Rating"

const ViewProducts = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, products, error } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  const deleteHandler = (id) => {
    // dispatch(deleteUser(id))
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" message={error} />
      ) : (
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <LinkContainer to={`edit/${product._id}`}>
                      <button type="button" className="btn btn-sm btn-outline-success">
                        Edit
                      </button>
                    </LinkContainer>
                    <button style={{ marginLeft: "10px" }} type="button" className="btn btn-outline-danger btn-sm" onClick={() => deleteHandler(product._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ViewProducts
