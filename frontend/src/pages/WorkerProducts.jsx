import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const WorkerProducts = () => {
  const { workerId } = useParams(); // Get the workerId from the URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get_products_by_worker/${workerId}`);
        setProducts(response.data);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [workerId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="worker-products">
      <h1 className="text-xl font-semibold">Products Uploaded by Worker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length === 0 ? (
          <p>No products found for this worker.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card border p-4 rounded-lg">
              <h2 className="text-lg font-medium">{product.name}</h2>
              <p className="text-gray-600">Price: ${product.price}</p>
              <p className="text-gray-500">{product.description}</p>
              <div className="flex flex-wrap mt-2">
                {product.colors.map((color, index) => (
                  <div key={index} className="w-6 h-6 mr-2 mb-2 rounded-full" style={{ backgroundColor: color }} />
                ))}
              </div>
              <div className="mt-2">
                {product.image_urls.map((url, index) => (
                  <img key={index} src={url} alt={`Product image ${index + 1}`} className="w-24 h-24 object-cover rounded-lg mr-2" />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkerProducts;
