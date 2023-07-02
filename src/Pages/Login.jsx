import React from 'react'

function Login() {
    return (
        <div>
            <section class="bg-gray-100 ">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a class="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                        <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        FoodX
                    </a>
                    <div class="w-full bg-white  shadow  md:mt-0 sm:max-w-md xl:p-0  ">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                Sign in to your account
                            </h1>
                            <form class="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                    <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 -gray-600 :placeholder-gray-400  :focus:ring-blue-500 :focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 -gray-600 :placeholder-gray-400  :focus:ring-blue-500 :focus:border-blue-500" required="" />
                                </div>
                                <div className='flex flex-col space-y-2'>
                                <button className='p-2 bg-gray-600 text-white'>Sign in with Email</button>
                                <button className='p-2 bg-blue-600 text-white' >Sign in with Google</button>
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