export const fetchProducts = async () => {
  try {
    let response = await fetch('https://fakestoreapi.com/products/categories');
    let data = await response.json();
    console.log('All good');
    return data;
  } catch (error) {
    console.error('Fetch products error:', error);
    throw error;
  }
};

  export const fetchProductsByCategory = async (categoryId) => {
    let response = await fetch(`https://fakestoreapi.com/products/category/${categoryId}`);
    let data = await response.json();
    return data;
  };
  