import { useState } from 'react';
import { fetchCultureByArea } from './api/cultureApi';
import CultureCardList from './components/CultureCard/CultureCardList';
import PageTitle from './components/PageTitle/PageTitle';
import SearchBar from './components/SearchBar/SearchBar';

// ✅ 시/도 명칭 축약 변환 함수
const convertSidoName = (fullName) => {
  const map = {
    '서울특별시': '서울',
    '부산광역시': '부산',
    '대구광역시': '대구',
    '인천광역시': '인천',
    '광주광역시': '광주',
    '대전광역시': '대전',
    '울산광역시': '울산',
    '세종특별자치시': '세종',
    '경기도': '경기',
    '강원특별자치도': '강원',
    '충청북도': '충북',
    '충청남도': '충남',
    '전라북도': '전북',
    '전라남도': '전남',
    '경상북도': '경북',
    '경상남도': '경남',
    '제주특별자치도': '제주',
  };
  return map[fullName] || fullName;
};

const App = () => {
  const [cultureItems, setCultureItems] = useState([]);

  const handleSearch = async ({ sigungu, keyword }) => {
    const apiKeyword = keyword === '전체' ? '' : keyword;
    console.log('[🔍 검색 요청]', { sigungu, keyword, apiKeyword });

    const result = await fetchCultureByArea({ sigungu, keyword: apiKeyword });
    console.log('[📦 API 응답 결과]', result);
    console.log('[📦 응답 총 개수]', result.length);

    let filtered = result;

    // ✅ "전체 전체" 또는 "서울특별시 전체" 등일 경우 필터 없이 전체 출력
    const isAllArea = sigungu === '전체' || sigungu.endsWith('전체');

    if (!isAllArea) {
      const [fullSido, gugun] = sigungu.split(' ');
      const sido = convertSidoName(fullSido);

      filtered = result.filter(item => {
        const area = item.area?.[0] || '';
        const guname = item.guname?.[0] || '';
        const place = item.place?.[0] || '';
        const title = item.title?.[0] || '';
        const combinedText = `${area} ${guname} ${place} ${title}`;

        if (gugun === '전체') {
          return combinedText.includes(sido);
        } else {
          return combinedText.includes(sido) && combinedText.includes(gugun);
        }
      });
    }

    const sorted = filtered.sort((a, b) => {
      const aDate = a.startDate?.[0] || '';
      const bDate = b.startDate?.[0] || '';
      return bDate.localeCompare(aDate);
    });

    console.log('[✅ 최종 필터링 후]', sorted);
    console.log('[✅ 최종 출력 개수]', sorted.length);

    setCultureItems(sorted);
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
