import React from 'react';
import PhotoCard from './PhotoCard';
import styles from '../styles/Home.module.css';

interface PhotoGridProps {
  photos: any[];
  onFavoriteClick: (photoId: string) => void;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, onFavoriteClick }) => {
  return (
    <div className={styles['photo-grid']}>
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} onFavoriteClick={onFavoriteClick} />
      ))}
    </div>
  );
};

export default PhotoGrid;