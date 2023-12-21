import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Product from './components/Product';
import axios from 'axios';
import ProductDetails from './components/ProductDetails';
import SettingsProvider from './components/SettingsProvider';
import { CartProvider } from 'react-use-cart';
import Cart from './pages/Cart';
import { ToastContainer } from 'react-toastify';
import Registration from './pages/Registration';
import Login from './pages/Login';
import UserProvider from './components/UserProvider';
import CheckOut from './pages/CheckOut';
import Dashboard from './pages/user/Dashboard';
import Profile from './pages/user/Profile';
import Blogs from './pages/Blogs';
import AddAddress from './pages/user/AddAddress';
import AddressBook from './pages/user/AddressBook';
import OrderList from './pages/user/OrderList';
import OrderDetails from './pages/user/OrderDetails';


function App() {
  axios.defaults.baseURL="https://uol-v-2.hostprohub.com/api/";

  return (
      <>
      <ToastContainer />
       <CartProvider>
      <SettingsProvider>
      <UserProvider>
      <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path='/product' element={<Product/>}></Route>
      <Route exact path='/product/:slug' element={<ProductDetails/>}> </Route>
      <Route exact path='/cart' element={<Cart/>}> </Route>
      <Route exact path='/checkout' element={<CheckOut/>}></Route>
      <Route exact path='/sing-up' element={<Registration/>}> </Route> 
      <Route exact path='/Login' element={<Login/>}></Route>
      <Route exact path='/user/dashbord' element={<Dashboard/>}></Route>
      <Route exact path='/user/profile' element={<Profile/>}></Route>
      <Route exact path='/blogs' element={<Blogs/>}></Route>
      <Route exact path='/user/addresses' element={<AddressBook/>} ></Route>
      <Route exact path='/user/add-address' element={<AddAddress/>} ></Route>
      <Route exact path='/user/order-list' element={ <OrderList/> }></Route>
      <Route exact path='/user/order/order-details/:id' element={<OrderDetails/>}></Route>
      
    </Routes>
    </UserProvider>
    </SettingsProvider>
    </CartProvider>
      </>
    
   
  );
}

export default App;