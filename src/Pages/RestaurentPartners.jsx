import React, { useEffect, useState } from 'react'
import { db } from '../Firebase/config'
import { getDocs, collection } from 'firebase/firestore'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';



function RestaurentPartners() {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [error, setError] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const restuarentCollectionsRef = collection(db, "restaurants")

    useEffect(() => {
        const getRestuarentsList = async () => {
            try {
                const data = await getDocs(restuarentCollectionsRef)
                const filteredData = data.docs.map((data) => ({ ...data.data(), id: data.id }))
                setData(filteredData)
                console.log(filteredData)
            } catch (err) {
                console.log(err)
            }
        }
        getRestuarentsList()
    }, [])

    return (
        <div>
            <div className='text-2xl font-bold'>
                Partnered Restuarents
            </div>
            <div className="mt-4">
                <div>
                    <div className='flex justify-end gap-1 my-2'>
                        <Button onClick={()=>navigate("new")} label="Add New Restuarent" />
                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText placeholder="Search" />
                        </span>
                    </div>

                </div>
                <DataTable onRowClick={(row)=>navigate(row.data.id,{state:row.data})} rowHover showGridlines rows={10} paginator value={data} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="name" header="Name"></Column>
                    <Column field="contact.phone" header="Phone Number"></Column>
                    <Column field="contact.email" header="Email"></Column>
                    <Column field="category" header="Category"></Column>
                </DataTable>
            </div>
        </div>
    )
}

export default RestaurentPartners