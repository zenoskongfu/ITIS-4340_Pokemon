import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';
import InformationPanel from './components/InformationPanel';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemonList() {
      try {
        setLoading(true);
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151'); // Adjust limit as needed
        const data = await response.json();
        setPokemonList(data.results);
        setFilteredPokemonList(data.results); // Initially, no filtering is applied
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonList();
  }, []);

  useEffect(() => {
    const filtered = pokemonList.filter(pokemon => {
      const pokemonId = pokemon.url.split('/').filter(Boolean).pop(); // Extract ID from URL
      return pokemon.name.includes(searchQuery.toLowerCase()) || pokemonId.includes(searchQuery);
    });

    setFilteredPokemonList(filtered);
  }, [searchQuery, pokemonList]);

  return (
    <div className="App" style={{ backgroundColor: '#d2f2fa' }}>
      <div className="flex">
        <div className="w-2/3">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PokemonList pokemonList={filteredPokemonList} />
          )}
        </div>
        <div className="w-1/3">
          <InformationPanel />
        </div>
      </div>
    </div>
  );
}

export default App;
