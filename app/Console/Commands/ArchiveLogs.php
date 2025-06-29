<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class ArchiveLogs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'maintenance:archive-logs';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Archive and compress log files older than 7 days';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $logPath = storage_path('logs');
        $archivePath = storage_path('logs/archive');
        File::ensureDirectoryExists($archivePath);

        $archived = 0;

        foreach (File::files($logPath) as $file) {
            if (now()->diffInDays($file->getCTime()) >= 7) {
                $dest = $archivePath . '/' . $file->getFilename() . '.gz';
                file_put_contents($dest, gzencode(file_get_contents($file->getPathname()), 9));
                unlink($file->getPathname());
                $archived++;
            }
        }

        $this->info("Archived {$archived} old log files.");
    }
}
