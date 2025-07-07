// src/components/Modal/Modal.js
import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>X</button>
        <img src={item.mainImg?.[0] || 'https://via.placeholder.com/300'} alt="행사 이미지" />
        <h2>{item.title?.[0]}</h2>
        <p><strong>장소:</strong> {item.place?.[0]}</p>
        <p><strong>기간:</strong> {item.startDate?.[0]} ~ {item.endDate?.[0]}</p>
        {item.realmName?.[0] && <p><strong>분야:</strong> {item.realmName?.[0]}</p>}
        {item.contents?.[0] && <p>{item.contents[0]}</p>}
      </div>
    </div>
  );
};

export default Modal;
