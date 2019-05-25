function getPokemon(name) {
  return window
    .fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(res => {
      if (!res.ok) throw new Error("HTTP error");
      return res;
    })
    .then(res => res.json());
}

module.exports = { getPokemon };
