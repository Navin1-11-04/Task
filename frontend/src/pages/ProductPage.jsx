import React,{useState} from 'react';
import Product from './Product';

const ProductPage = () => {
    const [activeTab, setActiveTab] = useState('add');
  return (
    <div className="w-full h-full">
       <div className="tabs w-full flex items-start justify-start  gap-3 py-2 bg-gray-50 px-5 md:px-10">
        <button 
          className={`py-1.5 px-4 rounded-full text-sm font-normal ${activeTab === 'add' ? 'active bg-zinc-800 text-white' : ''}`} 
          onClick={() => setActiveTab('add')}
        >
        New Product
        </button>
        <button 
          className={`py-1.5 px-4 rounded-full text-sm font-normal ${activeTab === 'view' ? 'active bg-zinc-800 text-white' : ''}`} 
          onClick={() => setActiveTab('view')}
        >
        View Products
        </button>
      </div> 
      <div className="tab-content">
        {activeTab === 'add' && <Product />}
        {/* {activeTab === 'view' && <ProductList />} */}
      </div>
    </div>
  )
}

export default ProductPage;