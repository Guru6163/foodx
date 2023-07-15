import { doc, collection, getDocs, addDoc, serverTimestamp, updateDoc, getDoc, orderBy, query, } from "firebase/firestore";
import { db } from "../Firebase/config";
import { getUnixTime, startOfDay, subDays } from 'date-fns';
import { DataStore } from "aws-amplify";
import { Order,Restaurant } from "../models";



export const getAllUsers = async () => {

}
 


export const getOrdersDataForBarChart = async () => {
    const orders = await DataStore.query(Order);
  
    const barChartData = Array(10).fill(0);
  
    const today = new Date().setHours(0, 0, 0, 0);
    const tenDaysAgo = subDays(today, 9);
  
    orders.forEach((order) => {
      const createdAt = new Date(order.createdAt).setHours(0, 0, 0, 0);
      const daysAgo = Math.floor((today - createdAt) / (1000 * 60 * 60 * 24));
  
      if (daysAgo >= 0 && daysAgo < 10) {
        barChartData[daysAgo]++;
      }
    });
  
    const formattedBarChartData = barChartData.map((count, index) => {
      const currentDay = subDays(today, index);
      const formattedDate = new Date(currentDay).toISOString().split("T")[0];
      return { date: formattedDate, count };
    });
  
    const reversedBarChartData = formattedBarChartData.reverse();
  
    return reversedBarChartData;
  };


  export const getTotalOrdersByRestaurant = async () => {
    const orders = await DataStore.query(Order);
  
    const getRestaurantNameById = async (restaurantId) => {
      const restaurant = await DataStore.query(Restaurant, restaurantId);
      return restaurant.name; // Assuming the restaurant name property is named "name"
    };
  
    const ordersByRestaurant = {};
    await Promise.all(
      orders.map(async (order) => {
        const restaurantId = order.orderRestaurantId;
        const restaurantName = await getRestaurantNameById(restaurantId);
        if (!ordersByRestaurant[restaurantName]) {
          ordersByRestaurant[restaurantName] = 0;
        }
        ordersByRestaurant[restaurantName]++;
      })
    );
  
    const restaurantData = [];
    for (const [restaurantName, orderCount] of Object.entries(ordersByRestaurant)) {
      restaurantData.push({ restaurantName, orderCount });
    }
  
    return restaurantData;
  };




export const getDailyOrderTotalSales = async () => {
  const currentDate = new Date();
  const pastDates = [];
  const orderTotalSales = [];

  for (let i = 0; i < 10; i++) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - i);
    pastDates.unshift(date.toISOString().split('T')[0]);
    orderTotalSales.unshift(0);
  }

  const orders = await DataStore.query(Order);

  for (const order of orders) {
    const orderDate = new Date(order.createdAt);
    const index = pastDates.indexOf(orderDate.toISOString().split('T')[0]);
    if (index !== -1) {
      orderTotalSales[index] += order.total;
    }
  }

  const chartData = pastDates.map((date, index) => ({
    date,
    totalSales: orderTotalSales[index],
  }));

  return chartData;
};

  

  

  
  
  

  
  
  
  
  
  
  







export const getAllOrders = async () => {

}

export const createOrder = async (order) => {

};


export const getDocumentDetails = async (collectionName, documentId) => {

};
