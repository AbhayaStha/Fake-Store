const baseUrl = "https://fakestoreapi.com/";

export const fetchProducts = async () => {
  try {
    const url = baseUrl + `products/categories`;
    const res = await fetch(url);
    const data = await res.json();
    console.log('All good');
    return data;
  } catch (error) {
    console.error('Fetch categories error:', error);
    throw error;
  }
};

export const fetchProductsByCategory = async (categoryId) => {
  try{
    let response = await fetch(`https://fakestoreapi.com/products/category/${categoryId}`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch products category error:', error);
    throw error;
  }
};


