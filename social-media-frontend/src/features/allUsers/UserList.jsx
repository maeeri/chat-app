import { useSelector, useDispatch } from 'react-redux'
import { Button, Container, Image } from 'react-bootstrap'
import Loader from 'components/Loader'
import { Link } from 'react-router-dom'
import Filter from 'components/Filter'
import profilepic from 'media/img/profilepic.png'
import { addFriendRequest, acceptFriendRequest } from 'features/user/userSlice'
import { deleteUserFromDb, initializeAllUsers } from './allUsersSlice'

function UserList() {
  const allUsers = useSelector((state) => state.allUsers)
  const user = useSelector((state) => state.user)
  const searchTerm = useSelector((state) => state.searchTerm)
  const token = useSelector((state) => state.token)

  const dispatch = useDispatch()

  if (allUsers.length === 0) return <Loader />

  const usersToShow = searchTerm
    ? allUsers
        .filter(
          (u) =>
            u.name.includes(searchTerm) ||
            u.username.includes(searchTerm) ||
            u.role.includes(searchTerm)
        )
        .sort((u) => u.role)
    : allUsers

  const sendFriendRequest = async (friendId) => {
    await dispatch(addFriendRequest(friendId, token))
    await dispatch(initializeAllUsers())
    window.location.reload()
  }

  const addToFriendList = async (friendId) => {
    await dispatch(acceptFriendRequest(friendId, token))
    await dispatch(initializeAllUsers())
    window.location.reload()
  }

  const deleteUser = async (userToBeDeleted) => {
    if (
      window.confirm(
        `Do you really want to delete ${userToBeDeleted.name} permanently?`
      )
    ) {
      await dispatch(deleteUserFromDb(userToBeDeleted.id, token))
      await dispatch(initializeAllUsers())
      window.location.reload()
    }
  }

  if (!user.id)
    return <div>sign up or sign in to see a list of other users</div>

  return (
    <Container>
      <Container className="user-list-header">
        <h1 className="box">Users</h1>
        <Filter />
      </Container>
      <table className="users-table box">
        <thead>
          <tr>
            <th className="img-td"></th>
            <th className="d-sm-none d-md-block">name</th>
            <th className="d-sm-none d-md-block">username</th>
            <th className="d-sm-none d-md-block">role</th>
          </tr>
        </thead>
        <tbody>
          {usersToShow.map((u) => {
            return (
              u.id && (
                <tr key={u.id}>
                  {u.id && u.id !== user.id && (
                    <>
                      <td className="img-td">
                        <Link className="table-link" to={`/profile/${u.id}`}>
                          <Image
                            className="list-img interactive"
                            src={
                              u.profilePicture ? u.profilePicture : profilepic
                            }
                            alt=""
                          />
                        </Link>
                      </td>
                      <td className="d-sm-none d-md-block">
                        <Link
                          className="table-link interactive"
                          to={`/profile/${u.id}`}
                        >
                          {u.name}
                        </Link>
                      </td>
                      <td className="d-sm-none d-md-block">{u.username}</td>
                      <td className="d-sm-none d-md-block">{u.role}</td>
                      <td>
                        {!user.friends.includes(u.id) && (
                          <>
                            {!u.pendingRequests.includes(user.id) &&
                              !user.pendingRequests.includes(u.id) && (
                                <Button
                                  className="friend-btn interactive"
                                  onClick={() => sendFriendRequest(u.id)}
                                >
                                  add friend
                                </Button>
                              )}
                            {u.pendingRequests.includes(user.id) && (
                              <>friend request sent</>
                            )}
                            {user.pendingRequests.includes(u.id) &&
                              !user.friends.includes(u.id) && (
                                <Button
                                  className="friend-btn interactive"
                                  onClick={() => addToFriendList(u.id)}
                                >
                                  accept friend request
                                </Button>
                              )}
                          </>
                        )}
                        {u.friends.includes(user.id) && <>friend 🥰</>}
                      </td>
                      <td>
                        {user.role === 'admin' && (
                          <Button onClick={() => deleteUser(u)}>
                            delete user
                          </Button>
                        )}
                      </td>
                    </>
                  )}
                </tr>
              )
            )
          })}
        </tbody>
      </table>
    </Container>
  )
}

export default UserList
