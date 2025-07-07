// src/api/cultureApi.js
import { parseStringPromise } from 'xml2js';

export const fetchCultureByArea = async ({ sigungu, keyword }) => {
  const API_KEY = '%2FEyGV%2BeluSqzePTYsV2dZUNwS08XDLtBjhjVrv6LsXrVxGxczM9PkAqpUnxzg43bAHC4SLwadjoYfkC5bLM0pg%3D%3D';
  const BASE_URL = 'https://apis.data.go.kr/B553457/cultureinfo/area2';

  const url = `${BASE_URL}?serviceKey=${API_KEY}&numOfRows=10&pageNo=1&sigungu=${encodeURIComponent(sigungu)}&keyword=${encodeURIComponent(keyword)}`;

  const response = await fetch(url);
  const xml = await response.text();
  const json = await parseStringPromise(xml);

  const items = json.response.body?.[0].items?.[0].item || [];
  console.log('🎭 지역 기반 문화행사:', items);
  return items;
};
