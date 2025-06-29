import NavBar from '@/Components/NavBar';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast'

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
// console.log("authroles",usePage().props);

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <NavBar/>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <Toaster position="top-right" />
            <main style={{padding: '50px'}}>{children}</main>
        </div>
    );
}
