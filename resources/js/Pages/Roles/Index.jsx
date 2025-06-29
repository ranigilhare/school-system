// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
// import { useForm, usePage } from '@inertiajs/react'
// import { useState } from 'react'

// export default function RoleIndex() {
//   const { roles, permissions } = usePage().props
//   const [selectedRole, setSelectedRole] = useState(null)
//   const roleForm = useForm({ name: '' })

//   const handleCreate = () => {
//     roleForm.post(route('roles.store'), {
//       onSuccess: () => roleForm.reset()
//     })
//   }

//   const togglePermission = (role, permissionName) => {
//     const current = role.permissions.map(p => p.name)
//     const updated = current.includes(permissionName)
//       ? current.filter(p => p !== permissionName)
//       : [...current, permissionName]

//     axios.post(route('roles.permissions.sync', role.id), { permissions: updated })
//   }

//   return (
//     <AuthenticatedLayout>
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">Roles Management</h2>

//       <div className="mb-4 flex gap-2">
//         <input
//           className="border p-2 rounded w-full"
//           placeholder="New role name"
//           value={roleForm.name}
//           onChange={e => roleForm.setData('name', e.target.value)}
//         />
//         <button onClick={handleCreate} className="bg-blue-500 text-white px-4 rounded">Add</button>
//       </div>

//       <div className="space-y-6">
//         {roles.map(role => (
//           <div key={role.id} className="border p-4 rounded shadow">
//             <h3 className="text-lg font-semibold">{role.name}</h3>
//             <div className="grid grid-cols-3 gap-2 mt-2">
//               {permissions.map(p => (
//                 <label key={p.id} className="flex gap-2 items-center">
//                   <input
//                     type="checkbox"
//                     checked={role.permissions.some(rp => rp.name === p.name)}
//                     onChange={() => togglePermission(role, p.name)}
//                   />
//                   {p.name}
//                 </label>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//     </AuthenticatedLayout>
//   )
// }


import { useForm, usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import Modal from '@/Components/Modal'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

export default function RoleIndex() {
  // const { roles, permissions } = usePage().props
  const [roleList, setRoleList] = useState([])
  const [permissions, setPermission] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRole, setSelectedRole] = useState(null)
  const createForm = useForm({ name: '' })
  const editForm = useForm({ name: '' })
  
  useEffect(() => {
    fetchRole();
    // setRoleList(roles);
  }, [])

  const fetchRole = () => {
     axios.get(route('roles.index'))
      .then(res => {
        setRoleList(res.data.roles)
        setPermission(res.data.permissions)
      })
      .catch(err => {
        console.error('Failed to fetch roles:', err)
        toast.error('Failed to load roles')
      })
      .finally(() => setLoading(false))
  }

  const handleCreate = () => {
    // createForm.post(route('roles.store'), {
    //   onSuccess: () => createForm.reset()
    // })

    axios
      .post(route('roles.store'), {
        name: createForm.data.name
      })
      .then(res => {
        toast.success(res.data.message);
        createForm.reset();
        fetchRole();
      })
      .catch(err => {
        console.error('Update failed:', err.response?.data || err.message);
        toast.error('Something went wrong');
      });
  }

  const handleEdit = role => {
    setSelectedRole(role)
    editForm.setData('name', role.name)
  }

  const updateRole = () => {
    axios
      .put(route('roles.update', selectedRole.id), {
        name: editForm.data.name
      })
      .then(res => {
        toast.success(res.data.message);
        fetchRole();
        setSelectedRole(null);
      })
      .catch(err => {
        console.error('Update failed:', err.response?.data || err.message);
        toast.error('Something went wrong');
      });
  }

  const deleteRole = () => {
    if (confirm('Are you sure?')) {
        axios
          .delete(route('roles.destroy', selectedRole.id))
          .then(res => {
            toast.success(res.data.message);
            fetchRole();
            setSelectedRole(null);
          })
          .catch(err => {
            console.error('Update failed:', err.response?.data || err.message);
            toast.error('Something went wrong');
          });
    }
  }
    
   // from Inertia
  const togglePermission = (roleId, permissionName, checked) => {
  setRoleList(prev =>
    prev.map(role => {
      if (role.id !== roleId) return role

      const current = role.permissions.map(p => p.name)
      const updated = checked
        ? [...current, permissionName]
        : current.filter(p => p !== permissionName)


      // Optimistically update UI
      axios.post(route('roles.permissions.sync', roleId), { permissions: updated })
      .then(res => {
        toast.success(res.data.message);
        fetchRole();
        setSelectedRole(null);
      })
      .catch(err => {
        console.error('Update failed:', err.response?.data || err.message);
        toast.error('Something went wrong');
      });
      return {
        ...role,
        permissions: updated.map(name => ({ name }))
      }
    })
  )
}

  return (
    <AuthenticatedLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Roles Management</h2>

        {/* Create Role */}
        <div className="mb-4 flex gap-2">
          <input
            className="border p-2 rounded w-full"
            placeholder="New role name"
            value={createForm.name}
            onChange={e => createForm.setData('name', e.target.value)}
          />
          <button onClick={handleCreate} className="bg-blue-500 text-white px-4 rounded">Add</button>
        </div>

        {/* Roles List */}
        <div className="space-y-6">
          {roleList.map(role => (
            <div key={role.id} className="border p-4 rounded shadow">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{role.name}</h3>
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => handleEdit(role)}
                >
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {permissions.map(p => (
                  <label key={p.id} className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={role.permissions.some(rp => rp.name === p.name)}
                      onChange={(e) => togglePermission(role.id, p.name, e.target.checked)}
                    />
                    {p.name}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <Modal show={!!selectedRole} onClose={() => setSelectedRole(null)} title="Edit Role">
          <div className="p-4">
            <input
              className="border p-2 w-full rounded"
              value={editForm.data.name}
              onChange={e => editForm.setData('name', e.target.value)}
              placeholder="Edit Role"
            />
            <div className="flex gap-2 py-2">
              <button onClick={updateRole} className="bg-green-600 text-white px-4 py-1 rounded">Update</button>
              <button onClick={deleteRole} className="bg-red-600 text-white px-4 py-1 rounded">Delete</button>
            </div>
          </div>
        </Modal>
      </div>
    </AuthenticatedLayout>
  )
}
