import React, { useState, useEffect } from 'react';
import { getAllUsers,createOrder } from '../apis/api';
import CustomDropdown from "../components/CustomDropdown"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


const OrderForm = () => {
    const [allCustomers, setAllCustomers] = useState([])
    const [allRestaurents, setAllRestaurents] = useState([])
    const [selectedCustomer, setSelectedCustomer] = useState(null)
    const [selectedRestaurent, setSelectedRestaurent] = useState(null)
    const [orderItems, setOrderItems] = useState([]);


    const [order, setOrder] = useState({
        orderId: '',
        customer: "",
        restaurant: '',
        itemName: '',
        itemQuantity: '',
        itemPrice: '',
        totalAmount: '',
        status: 'pending',
        deliveryAddress: "",
        deliveryCity: 'Arani',
        deliveryPostalCode: '632301',
        paymentMethod: 'credit_card',
        paymentStatus: 'unpaid',
        items: []
    });

    const calculateTotalAmount = () => {

        const totalAmount = order.items.reduce((acc, item) => {
            return acc + parseFloat(item.totalPrice);
        }, 0);

        setOrder((prevOrder) => ({ ...prevOrder, totalAmount: totalAmount.toFixed(2) }));
    };


    const getData = async () => {
        try {
            const customers = await getAllUsers()
            const restaurents = getAllUsers()
            setAllCustomers(customers)
            setAllRestaurents(restaurents)
            console.log(customers, restaurents)
        }
        catch (err) {
            console.log(err)
        }
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrder({ ...order, [name]: value });
    };

    const handleAddToBasket = (e, menuItem, quantity) => {
        e.preventDefault();
        const newOrderItem = {
            itemName: menuItem.itemName,
            itemPrice: menuItem.price,
            itemQuantity: quantity,
            totalPrice: (menuItem.price * quantity).toFixed(2),
        };

        // Use the functional update form to guarantee that you are always
        // updating the state based on the latest previous state
        setOrder((prevOrder) => {
            return {
                ...prevOrder,
                items: [...prevOrder.items, newOrderItem],
            };
        });


    };

    useEffect(() => {
        calculateTotalAmount();
        console.log(selectedCustomer,selectedRestaurent)
    }, [order.items])


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedCustomer
            || !selectedRestaurent ||
            !order.status ||
            !order.deliveryAddress ||
            !order.deliveryCity ||
            !order.deliveryPostalCode ||
            !order.paymentMethod ||
            !order.paymentStatus ||
            !order.items) {
            alert('Please Fill All The Fields.');
            return;
        }

        // Handle form submission here
        const modifiedOrder = {
            customerId: selectedCustomer.id,
            customerName: selectedCustomer.full_name,
            restaurantName:selectedRestaurent.name,
            restaurantId: selectedRestaurent.id,
            totalAmount: order.totalAmount,
            status: order.status,
            deliveryAddress: order.deliveryAddress,
            deliveryCity: order.deliveryCity,
            deliveryPostalCode: order.deliveryPostalCode,
            paymentMethod: order.paymentMethod,
            paymentStatus: order.paymentStatus,
            items: order.items,
        };

        createOrder(modifiedOrder)
    };


    useEffect(() => {
        getData()
        

    }, [])

    useEffect(() => {
        // Set the default delivery address to the selected customer's address
        setOrder((prevOrder) => ({
            ...prevOrder,
            deliveryAddress: selectedCustomer?.address || "",
        }));
    }, [selectedCustomer]);



    return (
        <div className=" mx-auto bg-white  p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Order Form</h2>
            <form className='grid grid-cols-2 gap-2'>

                <div className="mb-4">
                    <CustomDropdown options={allCustomers} label="Select Customer" selectedValue={selectedCustomer} onSelectedValueChange={setSelectedCustomer} filterSearch1="full_name" filterSearch2="phoneNumber" />
                </div>

                <div className="mb-4">
                    <CustomDropdown options={allRestaurents} label="Select Restaurent" selectedValue={selectedRestaurent} onSelectedValueChange={setSelectedRestaurent} filterSearch1="name" filterSearch2="category" />
                </div>

                <div className="mb-4 col-span-2">
                    <div className='p-2 border-2'>
                        <div className='flex justify-between items-center px-2'>
                            <label htmlFor="itemName" className="block text-md font-bold text-gray-700">
                                Food Items
                            </label>
                            <button className='p-2 bg-blue-600 text-white px-6 text-sm' >Add Item</button>
                        </div>
                        <div className='border-2 shadow-sm p-2 m-2' style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {selectedRestaurent?.menuItems.map((menuItem, index) => {
                                let quantity = order[`quantity${index}`] || "";
                                const totalPrice = (menuItem.price * quantity).toFixed(2);
                                const buttonClass = quantity === 0 || quantity === "" ? "p-2 text-white bg-gray-600 rounded-sm" : "p-2 text-white bg-blue-600 rounded-sm";

                                return (
                                    <div key={index} className="flex items-center justify-evenly font-semibold gap-2 space-y-2">
                                        <label htmlFor={`itemName${index}`}>Item Name</label>
                                        <input
                                            type="text"
                                            id={`itemName${index}`}
                                            name="itemName"
                                            value={menuItem.itemName}
                                            className="border px-3 py-2 bg-gray-100"
                                        />

                                        <label htmlFor={`price${index}`}>Price</label>
                                        <input
                                            type="text"
                                            id={`price${index}`}
                                            name="price"
                                            value={menuItem.price}
                                            className="border px-3 py-2 bg-gray-100 w-24"
                                        />

                                        <label htmlFor={`quantity${index}`}>Quantity</label>
                                        <input
                                            type="number"
                                            id={`quantity${index}`}
                                            name={`quantity${index}`}
                                            value={quantity}
                                            onChange={handleInputChange}
                                            className="border px-3 py-2 bg-gray-100 w-24"
                                        />

                                        <label htmlFor={`totalPrice${index}`}>Total Price</label>
                                        <input
                                            type="text"
                                            id={`totalPrice${index}`}
                                            name={`totalPrice${index}`}
                                            value={totalPrice}
                                            readOnly
                                            className="border px-3 py-2 bg-gray-100 w-24"
                                        />

                                        <button className={buttonClass} onClick={(e) => {
                                            if (quantity) {
                                                handleAddToBasket(e, menuItem, quantity)
                                            }
                                        }}>Add to Basket</button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className='col-span-2'>
                    <DataTable size="small" value={order.items} showGridlines tableStyle={{ minWidth: '50rem' }}>
                        <Column align="center" field="itemName" header="Food Item"></Column>
                        <Column align="center" field="itemPrice" header="Item Price"></Column>
                        <Column align="center" field="itemQuantity" header="Item Quantity"></Column>
                        <Column align="center" field="totalPrice" header="Total Price"></Column>
                    </DataTable>
                </div>



                <div className="mb-4">
                    <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700">
                        Total Amount
                    </label>
                    <input
                        type="number"
                        name="totalAmount"
                        id="totalAmount"
                        value={order.totalAmount}
                        onChange={handleInputChange}
                        className="border  px-3 py-2 bg-gray-100 w-full"
                        readOnly
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Status
                    </label>
                    <select
                        name="status"
                        id="status"
                        value={order.status}
                        onChange={handleInputChange}
                        className="border  px-3 py-2 bg-gray-100 w-full"
                    >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700">
                        Delivery Street
                    </label>
                    <input
                        type="text"
                        name="deliveryAddress"
                        id="deliveryAddress"
                        value={order.deliveryAddress}
                        onChange={handleInputChange}
                        className="border  px-3 py-2 bg-gray-100 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="deliveryCity" className="block text-sm font-medium text-gray-700">
                        Delivery City
                    </label>
                    <input
                        type="text"
                        name="deliveryCity"
                        id="deliveryCity"
                        value={order.deliveryCity}
                        onChange={handleInputChange}
                        className="border  px-3 py-2 bg-gray-100 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="deliveryPostalCode" className="block text-sm font-medium text-gray-700">
                        Delivery Postal Code
                    </label>
                    <input
                        type="text"
                        name="deliveryPostalCode"
                        id="deliveryPostalCode"
                        value={order.deliveryPostalCode}
                        onChange={handleInputChange}
                        className="border  px-3 py-2 bg-gray-100 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                        Payment Method
                    </label>
                    <select
                        name="paymentMethod"
                        id="paymentMethod"
                        value={order.paymentMethod}
                        onChange={handleInputChange}
                        className="border  px-3 py-2 bg-gray-100 w-full"
                    >
                        <option value="credit_card">Credit Card</option>
                        <option value="debit_card">Debit Card</option>
                        <option value="cash">Cash on Delivery</option>
                        <option value="paypal">PayPal</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="paymentStatus" className="block text-sm font-medium text-gray-700">
                        Payment Status
                    </label>
                    <select
                        name="paymentStatus"
                        id="paymentStatus"
                        value={order.paymentStatus}
                        onChange={handleInputChange}
                        className="border  px-3 py-2 bg-gray-100 w-full"
                    >
                        <option value="paid">Paid</option>
                        <option value="unpaid">Unpaid</option>
                        <option value="pending">Pending</option>
                        <option value="refunded">Refunded</option>
                    </select>
                </div>


            </form>
            <button
                onClick={handleSubmit}
                className="w-full bg-indigo-500 text-white font-semibold py-2 -md hover:bg-indigo-600"
            >
                Submit
            </button>
        </div>
    );
};

export default OrderForm;
