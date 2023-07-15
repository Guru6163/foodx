import React, { useEffect, useState } from 'react'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { DataStore } from 'aws-amplify';
import { Restaurant } from '../models';


function RestaurentPartners() {
    const navigate = useNavigate()
    const [data, setAllRestaurants] = useState([])

    useEffect(() => {
        async function getAllRestaurants() {
            const orders = await DataStore.query(Restaurant)
            console.log(orders)
            setAllRestaurants(orders);
        }
        getAllRestaurants()
    }, [])

    return (
        <div>
            <div className='text-2xl font-bold'>
                Partnered Restuarents
            </div>
            <div className="mt-4">
                <div>
                    <div className='flex justify-end gap-1 my-2'>
                        <Button onClick={() => navigate("new")} label="Add New Restuarent" />
                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText placeholder="Search" />
                        </span>
                    </div>

                </div>
                <DataTable onRowClick={(row) => navigate(`${row.data.id}`,{state:row.data})} rowHover showGridlines rows={10} paginator value={data} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="name" header="Name"></Column>
                    <Column field="adress" header="Address"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="phoneNumber" header="Phone Number"></Column>
                    <Column field="category" header="Category"></Column>
                </DataTable>
            </div>
        </div>
    )
}

export default RestaurentPartners