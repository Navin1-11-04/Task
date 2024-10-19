import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CreateAccount from './pages/CreateAccount';
// import WorkerLogin from './pages/WorkerLogin';
// import Navbar from './components/Navbar';
import ProductPage from './pages/ProductPage';
function App() {
  return (
    // <Router>
    //   {/* <Navbar/> */}
    //   <div className="App w-full h-[calc(100vh_-_70px)] mt-[70px]">
    //     <Routes>
    //       {/* <Route path="/signup" element={<CreateAccount />} />
    //       <Route path="/" element={<WorkerLogin />} /> */}
    //       <Route path="/" element={<ProductPage/>}/>
    //     </Routes>
    //   </div>
    // </Router>
    <>
    {/* <ProductPage/> */}
    <CreateAccount/>
    </>
  );
}

export default App;
