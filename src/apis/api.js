import { doc, collection, getDocs, addDoc, serverTimestamp, updateDoc, getDoc, orderBy, query, } from "firebase/firestore";
import { db } from "../Firebase/config";
import { getUnixTime, startOfDay, subDays } from 'date-fns';




export const getAllUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "customers"));
    const users = []
    querySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id })
    });
    return users
}

export const getAllRestaurants = async () => {
    const querySnapshot = await getDocs(collection(db, "restaurants"));
    const restaurants = []
    querySnapshot.forEach((doc) => {
        restaurants.push({ ...doc.data(), id: doc.id })
    });
    return restaurants
}

export const getOrdersDataForBarChart = async () => {
    // Create a query to get the orders collection sorted by 'createdAt' in descending order
    const ordersQuery = query(collection(db, "orders"), orderBy("createdAt", "desc"));

    const querySnapshot = await getDocs(ordersQuery);
    const orders = [];
    querySnapshot.forEach((doc) => {
        orders.push({ ...doc.data(), id: doc.id });
    });

    // Calculate the Orders data for each day
    const ordersByDay = {};
    orders.forEach((order) => {
        const createdAt = order.createdAt.toMillis(); // Convert the Firestore timestamp to milliseconds
        const day = getUnixTime(startOfDay(new Date(createdAt))); // Get the start of the day in Unix timestamp
        if (!ordersByDay[day]) {
            ordersByDay[day] = 0;
        }
        ordersByDay[day]++;
    });

    // Format the data for the Bar Chart
    const barChartData = [];
    const today = getUnixTime(startOfDay(new Date())); // Get the start of the current day in Unix timestamp

    // Loop through the last 9 days (excluding today)
    for (let i = 1; i <= 9; i++) {
        const currentDay = subDays(today, i); // Subtract 'i' days from the current day
        const count = ordersByDay[currentDay] || 0; // Get the count for the current day or set it to 0 if not available
        const date = new Date(currentDay * 1000); // Convert Unix timestamp back to Date object
        const formattedDate = date.toISOString().split("T")[0]; // Get the date in YYYY-MM-DD format
        barChartData.push({ date: formattedDate, count });
    }

    // Add today's data separately
    const todayCount = ordersByDay[today] || 0;
    const todayDate = new Date(today * 1000);
    const todayFormattedDate = todayDate.toISOString().split("T")[0];
    barChartData.push({ date: todayFormattedDate, count: todayCount });

    return barChartData;
};







export const getAllOrders = async () => {
    // Create a query to get the orders collection sorted by 'createdAt' in descending order
    const ordersQuery = query(collection(db, "orders"), orderBy("createdAt", "desc"));

    const querySnapshot = await getDocs(ordersQuery);
    const orders = [];
    querySnapshot.forEach((doc) => {
        orders.push({ ...doc.data(), id: doc.id });
    });
    return orders;
}

export const createOrder = async (order) => {
    const orderWithTimestamps = {
        ...order,
        createdAt: new Date(),
    };
    const docRef = await addDoc(collection(db, "orders"), orderWithTimestamps);
    const existingData = await getDocumentDetails("customers", order.customerId)
    const customerDocRef = doc(db, 'customers', order.customerId);
    const newOrders = [orderWithTimestamps, ...existingData.orders];
    await updateDoc(customerDocRef, {
        orders: newOrders,
    });
};


export const getDocumentDetails = async (collectionName, documentId) => {
    try {
        const docRef = doc(db, collectionName, documentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // Document found, return the data
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            // Document not found
            console.log("Document not found.");
            return null;
        }
    } catch (error) {
        console.error("Error getting document:", error);
        throw error;
    }
};
