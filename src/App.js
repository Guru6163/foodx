import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import DefaultLayout from './Layout/DefaultLayout';
import Overview from './Pages/Overview';
import Orders from "./Pages/Orders"
import RestaurentPartners from "./Pages/RestaurentPartners"
import RestaurantForm from './components/RestaurentForm';
import UserManagement from './Pages/UserManagement';
import Login from './Pages/Login';
import UserForm from './components/UserForm';
import Customers from './Pages/Customers';
import CustomerForm from './components/CustomerForm';
import OrderForm from './components/OrderForm';
import { useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import awsconfig from "../src/aws-exports"
import '@aws-amplify/ui-react/styles.css';
import MapZone from './Pages/MapZone';

function App() {
  Amplify.configure(awsconfig);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userAttributes"));
    setUser(user);
  }, []);

  return (
    <div className='bg-bgray-400'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/overview' />} />
          <Route path='/login' element={<Login />} />
          <Route element={<DefaultLayout />}>
            <Route path='/overview' element={<Overview />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/orders/new' element={<OrderForm />} />
            <Route path='/restuarent-partners' element={<RestaurentPartners />} />
            <Route path='/restuarent-partners/new' element={<RestaurantForm />} />
            <Route path='/restuarent-partners/:id' element={<RestaurantForm />} />
            <Route path='/user-management' element={<UserManagement />} />
            <Route path='/user-management/new' element={<UserForm />} />
            <Route path='/customers' element={<Customers />} />
            <Route path='/create-account' element={<CustomerForm />} />
            <Route path='/map-zone' element={<MapZone />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
