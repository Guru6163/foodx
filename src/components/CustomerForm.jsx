import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../Firebase/config';
import * as Yup from 'yup';
import { doc, setDoc } from "firebase/firestore";



function CustomerForm() {

    const [userType, setUserType] = useState('');
    const validationSchema = Yup.object().shape({
        full_name: Yup.string().required('Full Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
        address: Yup.string().required('Address is required'),
        phoneNumber: Yup.string().required('Phone Number is required'),
        city: Yup.string().required('City is required'),
    });
    const [values, setValues] = useState({
        full_name: '',
        email: '',
        password: '',
        address: '',
        phoneNumber: '',
        city: '',
    
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Perform validation
        validationSchema
            .validate(values, { abortEarly: false })
            .then(() => {
                // Validation succeeded, handle form submission
                handleForm(values);
                console.log(userType)
            })
            .catch((validationErrors) => {
                // Validation failed, set errors
                const errors = {};
                validationErrors.inner.forEach((error) => {
                    errors[error.path] = error.message;
                });
                setErrors(errors);
                setIsSubmitting(false);
            });
    };

    const handleForm = async (values) => {
        try {
            const { email, password } = values
            let user
            try {
                const userAuth = await signInWithEmailAndPassword(auth, email, password);
                user = userAuth.user;
                console.log('User already exists:', user);

            } catch (err) {
                console.log('Form data:', values);
                const { email, password } = values;
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                 user = userCredential.user;
                console.log('User created:', user);
            }

            await setDoc(doc(db, userType.toLowerCase() + 's', user.uid), {
                full_name: values.full_name,
                email: values.email,
                address: values.address,
                phoneNumber: values.phoneNumber,
                city: values.city,
                orders:[]
            });

        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div class="flex items-center justify-center h-screen">
            <div class="container max-w-screen-lg mx-auto">
                <div>
                    <h2 class="font-semibold text-xl text-gray-600">Generic Form</h2>
                    <p class="text-gray-500 mb-6">For Customer, Delivery-Partners and Admins</p>

                    <div class="bg-white border-2 shadow-lg p-4 px-4 md:p-8 mb-6">
                        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                            <div class="text-gray-600">
                                <p class="font-medium text-lg">Personal Details</p>
                                <p>Please fill out all the fields.</p>
                            </div>

                            <form onSubmit={(e) => handleFormSubmit(e)} class="lg:col-span-2">
                                <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                    <div class="md:col-span-5">
                                        <label for="full_name">Full Name</label>
                                        <input type="text" name="full_name" id="full_name" value={values.full_name} onChange={handleInputChange}
                                            class="h-10 border mt-1  px-4 w-full bg-gray-50" />
                                    </div>

                                    <div class="md:col-span-3">
                                        <label for="email">Email Address</label>
                                        <input type="text" name="email" id="email" class="h-10 border mt-1  px-4 w-full bg-gray-50" value={values.email} onChange={handleInputChange} placeholder="email@domain.com" />
                                    </div>

                                    <div class="md:col-span-2">
                                        <label for="password">Password</label>
                                        <input type="text" name="password" id="password" class="h-10 border mt-1  px-4 w-full bg-gray-50" value={values.password} onChange={handleInputChange} placeholder="" />
                                    </div>

                                    <div class="md:col-span-3">
                                        <label for="address">Address / Street</label>
                                        <input type="text" name="address" id="address" class="h-10 border mt-1  px-4 w-full bg-gray-50" value={values.address} onChange={handleInputChange} placeholder="" />
                                    </div>
                                    <div class="md:col-span-2">
                                        <label for="phoneNumber">Phone Number</label>
                                        <input type="text" name="phoneNumber" id="phoneNumber" class="h-10 border mt-1  px-4 w-full bg-gray-50" value={values.phoneNumber} onChange={handleInputChange} placeholder="" />
                                    </div>

                                    <div class="md:col-span-2">
                                        <label for="city">User Type</label>
                                        <select onChange={(e => setUserType(e.target.value))} type="text" name="city" id="city" class="h-10 border mt-1  px-4 w-full bg-gray-50" placeholder="" >
                                            <option>Admin</option>
                                            <option>Delivery Partner</option>
                                            <option>Customer</option>
                                        </select>
                                    </div>

                                    <div class="md:col-span-3">
                                        <label for="city">City</label>
                                        <input type="text" name="city" id="city" class="h-10 border mt-1  px-4 w-full bg-gray-50" value={values.city} onChange={handleInputChange} placeholder="" />
                                    </div>


                                    <div class="md:col-span-5 mt-2  text-right">
                                        <div class="inline-flex items-end">
                                            <button type='submit' style={{ backgroundColor: "#1C64F2" }} class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 px-6 w-full ">Create New Customer</button>
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerForm;
