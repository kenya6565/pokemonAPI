import { useEffect, useState } from 'react';
import './App.css';
import {getAllPokemon} from './utils/pokemon'

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
      console.log(res)
      setLoading(false);
    };
    fetchPokemonData();
  }, [])
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
