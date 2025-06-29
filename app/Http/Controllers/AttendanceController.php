<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    public function index() {
        // logic to fetch attendance details
        return Inertia::render('Student/Attendance');
    }

}
