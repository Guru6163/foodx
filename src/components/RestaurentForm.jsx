import React, { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../Firebase/config'
import { useLocation } from 'react-router-dom';


const RestaurantForm = () => {
    const location = useLocation();
    const locationData = location.state;
    const restuarentCollectionsRef = collection(db, "restaurants")
    const initialFormData = {
        id: '',
        name: '',
        address: '',
        contact: {
            phone: '',
            email: '',
        },
        menuItems: [],
        category: '',
    };

    // State for the form data
    const [formData, setFormData] = useState(initialFormData);


    const deleteRestuarent = async (event, id) => {
        event.preventDefault()
        console.log(id);
        const restaurantDoc = doc(db, "restaurants", id);
        await deleteDoc(restaurantDoc); // Pass the restaurantDoc reference here
        console.log("Document successfully deleted!");
    };

    const updateRestaurent = async (event, id) => {
        event.preventDefault()
        console.log(id);
        const restaurantDoc = doc(db, "restaurants", id);
        await updateDoc(restaurantDoc, { ...formData });

    };



    useEffect(() => {
        // If locationData exists, it means we are editing existing data, so update the form data state
        if (locationData) {
            setFormData(locationData);
        }
    }, [locationData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleMenuItemChange = (index, event) => {
        const { name, value } = event.target;
        const updatedMenuItems = [...formData.menuItems];
        updatedMenuItems[index][name] = value;
        setFormData({ ...formData, menuItems: updatedMenuItems });
    };

    const handleAddMenuItem = () => {
        // Function to add a new menu item form
        setFormData({
            ...formData,
            menuItems: [...formData.menuItems, { itemName: '', quantity: '', price: '' }],
        });
    };

    const handleNestedInputChange = (e) => {
        const { name, value } = e.target;
        const [parent, child] = name.split('.');
        setFormData((prevData) => ({
            ...prevData,
            [parent]: {
                ...prevData[parent],
                [child]: value,
            },
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form validation
        if (formData.name.trim() === '') {
            alert('Restaurant Name cannot be empty');
            return;
        }

        if (formData.address.trim() === '') {
            alert('Address cannot be empty');
            return;
        }

        // Optional menu item validation
        const invalidMenuItems = formData.menuItems.filter(item => (
            item.itemName.trim() === '' || item.quantity.trim() === '' || item.price.trim() === ''
        ));
        if (invalidMenuItems.length > 0) {
            alert('Menu item fields cannot be empty');
            return;
        }

        try {
            const res = await addDoc(restuarentCollectionsRef, formData);
            console.log(res);
            // Optionally, you can reset the form after successful submission
            setFormData({
                id: '',
                name: '',
                address: '',
                contact: {
                    phone: '',
                    email: '',
                },
                menuItems: [],
                category: '',
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteMenuItem = (index) => {
        const updatedMenuItems = [...formData.menuItems];
        updatedMenuItems.splice(index, 1);
        setFormData({ ...formData, menuItems: updatedMenuItems });
    };



    return (
        <div className="mx-auto mt-8">
            <form className="space-y-2 p-6 border-2 shadow-md">
                <div className="col-span-2 font-semibold gap-2">
                    <label for="name">Restaurant Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full border  px-3 py-2 bg-gray-100"
                    />
                </div>
                <div className="col-span-2 font-semibold gap-2">
                    <label for="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full border  px-3 py-2 bg-gray-100"
                    />
                </div>
                <div className="col-span-1 font-semibold gap-2">
                    <label for="phone">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        name="contact.phone"
                        value={formData.contact.phone}
                        onChange={handleNestedInputChange}
                        className="w-full border  px-3 py-2 bg-gray-100"
                    />
                </div>
                <div className="col-span-1 font-semibold gap-2">
                    <label for="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="contact.email"
                        value={formData.contact.email}
                        onChange={handleNestedInputChange}
                        className="w-full border  px-3 py-2 bg-gray-100"
                    />
                </div>

                {/* Add the "Add Menu" button */}
                <div className="col-span-2 font-semibold gap-2">
                    <button
                        type="button"
                        onClick={handleAddMenuItem}
                        style={{ backgroundColor: "#1C64F2" }}
                        className='p-2 text-white hover:bg-blue-800 w-1/6 rounded-sm'
                    >
                        Add Menu
                    </button>
                </div>
                <div className='border-2 shadow-sm p-2'>
                    {formData.menuItems.map((menuItem, index) => (
                        <div key={index} className="flex items-center justify-evenly font-semibold gap-2 space-y-2">
                            <label for={`itemName${index}`}>Item Name</label>
                            <input
                                type="text"
                                id={`itemName${index}`}
                                name="itemName"
                                value={menuItem.itemName}
                                onChange={(e) => handleMenuItemChange(index, e)}
                                className=" border  px-3 py-2 bg-gray-100"
                            />
                            <label for={`quantity${index}`}>Quantity</label>
                            <input
                                type="text"
                                id={`quantity${index}`}
                                name="quantity"
                                value={menuItem.quantity}
                                onChange={(e) => handleMenuItemChange(index, e)}
                                className=" border  px-3 py-2 bg-gray-100"
                            />
                            <label for={`price${index}`}>Price</label>
                            <input
                                type="text"
                                id={`price${index}`}
                                name="price"
                                value={menuItem.price}
                                onChange={(e) => handleMenuItemChange(index, e)}
                                className=" border  px-3 py-2 bg-gray-100"
                            />
                            <button
                                onClick={() => handleDeleteMenuItem(index)}
                                style={{ backgroundColor: "red" }}
                                className="p-2 text-white hover:bg-blue-800 rounded-sm"
                            >
                                Delete Item
                            </button>
                        </div>
                    ))}
                </div>


                {/* Add similar fields for other days */}
                <div className="col-span-2 font-semibold gap-2">
                    <label for="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full border px-3 py-2 bg-gray-100"
                    >
                        <option>Veg</option>
                        <option>Non-Veg</option>
                        <option>Both</option>
                    </select>
                </div>

                <div className="col-span-2 font-semibold space-x-2 flex">
                    {locationData ? <div className='space-x-2'>
                        <button
                            onClick={(e) => updateRestaurent(e, formData.id)}
                            style={{ backgroundColor: "green" }} className=" hover:bg-blue-600 text-white font-semibold py-2 bg-gray-100 px-4 ">
                            Update
                        </button>
                        <button
                            onClick={(e) => deleteRestuarent(e, formData.id)}
                            style={{ backgroundColor: "red" }} className=" hover:bg-blue-600 text-white font-semibold py-2 bg-gray-100 px-4 ">
                            Delete
                        </button>
                    </div> :
                        <button
                            onClick={(e) => handleSubmit(e)}
                            style={{ backgroundColor: "#1C64F2" }} type="submit" className=" hover:bg-blue-600 text-white font-semibold py-2 bg-gray-100 px-4 ">
                            Save
                        </button>
                    }
                </div>
            </form>
        </div>
    );
};

export default RestaurantForm;
