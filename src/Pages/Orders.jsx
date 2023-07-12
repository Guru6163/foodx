import React, { useState, useEffect } from 'react'
import { getAllOrders,getOrdersDataForBarChart } from '../apis/api'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import { DataStore } from 'aws-amplify';
import { Order } from '../models';


function Orders() {
  const navigate = useNavigate()
  const [allOrders, setAllOrders] = useState([])


  async function getAllOrders() {
    const orders = await DataStore.query(Order)
    setAllOrders(orders);
  }

  useEffect(() => {
    getAllOrders()
    console.log(allOrders)
  },[])


  return (
    <div className='my-6'>
      <div className='flex items-center justify-between my-2'>
        <div className='text-2xl font-bold'>
          All Orders
        </div>
        <div onClick={()=>navigate("new")} className='p-2 w-1/5 text-center bg-blue-600 text-white cursor-pointer'>
          Create New Order
        </div>
      </div>
      <DataTable  value={allOrders} showGridlines tableStyle={{ minWidth: '50rem' }}>
        <Column field="id" header="Order ID"></Column>
        <Column field="orderRestaurantId" header="Restaurent Id"></Column>
        <Column field="status" header="Delivery Status"></Column>
        <Column field="razorpayPaymentId" header="Pazorpay Payment ID"></Column>
        <Column field="paymentMethod" header="Payment Method"></Column>
        <Column field="total" header="Total Amount"></Column>
        
      </DataTable>
    </div>
  )
}

export default Orders