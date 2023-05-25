import { ListGroup, Image, Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import profilepic from 'media/img/profilepic.png'

function FriendListItem(props) {
  const { friend, handleClick, buttonLabel } = props
  const user = useSelector((state) => state.user)
  const { id } = useParams()

  return (
    <ListGroup.Item>
      <div style={{ display: 'inline-block' }}>
        <Link className="link favourites" to={`/profile/${friend.id}`}>
          <Image
            className="list-img interactive friendlist-img"
            src={friend.profilePicture ? friend.profilePicture : profilepic}
            alt=""
          />
        </Link>
      </div>
      <div style={{ display: 'inline-block', margin: '5%' }}>{friend.name}</div>

      {user.id === id && (
        <Button
          onClick={() => handleClick(friend.id)}
          className="float-right interactive friend-btn"
        >
          {buttonLabel}
        </Button>
      )}
    </ListGroup.Item>
  )
}

export default FriendListItem
