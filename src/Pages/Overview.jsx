import React from 'react'
import OrderBarChart from '../components/Overview/OrdersBarChart'
import OrdersByRestaurant from '../components/Overview/OrdersByRestaurant'
import Last10DaySalesChart from '../components/Overview/Last10DaySalesChart'

function Overview() {
  return (
    <div>
      <div className='my-5'>
        <div className='text-2xl font-bold'>
          Order Analaysis
        </div>
      </div>
      <div className='grid grid-cols-2 gap-10'>
        <OrderBarChart />
        <OrdersByRestaurant/>
        <Last10DaySalesChart/>
      </div>
    </div>
  )
}

export default Overview