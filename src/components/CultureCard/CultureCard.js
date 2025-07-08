import React, { useEffect, useState } from 'react';
import styles from './CultureCard.module.css';

const decodeHtml = (text) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = text;
  return txt.value;
};

const generateImageFromText = (text) => {
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f8f8f8';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#333';
  ctx.font = 'bold 18px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

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

const CultureCard = ({ title, place, startDate, endDate, imageUrl, onClick }) => {
  const [fallbackImage, setFallbackImage] = useState('');
  const decodedTitle = decodeHtml(title);

  useEffect(() => {
    if (!imageUrl) {
      const generated = generateImageFromText(decodedTitle);
      setFallbackImage(generated);
    }
  }, [imageUrl, decodedTitle]);

  return (
    <div className={styles.card} onClick={onClick}>
      <img src={imageUrl || fallbackImage} alt={decodedTitle} />
      <h3>{decodedTitle}</h3>
      <p>{place}</p>
      <p>{startDate} ~ {endDate}</p>

      {/* 🔗 관련 콘텐츠 URL 생성 */}
      <a
        href={`https://www.google.com/search?q=${encodeURIComponent(decodedTitle)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#007aff', textDecoration: 'underline', marginTop: '8px', display: 'inline-block' }}
        onClick={(e) => e.stopPropagation()} // 링크 클릭 시 모달 방지
      >
        🔗 관련 콘텐츠 검색
      </a>
    </div>
  );
};

export default CultureCard;
