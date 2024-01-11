import React, { useState, useEffect } from 'react';
import PhotoGrid from '../components/PhotoGrid';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import { fetchPhotos, fetchTopics } from '../services/unsplashApi';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';

const Home: React.FC = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('minimalism');
  const [categories, setCategories] = useState<string[]>([]);
  const [sortByLikesDesc, setSortByLikesDesc] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);

  const { isAuthenticated } = useAuth();
  const { favorites, addToFavorites, removeFromFavorites, setFavorites } = useFavorites();

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const data = await fetchTopics()
      const categoryList = data.map((category) => category.slug);
      setCategories(categoryList);
      setSelectedCategory(categoryList[0]);

    } catch (error) {
      console.error('Error fetching category:', error);
    }
  }

  useEffect(() => {
    fetchImages();
  }, [currentPage, selectedCategory]);

  const fetchImages = async () => {
    try {
      const data = await fetchPhotos(currentPage, selectedCategory);
      setPhotos(data);
      setTotalPages(10);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const handleFavoriteClick = (photoId: string) => {
    if (isAuthenticated) {
      if (favorites.includes(photoId)) {
        removeFromFavorites(photoId);
        console.log(`Removed photo ${photoId} from favorites`);
      } else {
        addToFavorites(photoId);
        console.log(`Added photo ${photoId} to favorites`);
      }
    } else {
      alert('Unauthorized')
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortByLikes = () => {
    const sortedPhotos = sortByLikesDesc
      ? [...photos].sort((a, b) => b.likes - a.likes)
      : [...photos].sort((a, b) => a.likes - b.likes);

    setPhotos(sortedPhotos);

    const updatedFavorites = favorites.map((favorite) => sortedPhotos.find((photo) => photo.id === favorite)).filter(Boolean);
    setFavorites(updatedFavorites);

    setSortByLikesDesc((prev) => !prev);

  };

  const handleToggleFavorites = () => {
    setShowFavorites((prev) => !prev);
  };

  const handleDeleteFav = () => {
    localStorage.removeItem('favorites')
    setFavorites([])
  }

  return (
    <div className={styles.home}>
      <Header />
      <FilterBar categories={categories} onFilterChange={handleFilterChange} onSortByLikes={handleSortByLikes} />
      <button className={styles.favBtn} onClick={handleToggleFavorites}>
        {showFavorites ? 'Show All Photos' : 'Show Favorites'}
      </button>
      <button className={styles.delFavBtn} onClick={handleDeleteFav}>Delete Favorites</button>
      <PhotoGrid photos={showFavorites ? favorites : photos} onFavoriteClick={handleFavoriteClick} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default Home;