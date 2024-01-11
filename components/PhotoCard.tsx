import React from 'react';
import styles from '../styles/PhotoCard.module.css';

interface PhotoCardProps {
  photo: any;
  onFavoriteClick: (photoId: string) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onFavoriteClick }) => {

  const handleFavoriteClick = () => {
    console.log('Clicked on favorite button for photo:', photo.urls.small);
    onFavoriteClick(photo);
  };

  return (
    <div className={styles['photo-card']}>
      <img src={photo.urls?.small} alt={photo.alt} />
      <button onClick={handleFavoriteClick}>Add to Favorites</button>
    </div>
  );
};

export default PhotoCard;