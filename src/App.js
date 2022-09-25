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
  const [nextURL, setNextURL] = useState("")
  const [prevURL, setPrevURL] = useState("")
  const [prevButton, setPrevButton] = useState(false)

  // 第2引数が[]なのでマウントされたら発火(コンポーネントが生成されて、レンダリングされた際)
  // つまり初回にレンダリングされた際に発火
  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデーター一覧を取得
      let res = await getAllPokemon(initialURL);

      // 各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      // console.log(res)
      setNextURL(res.next);
      setLoading(false);
    };
    fetchPokemonData();
  }, [])

  const loadPokemon = async (data) => {
    // allの中には配列を入れる
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // このurlは1つ1つのポケモンの詳細なデータ(わざとかタイプとか)が入っているurl
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    // 取得したポケモンのデータを配列のstateに入れてあげる
    setPokemondata(_pokemonData);
  };

  // console.log(pokemonData)

  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);

    // ここでawaitをつけることで非同期で早くなる？
    await loadPokemon(data.results);
    setLoading(false)
    // 次のurlを入れてあげることで次のポケモンを見ることができる
    setNextURL(data.next)

    // 次へボタンが押されたタイミングで前の20このデータのurlを入れてあげる
    setPrevURL(data.previous)

    setPrevButton(true)
  };

  const handlePrevPage = async () => {
    if (!prevURL) return
    setLoading(true);
    let data = await getAllPokemon(prevURL);
    console.log(data)

    // ここでawaitをつけることで非同期で早くなる？
    await loadPokemon(data.results);
    setLoading(false)
    // 次のurlを入れてあげることで次のポケモンを見ることができる
    setPrevURL(data.previous)
    // 一番最初のページに戻るときのみ戻るボタンを非表示にする
    if (!data.previous) {
      setPrevButton(false)
    }
  };



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
            <div className="btn">
              {prevButton ? (
                <button onClick={handlePrevPage}>前へ</button>
              ) : ""}
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
