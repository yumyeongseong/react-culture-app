// src/components/CultureCard/CultureCard.js
import React, { useEffect, useState } from 'react';
import styles from './CultureCard.module.css';

// 특수문자 디코딩 함수
const decodeHtml = (text) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = text;
  return txt.value;
};

// 텍스트로 이미지 생성
const generateImageFromText = (text) => {
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');

  // 배경
  ctx.fillStyle = '#f8f8f8';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 텍스트 스타일
  ctx.fillStyle = '#333';
  ctx.font = 'bold 18px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // 텍스트 줄바꿈 처리
  const lines = [];
  const maxLength = 15;
  for (let i = 0; i < text.length; i += maxLength) {
    lines.push(text.slice(i, i + maxLength));
  }

  lines.forEach((line, i) => {
    ctx.fillText(line, canvas.width / 2, canvas.height / 2 + (i - 0.5) * 24);
  });

  return canvas.toDataURL();
};

const CultureCard = ({ title, place, startDate, endDate, imageUrl }) => {
  const [fallbackImage, setFallbackImage] = useState('');
  const decodedTitle = decodeHtml(title);

  useEffect(() => {
    if (!imageUrl) {
      const generated = generateImageFromText(decodedTitle);
      setFallbackImage(generated);
    }
  }, [imageUrl, decodedTitle]);

  return (
    <div className={styles.card}>
      <img src={imageUrl || fallbackImage} alt="행사 이미지" />
      <h3>{decodedTitle}</h3>
      <p>{place}</p>
      <p>{startDate} ~ {endDate}</p>
    </div>
  );
};

export default CultureCard;
