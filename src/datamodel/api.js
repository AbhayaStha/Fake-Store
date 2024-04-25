export const fetchCategories = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
  };
  
  export const fetchProductsByCategory = async (categoryId) => {
    const response = await fetch(`https://fakestoreapi.com/products/category/${categoryId}`);
    const data = await response.json();
    return data;
  };
  