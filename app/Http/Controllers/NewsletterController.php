<?php

namespace App\Http\Controllers;

use App\Models\Newsletter;
use App\Jobs\SendBulkNewsletterJob;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsletterController extends Controller
{
    public function create()
    {
        return Inertia::render('Newsletters/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'subject' => 'required|string|max:255',
            'body' => 'required|string',
        ]);

        $newsletter = Newsletter::create($data);

        dispatch(new SendBulkNewsletterJob($newsletter));

        return redirect()->route('newsletters.dashboard')
            ->with('success', 'Newsletter queued for sending!');
    }

    public function dashboard()
    {
        return Inertia::render('Newsletters/Dashboard', [
            'status' => session('success'),
        ]);
    }
}
