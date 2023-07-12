import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import { DataStore } from 'aws-amplify';
import { User, Restaurant } from "./models"
import awsconfig from "../src/aws-exports"
import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';

function App() {
  Amplify.configure(awsconfig)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userAttributes"))
    setUser(user)

  },[])

  return (
    <div className='bg-bgray-400'>
      <BrowserRouter >
        <Routes>
          <Route path='/login' element={<Login />} > </Route>
          <Route element={<DefaultLayout />}>
            <Route path='/' element={<Overview />} ></Route>
            <Route path='/orders' element={<Orders />} ></Route>
            <Route path='/orders/new' element={<OrderForm />} ></Route>
            <Route path='/restuarent-partners' element={<RestaurentPartners />} ></Route>
            <Route path='/restuarent-partners/new' element={<RestaurantForm />}></Route>
            <Route path='/restuarent-partners/:id' element={<RestaurantForm />}></Route>
            <Route path='/user-management' element={<UserManagement />}></Route>
            <Route path='/user-management/new' element={<UserForm />}></Route>
            <Route path='/customers' element={<Customers />}></Route>
            <Route path='/create-account' element={<CustomerForm />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default (App);
