import { useForm } from '@inertiajs/react'

export default function Create() {
  const { data, setData, post, processing } = useForm({
    subject: '',
    body: ''
  });

  return (
    <form onSubmit={e => { e.preventDefault(); post(route('newsletters.store')) }}>
      <div>
        <label>Subject</label>
        <input value={data.subject} onChange={e => setData('subject', e.target.value)} />
      </div>
      <div>
        <label>Body</label>
        <textarea value={data.body} onChange={e => setData('body', e.target.value)} />
      </div>
      <button disabled={processing} className="bg-blue-500 text-white p-2 rounded">Send Newsletter</button>
    </form>
  );
}
