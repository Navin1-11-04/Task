import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletedProduct,SetDeletedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://task-d5dy.onrender.com/get_products');
        setProducts(response.data);
      } catch (err) {
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  useEffect(()=>{
    const deleteProduct = await axios.post(''https://task-d5dy.onrender.com/delete_product/${product_id}');
    SetDeletedProducts((items)=> items.filter(item.id === deleteProduct));
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="product-list overflow-y-auto h-full w-full">
      <h1 className="text-lg font-semibold my-4 uppercase">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white border rounded-lg p-4 relative">
             <div className="w-auto absolute bg-red-500 rounded-full py-1 px-3 text-white text-sm">
              delete
            </div>
            <h2 className="text-lg font-semibold uppercase">{product.name}</h2>
            <p className="text-gray-700 text-base font-medium">Price: ${product.price}</p>
            <p className="text-gray-600 text-base font-medium">{product.description}</p>
            <div className="flex flex-wrap mt-2 items-center justify-start h-8">
            colors : 
              {product.colors && product.colors.map((color, index) => (
                <div key={index} className="w-5 h-5 rounded-full mx-2" style={{ backgroundColor: color }}></div>
              ))}
            </div>
            <div className="my-2 h-[200px] md:h-[300px] overflow-hidden rounded-lg">
              {product.image_urls && product.image_urls.map((url, index) => (
                <img key={index} src={url} alt={`Product ${index + 1}`} className="w-full h-full rounded-lg mt-2 object-cover object-center" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
