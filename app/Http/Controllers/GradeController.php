<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class GradeController extends Controller
{
    public function index() {
        // logic to fetch student grades
        return Inertia::render('Student/Grades');
    }

    public function studentGrades() {
        // logic to fetch grades of logged in student
        return Inertia::render('Student/Grades');
    }
}
