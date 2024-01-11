import React from 'react';
import styles from '../styles/Home.module.css';

interface FilterBarProps {
  categories: string[];
  onFilterChange: (category: string) => void;
  onSortByLikes: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ categories, onFilterChange, onSortByLikes }) => {
  const handleFilterClick = (category: string) => {
    onFilterChange(category);
  };

  return (
    <div className={styles['filter-bar']}>
      <div>
        {categories.map((category) => (
          <button key={category} onClick={() => handleFilterClick(category)}>
            {category}
          </button>
        ))}
      </div>
      <div>
        <span>Sort by:</span>
        <button onClick={onSortByLikes}>Likes</button>
      </div>
    </div>
  );
};

export default FilterBar;