<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Order;
use Illuminate\Support\Facades\Storage;

class GenerateSalesReport extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'report:generate-sales';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate monthly sales report';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $month = now()->subMonth()->format('Y-m');
        $orders = Order::whereBetween('created_at', [
            now()->subMonth()->startOfMonth(),
            now()->subMonth()->endOfMonth(),
        ])->get();

        $total = $orders->sum('total');
        $count = $orders->count();

        $csv = "Order ID,Product,Quantity,Total\n";
        foreach ($orders as $order) {
            $csv .= "{$order->id},{$order->product},{$order->quantity},{$order->total}\n";
        }

        $csv .= "\nTotal Orders: $count\nTotal Amount: ₹$total";

        $filename = "reports/sales-report-{$month}.csv";
        Storage::disk('local')->put($filename, $csv);

        $this->info("Sales report generated: storage/app/{$filename}");
    }
}
