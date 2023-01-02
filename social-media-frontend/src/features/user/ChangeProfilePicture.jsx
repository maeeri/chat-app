import Loader from 'components/Loader'
import { useEffect, useState } from 'react'
import { Container, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import pokemonService from 'services/pokemon'
import { addProfilePictureToState } from './userSlice'
import { getOneUser } from 'services/user'

export default function ChangeProfilePicture({ user, setUser }) {
  const token = useSelector((state) => state.token)
  const [pokemon, setPokemon] = useState([])
  const [images, setImages] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    if (pokemon.length === 0) initPokemon()
    if (pokemon.length > 0) initImages()
  }, [user])

  const initPokemon = async () => {
    const pok = await pokemonService.getAll()
    setPokemon(pok.results)
  }

  const getIndices = () => {
    const randomIndices = []

    for (let i = 0; i < 10; i++) {
      if (pokemon.length > 0)
        randomIndices.push(Math.floor(Math.random() * pokemon.length))
    }

    return randomIndices
  }

  const initImages = async () => {
    const indices = getIndices()

    const res = await Promise.all(
      indices.map(
        async (i) =>
          await (
            await pokemonService.getOne(pokemon[i].name)
          ).sprites.other['official-artwork'].front_default
      )
    )
    setImages(res)
  }

  const addProfilePicture = async (url) => {
    const choice = window.confirm(
      'Do you want to make this image your profile picture?'
    )
    if (choice) {
      dispatch(addProfilePictureToState(user.id, url, token))
      alert('profile picture changed')
      window.location.reload()
    }
  }

  if (!images || images.length === 0) return <Loader />

  return (
    <Container>
      <h4>change your profile picture</h4>
      {images.map((img) => (
        <span
          key={img}
          title="make this your profile picture"
          onClick={() => addProfilePicture(img)}
        >
          <Image className="list-img interactive" src={img} />
        </span>
      ))}
    </Container>
  )
}
