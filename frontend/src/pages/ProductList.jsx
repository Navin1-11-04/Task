import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get_products');
        setProducts(response.data);
      } catch (err) {
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="product-list">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white border rounded-lg p-4">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-700">Price: ${product.price}</p>
            <p className="text-gray-600">{product.description}</p>
            <div className="flex flex-wrap mt-2">
              {product.colors && product.colors.map((color, index) => (
                <div key={index} className="w-8 h-8 rounded-full mr-2" style={{ backgroundColor: color }}></div>
              ))}
            </div>
            <div className="mt-2">
              {product.image_urls && product.image_urls.map((url, index) => (
                <img key={index} src={url} alt={`Product ${index + 1}`} className="w-full h-auto rounded mt-2" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
