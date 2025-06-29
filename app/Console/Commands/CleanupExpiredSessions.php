<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class CleanupExpiredSessions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'maintenance:cleanup-sessions {--dry-run}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete expired user sessions';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $expired = DB::table('sessions')
            ->where('last_activity', '<', now()->subMinutes(config('session.lifetime'))->timestamp);

        if ($this->option('dry-run')) {
            $this->info("Dry run: {$expired->count()} expired sessions found.");
            return;
        }

        $count = $expired->delete();
        $this->info("Deleted {$count} expired sessions.");
    }
}
