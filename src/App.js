import React from 'react';
import PageTitle from './components/PageTitle/PageTitle';
import AnimalForm from './components/AnimalForm/AnimalForm';
import Favorits from './components/Favorites/Favorits';
import MainCard from './components/MainCard/MainCard';
import jsonLocalStorage from './utils/jsonLocalStorage';

const OPEN_API_DOMAIN = 'https://cataas.com';


// Open API 
const fetchCat = async (text) => {

  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?width=400&height=400&json=true`);
  const responseJson = await response.json();

  return responseJson.url
};


const App = () => {
  console.log('App 실행');
  
  const [mainAnimal, setMainAnimal] = React.useState(`${OPEN_API_DOMAIN}/cat`)

  const [favorits, setFavorits]
    = React.useState(() => {

      return jsonLocalStorage.getItem('favorits') || []; // 단축평가 OR
    })

  const [count, setCount]
    = React.useState(() => {
      return jsonLocalStorage.getItem('count') || 1;
    });

  const choiceFavorite = favorits.includes(mainAnimal);

  function incrementCount() {

    setCount((pre) => {

      const nextCount = pre + 1;
      localStorage.setItem('count', JSON.stringify(nextCount));
      return nextCount;
    });

  }

  async function updateMainAnimal(text) {
    const newCat = await fetchCat(text);
    setMainAnimal(newCat);

    incrementCount();
  }

  function handleHeart() {
    if (favorits.includes(mainAnimal)) {
      alert('이미 추가된 귀여운 고양이입니다. 🙀')
      return;
    }

    setFavorits((pre) => {
      const nextFavorits = [...pre, mainAnimal];
      localStorage.setItem('favorits', JSON.stringify(nextFavorits));
      return nextFavorits;

    });

  }
 

  return (
    <div>
      <PageTitle>🎁{count} 고양이 이미지🎠</PageTitle>
      <AnimalForm updateMainAnimal={updateMainAnimal} />
      <MainCard handleHeart={handleHeart} src={mainAnimal} alt="baby bear" choiceFavorite={choiceFavorite} />
      <Favorits favorits={favorits} />
    </div>
  );
}

export default App;
