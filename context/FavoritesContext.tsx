import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface FavoritesContextProps {
    favorites: string[];
    addToFavorites: (photoId: string) => void;
    removeFromFavorites: (photoId: string) => void;
    setFavorites: (newFavorites: string[]) => void;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

interface FavoritesProviderProps {
    children: ReactNode;
}

const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    const addToFavorites = (photoId: string) => {
        const updatedFavorites = [...favorites, photoId];
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    const removeFromFavorites = (photoId: string) => {
        const updatedFavorites = favorites.filter((id) => id !== photoId);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, setFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};

const useFavorites = () => {
    const context = useContext(FavoritesContext);

    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }

    return context;
};

export { FavoritesProvider, useFavorites };
