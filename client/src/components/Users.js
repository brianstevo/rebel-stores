import React, { useEffect } from "react"
import { Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../utility/Loader"
import Message from "../utility/Message"
import { fetchUsers, deleteUser } from "../actions/userActions"
import { useNavigate } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"

const Users = () => {
  let navigate = useNavigate()

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const userList = useSelector((state) => state.userList)
  const { loading, users, error } = userList
  const userDelete = useSelector((state) => state.userDelete)
  const { success } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(fetchUsers())
    } else {
      navigate("/login")
    }
  }, [dispatch, navigate, userInfo, success])

  const deleteHandler = (id) => {
    dispatch(deleteUser(id))
  }
  return (
    <>
      <h1>Users</h1>
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
              <th>Email</th>
              <th>Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "Y" : "N"}</td>
                  <td>
                    <LinkContainer to={`/admin/users/${user._id}/edit`}>
                      <button type="button" className="btn btn-sm btn-outline-success">
                        Edit
                      </button>
                    </LinkContainer>
                    <button style={{ marginLeft: "10px" }} type="button" className="btn btn-outline-danger btn-sm" onClick={() => deleteHandler(user._id)}>
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

export default Users
