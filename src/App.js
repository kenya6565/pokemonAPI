import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon'

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  // 最初からuseEffectでデータを取ろうとしているのでloadingの初期値はtrueでいい
  const [loading, setLoading] = useState(true)

  // 第2引数が[]なのでマウントされたら発火(コンポーネントが生成されて、レンダリングされた際)
  // つまり初回にレンダリングされた際に発火
  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデーターを取得
      let res = await getAllPokemon(initialURL);

      // 各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      console.log(res.results)
      setLoading(false);
    };
    fetchPokemonData();
  }, [])

  const loadPokemon = (data) => {
    let _pokemonData = Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
  };


  return (
    <div className="App">
      {loading ? (
        <h1>ロード中・・・</h1>
      ) : (
        <>
          <h1>ポケモンデータを取得しました</h1>
        </>
      )}
    </div>
  );
}

export default App;
