import { Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setSearch } from 'features/searchTerm/searchTermSlice'

const Filter = () => {
  const dispatch = useDispatch()

  const handleSearchTermChange = (query) => {
    dispatch(setSearch(query))
  }

  return (
    <Container style={{marginBottom: '2em'}}>
      <input
        placeholder="search"
        type="text"
        onChange={(event) => handleSearchTermChange(event.target.value)}
      />
    </Container>
  )
}

export default Filter
