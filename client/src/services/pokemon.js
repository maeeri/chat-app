import Pokedex from 'pokedex-promise-v2'

const p = new Pokedex()

const getAll = async () => {
  return await p.getPokemonsList()
}

const getOne = async (name) => {
  const response = await p.getPokemonByName(name)
  return response
}

const pokemonService = {
  getAll,
  getOne,
}

export default pokemonService