import { Container, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { acceptFriendRequest } from './userSlice'
import { initializeAllUsers } from 'features/allUsers/allUsersSlice'
import FriendListItem from './FriendListItem'

function PendingFriendsList({ friends }) {
  const token = useSelector((state) => state.token)
  const dispatch = useDispatch()

  const acceptRequest = async (friendId) => {
    console.log(friendId)
    await dispatch(acceptFriendRequest(friendId, token))
    await dispatch(initializeAllUsers())
    window.alert('friend request accepted')
    window.location.reload()
  }

  return (
    <Container>
      <ListGroup>
        {friends.map((f) => 
          <FriendListItem key={f.id} handleClick={acceptRequest} friend={f} buttonLabel='accept request' />
          )}
      </ListGroup>
    </Container>
  )
}

export default PendingFriendsList
