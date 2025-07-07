// src/App.js
import { useState } from 'react';
import { fetchCultureByArea } from './api/cultureApi';
import CultureCardList from './components/CultureCard/CultureCardList';
import PageTitle from './components/PageTitle/PageTitle';
import SearchBar from './components/SearchBar/SearchBar'
const App = () => {
  const [cultureItems, setCultureItems] = useState([]);

  const handleSearch = async ({ sigungu, keyword }) => {
    const result = await fetchCultureByArea({ sigungu, keyword });
    setCultureItems(result);
  };

  return (
    <div>
      <PageTitle>📍 우리동네 문화행사 한눈에 보기</PageTitle>
      <SearchBar onSearch={handleSearch} />
      <CultureCardList items={cultureItems} />
    </div>
  );
};

export default App;
