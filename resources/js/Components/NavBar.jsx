import { Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import NavLink from './NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { useState } from 'react';

export default function NavBar() {
    const { auth } = usePage().props;
    const user = auth.user;
    const roles = auth.user?.roles?.map(r => r.name) || [];

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <nav className="border-b border-gray-100 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex">
                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                            {roles.includes('admin') && (
                                <>
                                    <NavLink
                                        href={route('admin.dashboard')}
                                        active={route().current('admin.dashboard')}
                                    >Admin Dashboard
                                    </NavLink>
                                    <NavLink
                                        href={route('admin.users')}
                                        active={route().current('admin.users')}
                                    >
                                        Users
                                    </NavLink>
                                    <NavLink
                                        href={route('roles.page')}
                                        active={route().current('roles.page')}
                                    >
                                        Roles
                                    </NavLink>

                                    
                                </>
                            )}

                            {roles.includes('teacher') && (
                                <>
                                    <NavLink
                                        href={route('teacher.dashboard')}
                                        active={route().current('teacher.dashboard')}
                                    >Teacher Dashboard
                                    </NavLink>
                                    <NavLink
                                        href={route('teacher.grades')}
                                        active={route().current('teacher.grades')}
                                    >
                                        Grades
                                    </NavLink>
                                    <NavLink
                                        href={route('teacher.attendance')}
                                        active={route().current('teacher.attendance')}
                                    >
                                        Attendance
                                    </NavLink>
                                </>
                            )}

                            {roles.includes('student') && (
                                <>
                                    <NavLink
                                        href={route('student.dashboard')}
                                        active={route().current('student.dashboard')}
                                    >Student Dashboard
                                    </NavLink>
                                    <NavLink
                                        href={route('student.profile')}
                                        active={route().current('student.profile')}
                                    >
                                        Profile
                                    </NavLink>
                                    <NavLink
                                        href={route('student.grades')}
                                        active={route().current('student.grades')}
                                    >
                                        Grades
                                    </NavLink>
                                </>
                            )}

                        </div>
                    </div>

                    <div className=" sm:ms-6 sm:flex sm:items-center">
                        <div className="relative ms-3">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                        >
                                            {user.name}

                                            <svg
                                                className="-me-0.5 ms-2 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    {/* <Dropdown.Link
                                        href={route('admin.dashboard')}
                                    >
                                        Profile
                                    </Dropdown.Link> */}
                                    <Dropdown.Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    {/* <div className="-me-2 flex items-center sm:hidden">
                        <button
                            onClick={() =>
                                setShowingNavigationDropdown(
                                    (previousState) => !previousState,
                                )
                            }
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className={
                                        !showingNavigationDropdown
                                            ? 'inline-flex'
                                            : 'hidden'
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={
                                        showingNavigationDropdown
                                            ? 'inline-flex'
                                            : 'hidden'
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div> */}
                </div>
            </div>

            <div
                className={
                    (showingNavigationDropdown ? 'block' : 'hidden') +
                    ' sm:hidden'
                }
            >
                <div className="space-y-1 pb-3 pt-2">
                    <ResponsiveNavLink
                        href={route('teacher.dashboard')}
                        active={route().current('teacher.dashboard')}
                    >
                        Dashboard
                    </ResponsiveNavLink>
                </div>

                <div className="border-t border-gray-200 pb-1 pt-4">
                    <div className="px-4">
                        <div className="text-base font-medium text-gray-800">
                            {user.name}
                        </div>
                        <div className="text-sm font-medium text-gray-500">
                            {user.email}
                        </div>
                    </div>

                    <div className="mt-3 space-y-1">
                        {/* <ResponsiveNavLink href={route('teacher.dashboard')}>
                            Profile
                        </ResponsiveNavLink> */}
                        <ResponsiveNavLink
                            method="post"
                            href={route('logout')}
                            as="button"
                        >
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                </div>
            </div>
        </nav>
        // <nav className="p-4 bg-gray-200 flex gap-4">
        //     <Link href="/">Home</Link>
        //     {roles.includes('admin') && (
        //         <>
        //             <Link href="/admin/dashboard">Admin Dashboard</Link>
        //             <Link href="/admin/users">Manage Users</Link>
        //         </>
        //     )}

        //     {roles.includes('teacher') && (
        //         <>
        //             <Link href="/teacher/dashboard">Teacher Dashboard</Link>
        //             <Link href="/teacher/grades">Grades</Link>
        //             <Link href="/teacher/attendance">Attendance</Link>
        //         </>
        //     )}

        //     {roles.includes('student') && (
        //         <>
        //             <Link href="/student/dashboard">Student Dashboard</Link>
        //             <Link href="/student/profile">Profile</Link>
        //             <Link href="/student/grades">My Grades</Link>
        //         </>
        //     )}

        //     <button
        //         onClick={() => window.axios.post('/logout')}
        //         className="ml-auto text-red-600"
        //     >
        //         Logout
        //     </button>
        // </nav>
    );
}
