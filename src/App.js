import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';
import { getAllPokemon, getPokemon } from './utils/pokemon'

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  // 最初からuseEffectでデータを取ろうとしているのでloadingの初期値はtrueでいい
  const [loading, setLoading] = useState(true)
  const [pokemonData, setPokemondata] = useState([])

  // 第2引数が[]なのでマウントされたら発火(コンポーネントが生成されて、レンダリングされた際)
  // つまり初回にレンダリングされた際に発火
  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデーターを取得
      let res = await getAllPokemon(initialURL);

      // 各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      // console.log(res.results)
      setLoading(false);
    };
    fetchPokemonData();
  }, [])

  const loadPokemon = async (data) => {
    // allの中には配列を入れる
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // このurlは1つ1つのポケモンの詳細なデータが入っているurl
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    // 取得したポケモンのデータを配列のstateに入れてあげる
    setPokemondata(_pokemonData);
  };

  console.log(pokemonData)


  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中・・・</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return (
                  <Card key={i} pokemon={pokemon} />
                )
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
