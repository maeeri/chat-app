import { Container, ListGroup, Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { acceptFriendRequest } from './userSlice'
import profilepic from 'media/img/profilepic.png'
import { initializeAllUsers } from 'features/allUsers/allUsersSlice'

function PendingFriendsList({ friends }) {
  const token = useSelector((state) => state.token)
  const dispatch = useDispatch()

  const acceptRequest = async (friendId) => {
    await dispatch(acceptFriendRequest(friendId, token))
    await dispatch(initializeAllUsers())
    window.alert('friend request accepted')
    window.location.reload()
  }

  return (
    <Container>
      <ListGroup>
        {friends.map((f) => {
          return (
            <ListGroup.Item key={f.id}>
              <Link to={`/profile/${f.id}`}>
                <Image
                  className="list-img interactive friendlist-img"
                  src={f.profilePicture ? f.profilePicture : profilepic}
                  alt=""
                />
              </Link>
              {f.name}
              <Button
                onClick={() => acceptRequest(f.id)}
                className="float-right"
              >
                accept request
              </Button>
            </ListGroup.Item>
          )
        })}
      </ListGroup>
    </Container>
  )
}

export default PendingFriendsList
