export const fetchProducts = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    const data = await response.json();
    console.log('All good',data);
    return data;
  } catch (error) {
    console.error('Fetch products error:', error);
    throw error;
  }
};

  export const fetchProductsByCategory = async (categoryId) => {
    const response = await fetch(`https://fakestoreapi.com/products/category/${categoryId}`);
    const data = await response.json();
    return data;
  };
  