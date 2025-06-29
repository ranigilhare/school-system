<?php

namespace App\Listeners;

use App\Events\OrderPlaced;
use Illuminate\Support\Facades\Notification;
use App\Notifications\OrderWarehouseNotification;

class NotifyWarehouse
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(OrderPlaced $event)
    {
        Notification::route('mail', 'warehouse@example.com')
            ->notify(new OrderWarehouseNotification($event->order));
    }
}
