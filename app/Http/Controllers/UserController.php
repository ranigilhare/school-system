<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class UserController extends Controller
{
    public function index() {
        return Inertia::render('Admin/Users', [
            'users' => User::with('roles', 'permissions')->get(),
            'roles' => Role::all(),
            'permissions' => Permission::all()
        ]);
    }

    public function updateRoles(Request $request, User $user) {
        $user->syncRoles($request->roles);
        return back();
    }

    public function updatePermissions(Request $request, User $user) {
        $user->syncPermissions($request->permissions);
        return back();
    }

}
