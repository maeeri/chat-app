import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Col, Row, Container } from 'react-bootstrap'
import SignInPrompt from './SignInPrompt'

function HomePage() {
  const user = useSelector((state) => state.user)

  return (
    <Container>
      <Row>
        <h1 className="box heading">Welcome</h1>
      </Row>

      <Row>
        <Col sm={{ span: 12 }} lg={{ span: 6 }}>
          {user.id && (
            <span title="go to profile page">
              <Link className="link" to={`/profile/${user.id}`}>
                <h1 className="interactive box">profile</h1>
              </Link>
            </span>
          )}
          {!user.id && <SignInPrompt />}
        </Col>
        {user.id && (
          <Col sm={{ span: 12 }} lg={{ span: 6 }}>
            <span title="go to user list">
              <Link className="link" to="/users">
                <h1 className="interactive box">users</h1>
              </Link>
            </span>
          </Col>
        )}
      </Row>
      <Row className="">
        <Col className="box text card">
          This website is a practice project for React Redux, Node.js and Web
          Socket technology. Feel free to browse around and if you have any
          questions or suggestions, contact me through
          <a
            className="link"
            href="https://www.linkedin.com/in/mari-anne-eerik%C3%A4inen/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </Col>
      </Row>
      <Row></Row>
    </Container>
  )
}

export default HomePage
