import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react'

export default function Checkout() {
  const form = useForm({
    product: '',
    quantity: 1,
  })

  return (
    <AuthenticatedLayout>
      <div className="p-6 max-w-4xl mx-auto">
    <form onSubmit={e => { e.preventDefault(); form.post(route('orders.place')) }}>
      <div className="grid grid-cols-6 gap-2 mt-2">
        <label>Product:</label>
        <input type="text" value={form.data.product}
          onChange={e => form.setData('product', e.target.value)} />
      </div>
      <div className="grid grid-cols-6 gap-2 mt-2">
        <label>Quantity:</label>
        <input type="number" value={form.data.quantity}
          onChange={e => form.setData('quantity', e.target.value)} />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Place Order</button>
    </form>
    </div>
    </AuthenticatedLayout>
  )
}
