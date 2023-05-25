import { ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { removeConnection } from './userSlice'
import FriendListItem from './FriendListItem'

function FriendsList({ friends }) {
  const token = useSelector((state) => state.token)
  const dispatch = useDispatch()

  const unfriend = (friendId) => {
    dispatch(removeConnection(friendId, token))
    window.location.reload()
  }

  return (
    <ListGroup className="list-profilepage box">
      {friends.map((f) => (
        <FriendListItem key={f.id} handleClick={unfriend} friend={f} buttonLabel='unfriend' />
      ))}
    </ListGroup>
  )
}

export default FriendsList
