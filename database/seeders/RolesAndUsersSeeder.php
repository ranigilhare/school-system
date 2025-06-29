<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class RolesAndUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create(['name' => 'admin']);
        Role::create(['name' => 'teacher']);
        Role::create(['name' => 'student']);

        // Create dummy users
        $adminUser = User::factory()->create([ 
            'email' => 'admin@example.com', 
            'password' => Hash::make('admin123') 
        ]);
        $adminUser->assignRole('admin');

        $teacherUser = User::factory()->create([ 
            'email' => 'teacher@example.com', 
            'password' => Hash::make('teacher123') 
        ]);
        $teacherUser->assignRole('teacher');

        $studentUser = User::factory()->create([ 
            'email' => 'student@example.com', 
            'password' => Hash::make('student123') 
        ]);
        $studentUser->assignRole('student');
    }
}
