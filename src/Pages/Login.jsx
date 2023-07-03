import React, { useState } from 'react';
import { auth, db } from '../Firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            const match =  findUserByEmailAndPassword(email, password)
            // Do something with the userCredential if needed
            console.log(match)
        } catch (error) {
            // Handle error
            console.log(error);
        }
    };



    const findUserByEmailAndPassword = async (email, password) => {
        console.log(email,password)
        try {
            const collectionRef = db.collection('users');
            
            const querySnapshot = await collectionRef
                .where('email', '==', email)
                .where('password', '==', password)
                .get();

            

            if (querySnapshot.empty) {
                console.log('No matching user found.');
                return null;
            }

            // Assuming email is unique, there should be only one matching user
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            console.log('Found User:', querySnapshot);

            return userData;
        } catch (error) {
            console.log('Error finding user in Firestore:', error);
        }
    };


    return (
        <div>
            <section className="bg-gray-100 ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        FoodX
                    </a>
                    <div className="w-full bg-white  shadow  md:mt-0 sm:max-w-md xl:p-0  ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleEmailLogin}>
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 -gray-600 :placeholder-gray-400  :focus:ring-blue-500 :focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 -gray-600 :placeholder-gray-400  :focus:ring-blue-500 :focus:border-blue-500" required="" />
                                </div>
                                <div className='flex flex-col space-y-2'>
                                    <button className='p-2 bg-blue-600 text-white'  >Sign in with Email</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login