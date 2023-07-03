import { doc, collection, getDocs, addDoc, serverTimestamp, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/config";

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
