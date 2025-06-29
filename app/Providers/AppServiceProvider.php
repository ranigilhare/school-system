<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Log;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'auth' => function () {
                Log::info(Auth::user()->getRoleNames());
                return [
                    'user' => Auth::user(),
                    'roles' => Auth::check() ? Auth::user()->getRoleNames() : [],
                ];
            },
        ]);
        Vite::prefetch(concurrency: 3);
    }
}
