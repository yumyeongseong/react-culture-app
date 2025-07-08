import React, { useState, useEffect } from 'react';
import styles from './SearchBar.module.css';
import regionData from '../../Data/region.json';

const KEYWORDS = [
  '전체',
  '문화재', '전통공연',
  '야외전시', '콘서트', '무용', '연극', '국악',
  '클래식', '미술', '전시', '체험행사', '전통놀이', '지역축제',
  '인디공연', '북콘서트', '뮤지컬', '마임', '퍼포먼스',
  '디자인', '공예', '사진전', '문화기획', '야시장',
  '푸드페스티벌', '도서전', '가족극', '인형극', '소극장공연'
];


const SearchBar = ({ onSearch }) => {
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const [selectedSido, setSelectedSido] = useState('');
  const [selectedSigungu, setSelectedSigungu] = useState('');
  const [sigunguList, setSigunguList] = useState([]);

  useEffect(() => {
    if (selectedSido === '전체') {
      setSigunguList(['전체']);
      setSelectedSigungu('전체');
    } else if (selectedSido && regionData[selectedSido]) {
      const guList = regionData[selectedSido];
      setSigunguList(guList);
      setSelectedSigungu('');
    } else {
      setSigunguList([]);
      setSelectedSigungu('');
    }
  }, [selectedSido]);

  const handleSearch = () => {
    if (!selectedKeyword || !selectedSido || !selectedSigungu) {
      alert('모든 항목을 선택해주세요.');
      return;
    }

    const fullArea = selectedSido === '전체' ? '전체' : `${selectedSido} ${selectedSigungu}`;
    onSearch({
      sigungu: fullArea,
      keyword: selectedKeyword,
    });
  };

  return (
    <div className={styles.searchBar}>
      <select onChange={(e) => setSelectedKeyword(e.target.value)} value={selectedKeyword}>
        <option value="" disabled>키워드 선택</option>
        {KEYWORDS.map(k => <option key={k} value={k}>{k}</option>)}
      </select>

      <select onChange={(e) => setSelectedSido(e.target.value)} value={selectedSido}>
        <option value="" disabled>시 선택</option>
        <option value="전체">전체</option>
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
