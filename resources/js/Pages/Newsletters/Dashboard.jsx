import { usePage } from '@inertiajs/react'

export default function Dashboard() {
  const { props } = usePage();
  return (
    <div>
      <h1> Newsletter Dashboard</h1>
      {props.status && <p style={{ color: 'green' }}>{props.status}</p>}
      <p> All emails are being sent in background via queue.</p>
    </div>
  )
}
