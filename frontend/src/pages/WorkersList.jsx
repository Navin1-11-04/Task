import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WorkerList = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get('https://task-d5dy.onrender.com/get_workers');
        setWorkers(response.data);
      } catch (err) {
        setError('Error fetching workers');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, []);

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="worker-list w-full">
      <h1 className="text-lg font-semibold text-center mb-6 text-gray-800 uppercase">Worker List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {workers.map((worker) => (
          <div key={worker.id} className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-5">
            <h2 className="text-base font-semibold text-gray-800">{worker.name}</h2>
            <p className="text-gray-700">Email: <span className="font-medium text-sm">{worker.email}</span></p>
            <p className="text-gray-600">Role: <span className="font-medium text-sm">{worker.role}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkerList;
