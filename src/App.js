import logo from './logo.svg';
import './App.css';
import React from 'react';

const jsonLocalStorage = {
  setItem: (key, value) => {
    console.log('localStorage.setItem() 실행');

    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    console.log('localStorage.getItem() 실행');
    return JSON.parse(localStorage.getItem(key));
  },
};


const PageTitle = props => <h1> {props.children} </h1>;

const AnimalForm = ({ updateMainAnimal }) => {

  const [value, setValue] = React.useState('')
  const [errorMessage, setErrorMessage] = React.useState('')

  const hangul = (text) => /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(text);

  function handleInputChange(data) {
    const userValue = data.target.value;
    setValue(userValue.toUpperCase());

    if (hangul(userValue)) {
      setErrorMessage('한글은 입력할 수 없습니다.')
    } else {
      setErrorMessage('');
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (value === '') {
      setErrorMessage('빈 값은 추가할 수 없습니다.');
      return;
    }

    setErrorMessage('');
    updateMainAnimal()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="귀여운 동물을 입력하세요"
        onChange={handleInputChange}
        value={value}
      />
      <button type="submit">추가</button>
      <p style={{ color: 'red', backgroundColor: 'yellow' }} >{errorMessage}</p>
    </form>
  );
}

const MainCard = ({ src, alt, handleHeart, choiceFavorite }) => {
  const heartIcon = choiceFavorite ? '🤍' : '💗';

  return (
    <div
      className="main-card">
      <img src={src} alt={alt} width="400px" />
      <button onClick={handleHeart}>{heartIcon}</button>
    </div>
  );
}

const AnimalItem = ({ src, alt }) => (
  <li>
    <img src={src} alt={alt} />
  </li>
);

const Favorits = ({ favorits }) => {

  return (
    <ul className="favorits">
      {favorits.map((animal, index) => <AnimalItem src={animal} key={index} />)}
    </ul>
  );
}

const App = () => {
  console.log('** App 실행 **');

  const animal01 = 'img/bear.png';
  const animal02 = 'img/elephant.png';
  const animal03 = 'img/fox.png';
  const animal04 = 'img/rabbit.png';

  const [mainAnimal, setMainAnimal] = React.useState(animal01)

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

  function updateMainAnimal() {
    setMainAnimal(animal04);

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
      <PageTitle>{count} 페이지</PageTitle>
      <AnimalForm updateMainAnimal={updateMainAnimal} />
      <MainCard handleHeart={handleHeart} src={mainAnimal} alt="baby bear" choiceFavorite={choiceFavorite} />
      <Favorits favorits={favorits} />
    </div>
  );
}

export default App;
