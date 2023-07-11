import React, { useState, useEffect } from 'react'
import { getAllOrders,getOrdersDataForBarChart } from '../apis/api'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';


function Orders() {
  const navigate = useNavigate()
  const [allOrders, setAllOrders] = useState([])
  useEffect(() => {
    getAllOrders().then(res => setAllOrders(res))
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
        <Column field="customerName" header="Customer Name"></Column>
        <Column field="restaurantName" header="Restaurent Name"></Column>
        <Column field="deliveryAddress" header="Delivery Address"></Column>
        <Column field="status" header="Delivery Status"></Column>
        <Column field="paymentStatus" header="Payment Status"></Column>
        <Column field="totalAmount" header="Total Amount"></Column>
        <Column field="paymentMethod" header="Payment Method"></Column>
      </DataTable>
    </div>
  )
}

export default Orders