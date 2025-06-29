<?php

namespace App\Jobs;

use App\Models\Newsletter;
use App\Models\Subscriber;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendBulkNewsletterJob implements ShouldQueue
{
    use InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public Newsletter $newsletter)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Subscriber::chunk(100, function ($subscribers) {
            $emails = $subscribers->pluck('email')->toArray();
            dispatch(new SendNewsletterJob($this->newsletter, $emails));
        });
    }
}
