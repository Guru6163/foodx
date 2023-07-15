import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { DataStore } from 'aws-amplify';
import { Dish } from '../models';
import { Restaurant } from '../models';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';




const RestaurantForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const locationData = location.state;
    const [allDishes, setAllDishes] = useState([])
    const toast = useRef(null);
    const [selectedId, setSelectedId] = useState("")

    const initialFormData = {
        name: '',
        adress: '',
        category: '',
        phoneNumber: '',
        email: '',
        deliveryFee: '',
        maxDeliveryTime: '',
        minDeliveryTime: '',
        rating: '',
    };
    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [dialogFormData, setDialogFormData] = useState({
        name: '',
        serving: '',
        price: '',
        description: '',
        image: '',
    });




    async function createNewRestaurant(e) {
        e.preventDefault()
        const post = await DataStore.save(
            new Restaurant({
                name: formData.name,
                rating: parseInt(formData.rating),
                adress: formData.adress,
                category: formData.category,
                deliveryFee: parseInt(formData.deliveryFee),
                maxDeliveryTime: formData.maxDeliveryTime,
                minDeliveryTime: formData.minDeliveryTime,
                phoneNumber: formData.phoneNumber,
                email: formData.email,
            })
        );
        console.log(post)
    }

    const deleteRestaurant = async (event) => {
        event.preventDefault();
        try {
            const toDelete = await DataStore.query(Restaurant, locationData.id);
            DataStore.delete(toDelete);
            navigate('/restuarent-partners');
        } catch (err) {
            console.log(err);
        }
    };

    const deleteDish = async (event, id) => {
        event.preventDefault()
        setSelectedId(id)
        console.log(id)
        const toDelete = await DataStore.query(Dish, id);
        DataStore.delete(toDelete);
        showInfo("Dish Deleted", "The Dish is deleted from this restaurant")
        setSelectedId("")
    };

    const updateRestaurant = async (event) => {
        event.preventDefault();
        try {
            const restaurant = await DataStore.query(Restaurant, locationData.id);
            await DataStore.save(
                Restaurant.copyOf(restaurant, (updated) => {
                    updated.name = formData.name;
                    updated.adress = formData.adress;
                    updated.category = formData.category;
                    updated.phoneNumber = formData.phoneNumber;
                    updated.email = formData.email;
                    updated.deliveryFee = parseInt(formData.deliveryFee);
                    updated.maxDeliveryTime = formData.maxDeliveryTime;
                    updated.minDeliveryTime = formData.minDeliveryTime;
                    updated.rating = parseInt(formData.rating);
                })
            );
            navigate('/restuarent-partners');
        } catch (err) {
            console.log(err);
        }
    };


    const fetchAllDishes = async (id) => {
        try {
            const allDishes = await DataStore.query(Dish, (c) => c.restaurantID.eq(id));
            console.log(allDishes)
            setAllDishes(allDishes)
        }
        catch (err) {
            console.log("Error Fecthing Dishes")
        }

    }

    const handleDialogInputChange = (e) => {
        const { name, value } = e.target;
        setDialogFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onSubmitDialog = async (e) => {
        e.preventDefault()
        try {
            const dish = await DataStore.save(
                new Dish({
                    name: dialogFormData.name,
                    price: parseInt(dialogFormData.price),
                    image: dialogFormData.image,
                    serving: dialogFormData.serving,
                    description: dialogFormData.description,
                    restaurantID: locationData?.id
                })
            );
            if (dish) {
                showSuccess("Dish Added", `A New Dish Added to the Restaurent - ${locationData.name}`)
                setDialogFormData({})
                setVisible(false)
            }
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        if (locationData) {
            setFormData(locationData);
            fetchAllDishes(locationData.id)
        }
    }, [locationData, visible, selectedId]);


    const showSuccess = (summary, detail) => {
        toast.current.show({ severity: 'success', summary, detail, life: 3000 });
    }

    const showInfo = (summary, detail) => {
        toast.current.show({ severity: 'info', summary, detail, life: 3000 });
    }


    const showError = (summary, detail) => {
        toast.current.show({ severity: 'error', summary, detail, life: 3000 });
    }

    const deleteTemplate = (e) => {
        return (
            <div style={{ backgroundColor: "red", textAlign: "center" }} onClick={async (event) => await deleteDish(event, e.id)} className='py-1 text-white cursor-pointer'>
                Delete
            </div>
        )

    }





    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="mx-auto mt-8">
            <Toast ref={toast} />


            <form className="space-y-2 p-6 border-2 shadow-md">
                <div className="col-span-2 font-semibold gap-2">
                    <label htmlFor="name">Restaurant Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full border px-3 py-2 bg-gray-100"
                    />
                </div>
                <div className="col-span-2 font-semibold gap-2">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="adress"
                        name="adress"
                        value={formData.adress}
                        onChange={handleInputChange}
                        className="w-full border px-3 py-2 bg-gray-100"
                    />
                </div>
                <div className="col-span-1 font-semibold gap-2">
                    <label htmlFor="phoneNumber">Phone</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full border px-3 py-2 bg-gray-100"
                    />
                </div>
                <div className="col-span-1 font-semibold gap-2">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full border px-3 py-2 bg-gray-100"
                    />
                </div>
                <div className="col-span-1 font-semibold gap-2">
                    <label htmlFor="deliveryFee">Delivery Fee</label>
                    <input
                        type="number"
                        id="deliveryFee"
                        name="deliveryFee"
                        value={formData.deliveryFee}
                        onChange={handleInputChange}
                        className="w-full border px-3 py-2 bg-gray-100"
                    />
                </div>
                <div className="col-span-1 font-semibold gap-2">
                    <div className="grid grid-cols-4 gap-2">
                        <div>
                            <label htmlFor="minDeliveryTime">Min Delivery Time</label>
                            <input
                                type="text"
                                id="minDeliveryTime"
                                name="minDeliveryTime"
                                value={formData.minDeliveryTime}
                                onChange={handleInputChange}
                                className="w-full border px-3 py-2 bg-gray-100"
                            />
                        </div>
                        <div>
                            <label htmlFor="maxDeliveryTime">Max Delivery Time</label>
                            <input
                                type="text"
                                id="maxDeliveryTime"
                                name="maxDeliveryTime"
                                value={formData.maxDeliveryTime}
                                onChange={handleInputChange}
                                className="w-full border px-3 py-2 bg-gray-100"
                            />
                        </div>
                        <div>
                            <label htmlFor="rating">Rating</label>
                            <input
                                type="number"
                                id="rating"
                                name="rating"
                                value={formData.rating}
                                onChange={handleInputChange}
                                className="w-full border px-3 py-2 bg-gray-100"
                            />
                        </div>
                        <div>
                            <label htmlFor="category">Category</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full border px-3 py-2 bg-gray-100"
                            >
                                <option value="NON_VEG">Non-Veg</option>
                                <option value="VEG">Veg</option>
                                <option value="BOTH">Both</option>
                                <option value="JUICES">Juices</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 font-semibold space-x-2 flex">
                    {locationData ? (
                        <div className="space-x-2">
                            <button
                                onClick={deleteRestaurant}
                                style={{ backgroundColor: 'red' }}
                                className="p-2 px-8 text-white hover:bg-blue-800 rounded-sm"
                            >
                                Delete
                            </button>
                            <button
                                onClick={updateRestaurant}
                                style={{ backgroundColor: 'green' }}
                                className="p-2 px-8 text-white hover:bg-blue-800 rounded-sm"
                            >
                                Update
                            </button>

                            <button
                                onClick={(e) => {
                                    setVisible(true)
                                    e.preventDefault()
                                }}
                                style={{ backgroundColor: 'blue' }}
                                className="p-2 px-8 text-white hover:bg-blue-800 rounded-sm"
                            >
                                Add Menu Items
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={e => createNewRestaurant(e)}
                            style={{ backgroundColor: '#1C64F2' }}
                            className="p-2 px-8 text-white hover:bg-blue-800 rounded-sm "
                        >
                            Save
                        </button>
                    )}
                </div>
            </form>
            {location && <Dialog
                header="Add Dish"
                visible={visible}
                style={{ width: '50vw' }}
                onHide={() => setVisible(false)}
            >
                <div className="border-2 shadow-sm p-2">
                    <div className="font-semibold gap-2 p-2">
                        <div className="flex flex-col">
                            <label htmlFor="name">Item Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={dialogFormData.name}
                                onChange={handleDialogInputChange}
                                className="border px-3 py-2 bg-gray-100"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="serving">Serving</label>
                            <input
                                type="text"
                                id="serving"
                                name="serving"
                                value={dialogFormData.serving}
                                onChange={handleDialogInputChange}
                                className="border px-3 py-2 bg-gray-100"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="price">Price</label>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                value={dialogFormData.price}
                                onChange={handleDialogInputChange}
                                className="border px-3 py-2 bg-gray-100"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={dialogFormData.description}
                                onChange={handleDialogInputChange}
                                className="border px-3 py-2 bg-gray-100"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="image">Image URL</label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                value={dialogFormData.image}
                                onChange={handleDialogInputChange}
                                className="border px-3 py-2 bg-gray-100"
                            />
                        </div>
                    </div>
                    <div className='flex justify-end'>
                        <button
                            onClick={() => setVisible(false)}
                            style={{ backgroundColor: 'red' }}
                            className="p-2 px-8 text-white hover:bg-blue-800 rounded-sm mt-6"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={(e) => onSubmitDialog(e)}
                            style={{ backgroundColor: 'blue' }}
                            className="p-2 px-8 text-white hover:bg-blue-800 rounded-sm mt-6 mx-2"
                        >
                            Add Item
                        </button>
                    </div>

                </div>
            </Dialog>}

            {locationData && <DataTable className='mt-8' showGridlines rows={10} paginator value={allDishes} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Name"></Column>
                <Column field="serving" header="Serving"></Column>
                <Column field="price" header="Price"></Column>
                <Column body={deleteTemplate} bodyStyle={{ width: "10vw" }} header="Delete Item"></Column>
            </DataTable>}
        </div>
    );
};

export default RestaurantForm;
