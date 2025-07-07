// src/components/SearchBar/SearchBar.js
import React, { useState, useEffect } from 'react';
import styles from './SearchBar.module.css';
import regionData from '../../data/region.json'; // 경로 확인 필수

const KEYWORDS = [
  '불꽃축제', '꽃축제', '문화재', '전통공연', '야외전시',
  '콘서트', '무용', '연극', '국악', '클래식',
  '미술', '전시', '체험행사', '전통놀이', '지역축제','전체'
];

const SearchBar = ({ onSearch }) => {
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const [selectedSido, setSelectedSido] = useState('');
  const [selectedSigungu, setSelectedSigungu] = useState('');
  const [sigunguList, setSigunguList] = useState([]);

  // 시/도 선택 시 군/구 자동 로딩
  useEffect(() => {
    if (selectedSido && regionData[selectedSido]) {
      setSigunguList(regionData[selectedSido]);
    } else {
      setSigunguList([]);
    }
    setSelectedSigungu(''); // 군/구 초기화
  }, [selectedSido]);

  const handleSearch = () => {
    if (!selectedKeyword || !selectedSido || !selectedSigungu) {
      alert('모든 항목을 선택해주세요.');
      return;
    }
    const fullArea = `${selectedSido} ${selectedSigungu}`;
    onSearch({ sigungu: fullArea, keyword: selectedKeyword });
  };

  return (
    <div className={styles.searchBar}>
      <select onChange={(e) => setSelectedKeyword(e.target.value)} value={selectedKeyword}>
        <option value="" disabled>키워드 선택</option>
        {KEYWORDS.map(k => <option key={k} value={k}>{k}</option>)}
      </select>

      <select onChange={(e) => setSelectedSido(e.target.value)} value={selectedSido}>
        <option value="" disabled>시 선택</option>
        {Object.keys(regionData).map(sido => (
          <option key={sido} value={sido}>{sido}</option>
        ))}
      </select>

      <select onChange={(e) => setSelectedSigungu(e.target.value)} value={selectedSigungu}>
        <option value="" disabled>군/구 선택</option>
        {sigunguList.map(sigungu => (
          <option key={sigungu} value={sigungu}>{sigungu}</option>
        ))}
      </select>

      <button onClick={handleSearch}>검색</button>
    </div>
  );
};

export default SearchBar;
