import React, { useContext, useState } from 'react';
import Product from './Product';
import ProductList from './ProductList';
import CreateWorker from './CreateWorker';
import WorkerList from './WorkersList';
import WorkerProducts from './WorkerProducts';
import UserContext from './UserContext';
import Navbar from '../components/Navbar';
const Content = () => {
  const [activeTab, setActiveTab] = useState('add');
  const { userRole } = useContext(UserContext);

  const tabs = [
    { label: 'New Product', value: 'add', component: <Product /> },
    ...(userRole === 'Owner'
      ? [
          { label: 'View Products', value: 'view', component: <ProductList /> },
          { label: 'Create Worker', value: 'create', component: <CreateWorker /> },
          { label: 'View Workers', value: 'workers', component: <WorkerList /> },
        ]
      : []),
    ...(userRole === 'Worker'
      ? [{ label: 'Worker Created Products', value: 'view-worker-products', component: <WorkerProducts /> }]
      : []),
  ];

  return (
    <>
    <Navbar/>
    <div className="w-full h-full flex flex-col">
      <div className="tabs w-full flex items-center justify-start gap-8 md:gap-10 overflow-x-auto h-[50px] px-5 sm:px-10 md:px-15 bg-gray-50">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`text-sm font-normal whitespace-nowrap text-neutral-800 ${activeTab === tab.value ? 'active underline underline-offset-[17px] decoration-2 text-violet-700' : ''}`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content w-full h-auto pt-5 px-5 sm:px-10 md:px-15">
        {tabs.find((tab) => tab.value === activeTab)?.component}
      </div>
    </div>
    </>
  );
};

export default Content;
