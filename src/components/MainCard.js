const MainCard = ({ src, alt, handleHeart, choiceFavorite }) => {
  const heartIcon = choiceFavorite ? '🤍' : '💗';
  
  return (
    <div className="main-card">
      <img src={src}  alt={alt} className="main-image"/>
      <button onClick={handleHeart}>{heartIcon}</button>
    </div>
  );
}

export default MainCard;