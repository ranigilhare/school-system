<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendHealthCheckEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'notify:health-check';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send system health notification to admin';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $data = [
            'php_version' => phpversion(),
            'laravel_version' => app()->version(),
            'uptime' => shell_exec('uptime'),
        ];

        Mail::raw("System Health Check\n\nPHP: {$data['php_version']}\nLaravel: {$data['laravel_version']}\nUptime: {$data['uptime']}", function ($msg) {
            $msg->to('admin@example.com')
                ->subject('System Health Report');
        });

        $this->info("Health check email sent.");
    }
}
