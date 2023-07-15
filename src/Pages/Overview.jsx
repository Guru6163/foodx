import React from 'react'
import OrderBarChart from '../components/Overview/OrdersBarChart'
import OrdersByRestaurant from '../components/Overview/OrdersByRestaurant'

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
        
      </div>
    </div>
  )
}

export default Overview