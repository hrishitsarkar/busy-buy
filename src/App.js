
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
function App() {
  const [uid,setUid] = useState('');
  return (
    <>
      
        <ProductProvider>
          <UserProvider uid={uid} setUid={setUid}>
            <Navbar />
            <Routes>
              <Route path='/' element = {<Home />} />
              <Route path='/sign-in' element = {<SignIn />} />
              <Route path='/sign-up' element = {<Register />} />
              <Route path={`/userCarts/${uid}/myCart`} element = {<Cart />} />
              
            </Routes>

            
          </UserProvider>
        </ProductProvider>
      
      
    </>
  );
}

export default App;
