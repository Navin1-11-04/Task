import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WorkerList = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get_workers');
        setWorkers(response.data);
      } catch (err) {
        setError('Error fetching workers');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="worker-list">
      <h1 className="text-2xl font-bold mb-4">Worker List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {workers.map((worker) => (
          <div key={worker.id} className="bg-white border rounded-lg p-4">
            <h2 className="text-xl font-semibold">{worker.name}</h2>
            <p className="text-gray-700">Email: {worker.email}</p>
            <p className="text-gray-600">Role: {worker.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkerList;
