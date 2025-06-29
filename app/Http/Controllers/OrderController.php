<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Events\OrderPlaced;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function checkout()
    {
        return Inertia::render('Orders/Checkout');
    }

    public function place(Request $request)
    {
        $order = Order::create([
            'user_id' => auth()->id(),
            'product' => $request->product,
            'quantity' => $request->quantity,
            'total' => $request->quantity * 100, // dummy rate
        ]);

        event(new OrderPlaced($order));
        return redirect()->route('orders.success');
    }

    public function success()
    {
        return Inertia::render('Orders/Success');
    }
}
