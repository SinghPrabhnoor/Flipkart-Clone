import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const fetchWishlist = async () => {
    try {
      const { data } = await api.get('/wishlist');
      setWishlistItems(data);
    } catch (err) {
      console.error('Failed to fetch wishlist', err);
    }
  };

  useEffect(() => { fetchWishlist(); }, []);

  const isWishlisted = (productId) => wishlistItems.some(item => item.product_id === productId);

  const toggleWishlist = async (productId) => {
    if (isWishlisted(productId)) {
      try {
        await api.delete(`/wishlist/${productId}`);
        setWishlistItems(prev => prev.filter(i => i.product_id !== productId));
        toast.success('Removed from wishlist');
      } catch (err) {
        toast.error('Failed to remove from wishlist');
      }
    } else {
      try {
        const { data } = await api.post('/wishlist', { product_id: productId });
        setWishlistItems(prev => [...prev, data]);
        toast.success('Added to wishlist!');
      } catch (err) {
        toast.error('Failed to add to wishlist');
      }
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, isWishlisted, toggleWishlist, fetchWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
