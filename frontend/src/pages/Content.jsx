import React, { useContext, useState } from 'react';
// import Product from './Product';
import ProductList from './ProductList';
import CreateWorker from './CreateWorker';
import WorkerList from './WorkersList';
import WorkerProducts from './WorkerProducts'; // Import the WorkerProducts component
import UserContext from './UserContext';

const Content = () => {
  const [activeTab, setActiveTab] = useState('add');
  const { userRole, userId } = useContext(UserContext); // Access userRole and userId from context

  return (
    <div className="w-full h-full">
      <div className="tabs w-full flex items-center justify-start gap-3 py-2 bg-gray-50 px-5 md:px-10 overflow-x-auto">
        {/* Both Worker and Owner see New Product */}
        <button
          className={`py-1.5 px-4 rounded-full text-sm font-normal whitespace-nowrap ${activeTab === 'add' ? 'active bg-zinc-800 text-white' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          New Product
        </button>

        {/* Owner-only tabs */}
        {userRole === 'Owner' && (
          <>
            <button
              className={`py-1.5 px-4 rounded-full text-sm font-normal whitespace-nowrap ${activeTab === 'view' ? 'active bg-zinc-800 text-white' : ''}`}
              onClick={() => setActiveTab('view')}
            >
              View Products
            </button>
            <button
              className={`py-1.5 px-4 rounded-full text-sm font-normal whitespace-nowrap ${activeTab === 'create' ? 'active bg-zinc-800 text-white' : ''}`}
              onClick={() => setActiveTab('create')}
            >
              Create Worker
            </button>
            <button
              className={`py-1.5 px-4 rounded-full text-sm font-normal whitespace-nowrap ${activeTab === 'workers' ? 'active bg-zinc-800 text-white' : ''}`}
              onClick={() => setActiveTab('workers')}
            >
              View Workers
            </button>
          </>
        )}

        {/* Worker-only tab */}
        {userRole === 'Worker' && (
          <button
            className={`py-1.5 px-4 rounded-full text-sm font-normal whitespace-nowrap ${activeTab === 'view-worker-products' ? 'active bg-zinc-800 text-white' : ''}`}
            onClick={() => setActiveTab('view-worker-products')}
          >
            Worker Created Products
          </button>
        )}
      </div>

      <div className="tab-content">
        {/* {activeTab === 'add' && <Product />} */}
        {activeTab === 'view' && <ProductList />}
        {activeTab === 'create' && <CreateWorker />}
        {activeTab === 'workers' && <WorkerList />}
        {activeTab === 'view-worker-products' && <WorkerProducts workerId={userId} />} {/* Pass userId to WorkerProducts */}
      </div>
    </div>
  );
};

export default Content;
