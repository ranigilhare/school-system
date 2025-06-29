// import { useForm } from '@inertiajs/react';

// export default function Users({ users, roles, permissions }) {
//     const { put } = useForm();

//     return (
//         <div>
//             <h1>User Management</h1>
//             {users.map(user => (
//                 <div key={user.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
//                     <h4>{user.name}</h4>
//                     <label>Roles:</label>
//                     {roles.map(role => (
//                         <label key={role.id}>
//                             <input
//                                 type="checkbox"
//                                 checked={user.roles.some(r => r.name === role.name)}
//                                 onChange={e => put(`/admin/users/${user.id}/roles`, {
//                                     roles: e.target.checked
//                                         ? [...user.roles.map(r => r.name), role.name]
//                                         : user.roles.map(r => r.name).filter(r => r !== role.name)
//                                 })}
//                             /> {role.name}
//                         </label>
//                     ))}
//                     <br />
//                     <label>Permissions:</label>
//                     {permissions.map(permission => (
//                         <label key={permission.id}>
//                             <input
//                                 type="checkbox"
//                                 checked={user.permissions.some(p => p.name === permission.name)}
//                                 onChange={e => put(`/admin/users/${user.id}/permissions`, {
//                                     permissions: e.target.checked
//                                         ? [...user.permissions.map(p => p.name), permission.name]
//                                         : user.permissions.map(p => p.name).filter(p => p !== permission.name)
//                                 })}
//                             /> {permission.name}
//                         </label>
//                     ))}
//                 </div>
//             ))}
//         </div>
//     );
// }

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function Users({ users, roles, permissions }) {
    return (
        <AuthenticatedLayout>
        <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4">User Management</h2>
           
        <div className="space-y-6">
            {users.map(user => (
                <UserCard key={user.id} user={user} roles={roles} permissions={permissions} />
            ))}
        </div>
        </div>
        </AuthenticatedLayout>
    );
}

function UserCard({ user, roles, permissions }) {
    const [userRoles, setUserRoles] = useState(user.roles.map(r => r.name));

    const toggleRole = (roleName, checked) => {
        const updatedRoles = checked
            ? [...userRoles, roleName]
            : userRoles.filter(r => r !== roleName);

        setUserRoles(updatedRoles); // instantly update UI

        router.put(`/admin/users/${user.id}/roles`, {
            roles: updatedRoles,
        }, {
            preserveScroll: true,
            onSuccess: () => console.log('Roles updated'),
        });
    };

    return (
        <div className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{user.name} ({user.email})</h3>
            <label>Roles:</label>
            <div className="grid grid-cols-4 gap-2 mt-2">
                {roles.map(role => (
                    <label key={role.id} className="flex gap-2 items-center">
                        <input
                            type="checkbox"
                            checked={userRoles.includes(role.name)}
                            onChange={e => toggleRole(role.name, e.target.checked)}
                        /> {role.name}
                    </label>
                ))}
            </div>
            {/* Permissions UI (optional) */}
        </div>
    );
}
