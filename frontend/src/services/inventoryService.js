import axios from "axios";

const API_URL = "http://localhost:5000/api/inventory";

export const getAllProducts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addProduct = async (product) => {
  const res = await axios.post(API_URL, product);
  return res.data;
};

export const updateProduct = async (id, product) => {
  const res = await axios.put(`${API_URL}/${id}`, product);
  return res.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

// Function to generate image based on product category and color
export const generateProductImage = async (category, color) => {
  try {
    // Map colors to hex codes
    const colorMap = {
      red: 'FF0000',
      blue: '0000FF',
      green: '00FF00',
      yellow: 'FFFF00',
      black: '000000',
      white: 'FFFFFF',
      pink: 'FFC0CB',
      purple: '800080',
      orange: 'FFA500',
      brown: 'A52A2A',
      gray: '808080',
      grey: '808080'
    };
    
    const hexColor = colorMap[color.toLowerCase()] || '0000FF';
    
    // Create description based on category and color
    const description = `${category} textile in ${color}`;
    
    // Return a placeholder image URL
    return `https://via.placeholder.com/400x300/${hexColor}/FFFFFF?text=${encodeURIComponent(description)}`;
  } catch (error) {
    console.error('Error generating product image:', error);
    // Return a placeholder image on error
    return 'https://via.placeholder.com/400x300?text=Image+Generation+Failed';
  }
};
