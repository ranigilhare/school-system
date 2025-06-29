<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::command('maintenance:cleanup-sessions')->dailyAt('00:00');
Schedule::command('maintenance:archive-logs')->dailyAt('00:10');
Schedule::command('report:generate-sales')->monthlyOn(1, '00:20');
Schedule::command('notify:health-check')->dailyAt('00:30');
