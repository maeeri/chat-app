import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { changeUserRole } from './userSlice'
import { getOneUser } from 'services/user'
import profilepic from 'media/img/profilepic.png'
import FriendsList from './FriendsList'
import PendingFriendsList from './PendingFriendsList'
import ChangeProfilePicture from './ChangeProfilePicture'

function ProfilePage() {
  const token = useSelector((state) => state.token)
  const state = useSelector((state) => state)
  const allUsers = useSelector((state) => state.allUsers)

  const { id } = useParams()
  const sameUser = id === state.user.id

  const [user, setUser] = useState({})

  const dispatch = useDispatch()

  useEffect(() => {
    initUser()
  }, [id, allUsers, state])

  const initUser = async () => {
    if (user.id !== id) {
      const u = await getOneUser(id)
      setUser(u)
    }
  }

  const friends =
    allUsers.length > 0 && user.friends
      ? allUsers.filter((u) => user.friends.includes(u.id))
      : []

  const pendingFriends =
    user.id === state.user.id &&
    allUsers.length > 0 &&
    user.pendingRequests &&
    user.pendingRequests.length > 0
      ? allUsers.filter((u) => user.pendingRequests.includes(u.id))
      : []

  const handleRoleChange = (role) => {
    const message = sameUser
      ? 'Are you sure you want to remove your admin rights? You might not be able to get them back.'
      : role === 'admin'
      ? `Are you sure you want to make ${user.username} admin?`
      : `Are you sure you want to remove ${user.username}'s admin rights?`

    const confirm = window.confirm(message)

    if (confirm) {
      dispatch(changeUserRole(user.id, role, token))
      window.location.reload()
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="box">{user.name}</h1>
          <h3>{user.role}</h3>
          {state.user.role === 'admin' && (
            <Container>
              {user.role === 'user' && (
                <Button
                  className="box interactive"
                  variant="dark"
                  onClick={() => handleRoleChange('admin')}
                >
                  make admin
                </Button>
              )}
              {user.role === 'admin' && (
                <Button
                  className="box interactive"
                  variant="dark"
                  onClick={() => handleRoleChange('user')}
                >
                  remove admin
                </Button>
              )}
            </Container>
          )}
        </Col>
        <Col>
          <Image
            id="profile-picture"
            className="float-right"
            src={user.profilePicture ? user.profilePicture : profilepic}
          />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col sm={{ span: 12 }} md={{ span: 6 }}>
          <h6>Friends</h6>
          {user.id === state.user.id && pendingFriends.length > 0 && (
            <PendingFriendsList friends={pendingFriends} />
          )}
          {friends.length > 0 && <FriendsList friends={friends} />}
        </Col>
        <Col>
          {sameUser && <ChangeProfilePicture user={user} setUser={setUser} />}
        </Col>
      </Row>
    </Container>
  )
}

export default ProfilePage
