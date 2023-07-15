// DefaultLayout.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const DefaultLayout = ({ children }) => {
  const location = useLocation()
  return (
    <div>
      {location.pathname === "login" ? <Outlet /> : <div>
        <Sidebar />
        <div className='sm:ml-64 h-full'>
          {/* <header className='bg-gray-800 flex p-4 justify-between' >
            <div></div>
            <div className='flex text-white cursor-pointer font-semibold'>Signout</div>
          </header> */}
          <div className='m-4'>
            <Outlet />
          </div>
        </div>
      </div>}

    </div>
  );
};

export default DefaultLayout;
