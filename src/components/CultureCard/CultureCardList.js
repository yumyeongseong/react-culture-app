// src/components/CultureCard/CultureCardList.js
import React, { useState } from 'react';
import CultureCard from './CultureCard';
import Modal from '../Modal/Modal';

const CultureCardList = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => setSelectedItem(null);

  if (!items || items.length === 0) return <p>문화행사가 없습니다.</p>;

  return (
    <div>
      {items.map((item, index) => (
        <div key={index} onClick={() => handleClick(item)}>
          <CultureCard
            title={item.title?.[0]}
            place={item.place?.[0]}
            startDate={item.startDate?.[0]}
            endDate={item.endDate?.[0]}
            imageUrl={item.mainImg?.[0]}
          />
        </div>
      ))}
      <Modal item={selectedItem} onClose={closeModal} />
    </div>
  );
};

export default CultureCardList;
