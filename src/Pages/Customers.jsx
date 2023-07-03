import React, { useEffect, useState } from 'react'
import { db } from '../Firebase/config'
import { getDocs, collection } from 'firebase/firestore'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

function Customers() {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [error, setError] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const userCollectionsRef = collection(db, "customers")

    useEffect(() => {
        const getUsersList = async () => {
            try {
                const data = await getDocs(userCollectionsRef)
                const filteredData = data.docs.map((data) => ({ ...data.data(), id: data.id }))
                setData(filteredData)
                console.log(filteredData)
            } catch (err) {
                console.log(err)
            }
        }
        getUsersList()
    }, [])
    return (
        <div className='p-4'>
            <div className="mt-4">
                <div className='flex justify-between items-center'>
                    <div className='text-2xl font-bold -mt-2'>
                        Customers
                    </div>
                    <div className=' gap-1 my-2'>
                        <Button onClick={() => navigate("new")} label="Add New Restuarent" />
                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText placeholder="Search" />
                        </span>
                    </div>

                </div>
                <DataTable onRowClick={(row) => navigate(row.data.id, { state: row.data })} rowHover showGridlines rows={10} paginator value={data} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="full_name" header="Name"></Column>
                    <Column field="phoneNumber" header="Phone Number"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="address" header="Address"></Column>

                </DataTable>
            </div>
        </div>
    )
}

export default Customers