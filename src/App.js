
import './App.css';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import { ProductProvider } from './productContext';
import SignIn from './Pages/SignIn';
import Register from './Pages/Register';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { UserProvider } from './userContext';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import Cart from './Pages/Cart';
import Order from './Pages/Order';
function App() {
  const [uid,setUid] = useState('');
  return (
    <>
      <UserProvider uid={uid} setUid={setUid}>
        <ProductProvider uid={uid}>
          
            <Navbar />
            <Routes>
              <Route path='/' element = {<Home />} />
              <Route path='/sign-in' element = {<SignIn />} />
              <Route path='/sign-up' element = {<Register />} />
              <Route path={`/userCarts/${uid}/myCart`} element = {<Cart />} />
              <Route path={`/userOrders/${uid}/orders`} element = {<Order />} />
            </Routes>
            </ProductProvider>
        </UserProvider>

            
          
        
      
      
    </>
  );
}

export default App;
