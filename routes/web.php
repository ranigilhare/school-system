<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });


Route::get('/', function() {
    if (!Auth::check()) {
        return Inertia::render('Auth/Login');
    }

    $user = Auth::user();
    
    if ($user->roles->isEmpty()) {
        Auth::logout();                 
        return Inertia::render('Auth/Login', [
            'showAdminLogin' => true
        ]);
    }

    // Redirect based on role
    if ($user->hasRole('admin')) {
        return redirect()->route('admin.dashboard');
    } elseif ($user->hasRole('teacher')) {
        return redirect()->route('teacher.dashboard');
    } elseif ($user->hasRole('student')) {
        return redirect()->route('student.dashboard');
    }
    
    return Inertia::render('Auth/Login');
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', fn() => Inertia::render('Admin/Dashboard'))->name('admin.dashboard');
    Route::get('/admin/users', [UserController::class, 'index'])->name('admin.users');
    Route::put('/admin/users/{user}/roles', [UserController::class, 'updateRoles']);
    Route::put('/admin/users/{user}/permissions', [UserController::class, 'updatePermissions']);

    Route::get('/roles/page', fn() => Inertia::render('Roles/Index'))->name('roles.page');;
    Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');
    Route::post('/roles', [RoleController::class, 'store'])->name('roles.store');
    Route::put('/roles/{role}', [RoleController::class, 'update'])->name('roles.update');
    Route::delete('/roles/{role}', [RoleController::class, 'destroy'])->name('roles.destroy');
    Route::post('/roles/{role}/permissions', [RoleController::class, 'syncPermissions'])->name('roles.permissions.sync');
});

Route::middleware(['auth', 'role:teacher'])->group(function () {
    Route::get('/teacher/dashboard', fn() => Inertia::render('Teacher/Dashboard'))->name('teacher.dashboard');
    Route::get('/teacher/grades', [GradeController::class, 'index'])->name('teacher.grades');
    Route::get('/teacher/attendance', [AttendanceController::class, 'index'])->name('teacher.attendance');
});

Route::middleware(['auth', 'role:student'])->group(function () {
    Route::get('/student/dashboard', fn() => Inertia::render('Student/Dashboard'))->name('student.dashboard');
    Route::get('/student/profile', [ProfileController::class, 'show'])->name('student.profile');
    Route::get('/student/grades', [GradeController::class, 'studentGrades'])->name('student.grades');
});

Route::middleware('auth')->group(function () {
    Route::get('/checkout', [OrderController::class, 'checkout'])->name('orders.checkout');
    Route::post('/checkout', [OrderController::class, 'place'])->name('orders.place');
    Route::get('/checkout/success', [OrderController::class, 'success'])->name('orders.success');
});

Route::middleware('auth')->group(function () {
    Route::get('/newsletters/create', [NewsletterController::class, 'create'])->name('newsletters.create');
    Route::post('/newsletters', [NewsletterController::class, 'store'])->name('newsletters.store');
    Route::get('/newsletters/dashboard', [NewsletterController::class, 'dashboard'])->name('newsletters.dashboard');
});

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');


require __DIR__.'/auth.php';
