import { useState, useEffect } from "react";
import Card from "./components/Card";
import ScoreBoard from "./components/ScoreBoard";
import ResetButton from "./components/ResetButton";
import NameInput from "./components/NameInput";
import HighScoreDisplay from "./components/HighScoreDisplay";
import "./components/css/App.css";

type Pokemon = {
  name: string;
  image: string;
};

const App = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [playerName, setPlayerName] = useState<string>("");
  const [highScore, setHighScore] = useState<number>(0);
  const [highScoreName, setHighScoreName] = useState<string>("");

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12");
      const data = await response.json();
      const results = await Promise.all(
        data.results.map(async (pokemon: { name: string; url: string }) => {
          const pokemonResponse = await fetch(pokemon.url);
          const pokemonDetails = await pokemonResponse.json();
          return {
            name: pokemon.name,
            image: pokemonDetails.sprites.front_default,
          };
        })
      );
      setPokemons(shufflePokemons(results));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const shufflePokemons = (pokemons: Pokemon[]) => {
    const shuffledPokemons = [...pokemons];
    for (let i = shuffledPokemons.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPokemons[i], shuffledPokemons[j]] = [
        shuffledPokemons[j],
        shuffledPokemons[i],
      ];
    }
    return shuffledPokemons;
  };

  const [lastClickedPokemon, setLastClickedPokemon] = useState<string>("");

  const handlePokemonClick = (pokemonName: string) => {
    if (pokemonName === lastClickedPokemon) {
      setScore(0);
    } else {
      setScore(score + 1);
    }
    setLastClickedPokemon(pokemonName);
    setPokemons(shufflePokemons([...pokemons]));
  };

  const handleReset = () => {
    setScore(0);
    setPlayerName("");
    setHighScore(0);
    setHighScoreName("");
    setPokemons(shufflePokemons(pokemons));
  };

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      setHighScoreName(playerName);
    }
  }, [score, playerName]);

  if (loading) {
    return <div>Loading Pokemon Memory Game</div>;
  }

  return (
    <div className="app">
      <h1 className="Pokemon-Title">ポケモン</h1>
      <div className="score-container">
        <div className="name-wrapper">
          <NameInput playerName={playerName} setPlayerName={setPlayerName} />
        </div>
        <ScoreBoard score={score} />
        <div className="highscore-wrapper">
          <HighScoreDisplay
            highScore={highScore}
            highScoreName={highScoreName}
          />
        </div>
      </div>
      <div className="pokemon-grid">
        {pokemons.map((pokemon, index) => (
          <Card
            key={index}
            name={pokemon.name}
            image={pokemon.image}
            onClick={() => handlePokemonClick(pokemon.name)}
          />
        ))}
      </div>

      <ResetButton resetGame={handleReset} />
    </div>
  );
};

export default App;
