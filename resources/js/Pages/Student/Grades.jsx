import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { auth } = usePage().props;
    const roles = auth.user.roles.map(r => r.name) || [];
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Welcome {(roles.includes('admin') && 'Admin') || (roles.includes('teacher') && 'Teacher') || (roles.includes('student') && 'Student') }, Grades Detail Here
                </h2>
            }
        ></AuthenticatedLayout>
    )
}