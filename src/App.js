import './App.css';
import React from 'react';
import PageTitle from './components/PageTitle';
import AnimalForm from './components/AnimalForm';
import Favorits from './components/Favorits';
import MainCard from './components/MainCard';

const OPEN_API_DOMAIN = 'https://cataas.com';

const jsonLocalStorage = {
  setItem: (key, value) => {
    // console.log('localStorage.setItem() 실행');

    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    // console.log('localStorage.getItem() 실행');
    return JSON.parse(localStorage.getItem(key));
  },
};

// Open API 
const fetchCat = async (text) => {

  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();

  return responseJson.url
};


const App = () => {
  console.log('** App 실행 **');

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

  async function updateMainAnimal() {
    const newCat = await fetchCat();
    console.log('[updateMainAnimal] newCat >>', newCat);
    setMainAnimal(newCat);

    incrementCount();
  }

  function handleHeart() {
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
