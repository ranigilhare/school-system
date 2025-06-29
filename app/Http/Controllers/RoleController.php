<?php

namespace App\Http\Controllers;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function index()
    {
        return response()->json([
            'message' => 'Roles', 
            'roles' => Role::with('permissions')->get(),
            'permissions' => Permission::all()
        ]);
        // return Inertia::render('Roles/Index', [
        //     'roles' => Role::with('permissions')->get(),
        //     'permissions' => Permission::all()
        // ]);
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|unique:roles']);
        Role::create(['name' => $request->name]);
        // return response()->json(['message' => 'Role created successfully!'], 200);

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Role created successfully!', 'roles' => Role::with('permissions')->get()], 200);
        }

        return Inertia::render('Roles/Index', [
            'roles' => Role::with('permissions')->get()
        ]);
    }

    public function update(Request $request, Role $role)
    {
        $request->validate(['name' => 'required|unique:roles,name,' . $role->id]);
        $role->update(['name' => $request->name]);
        return response()->json(['message' => 'Role updated successfully!'], 200);
    }

    public function destroy(Role $role)
    {
        $role->delete();
        return response()->json(['message' => 'Role deleted successfully!'], 200);
    }

    public function syncPermissions(Request $request, Role $role)
    {
        $role->syncPermissions($request->permissions);
        return response()->json(['message' => 'Permissions updated succssfully!'], 200);
    }
}
