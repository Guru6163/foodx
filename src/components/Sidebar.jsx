import React from 'react'
import {
    HomeIcon,
    ShoppingBagIcon,
    UserGroupIcon,
    UserCircleIcon,
    TruckIcon,
    UsersIcon,
    TagIcon,
    ChartBarIcon,
    CogIcon,
    QuestionMarkCircleIcon,
    BellIcon,
} from "@heroicons/react/solid";

import { Link } from 'react-router-dom';

function Sidebar() {
    const menu = [
        { title: "Overview", id: 1, route: "/", icon: HomeIcon },
        { title: "Orders", id: 2, route: "/orders", icon: ShoppingBagIcon },
        { title: "Restaurant Partners", id: 6, route: "/restuarent-partners", icon: UserGroupIcon },
        { title: "Customers", id: 5, route: "/customers", icon: UserCircleIcon },
        { title: "Delivery", id: 4, route: "/delivery", icon: TruckIcon },
        { title: "User Management", id: 10, route: "/user-management", icon: UsersIcon },
        { title: "Discounts and Promotions", id: 7, route: "/discounts", icon: TagIcon },
        { title: "Reports and Analytics", id: 8, route: "/reports", icon: ChartBarIcon },
        { title: "Settings", id: 9, route: "/settings", icon: CogIcon },
        { title: "Help and Support", id: 11, route: "/help", icon: QuestionMarkCircleIcon },
        { title: "Notifications", id: 12, route: "/notifications", icon: BellIcon },
    ];
    return (
        <div className='bg-blue'>
            <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <Link to="/" class="flex items-center pl-2.5 mb-5">
                        <img src="https://flowbite.com/docs/images/logo.svg" class="h-6 mr-3 sm:h-7" alt="FoodX Logo" />
                        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">FoodX</span>
                    </Link>
                    <ul class="space-y-2 font-medium">
                        {menu.map((el) => {
                            return (
                                <li>
                                    <Link to={el.route} id={el.id} class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        {<el.icon className='h-6 w-6' />}
                                        <span class="ml-3">{el.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar