import { useEffect, useState } from "react";

const STATUS = ["New", "In Progress", "Completed", "On Hold", "Cancelled"];

export default function AdminDashboard() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/getRequests");
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Failed to load");
        setRows(json.data || []);
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function saveStatus(id, status) {
    // optimistic UI
    setRows(prev => prev.map(r => (r.id === id ? { ...r, status } : r)));
    const res = await fetch("/api/updateRequest", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      alert(`Save failed: ${j?.error || res.statusText}`);
    }
  }

  if (loading) return <main className="p-6">Loading…</main>;
  if (err) return <main className="p-6 text-red-600">Error: {err}</main>;

  const fmt = s => (s ? new Date(s).toLocaleString() : "-");

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Maintenance Requests</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr>
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Created</th>
              <th className="border px-2 py-1">Property</th>
              <th className="border px-2 py-1">Type</th>
              <th className="border px-2 py-1">Urgency</th>
              <th className="border px-2 py-1">Description</th>
              <th className="border px-2 py-1">Contact</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Photo</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td className="border px-2 py-1">{r.id}</td>
                <td className="border px-2 py-1">{fmt(r.created_at)}</td>
                <td className="border px-2 py-1">{r.property}</td>
                <td className="border px-2 py-1">{r.type}</td>
                <td className="border px-2 py-1">{r.urgency}</td>
                <td className="border px-2 py-1">{r.description}</td>
                <td className="border px-2 py-1">{r.contact}</td>
                <td className="border px-2 py-1">
                  <select
                    className="border px-1 py-0.5"
                    value={r.status || "New"}
                    onChange={e => saveStatus(r.id, e.target.value)}
                  >
                    {STATUS.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="border px-2 py-1">
                  {r.photo_url ? (
                    <a className="underline" href={r.photo_url} target="_blank" rel="noreferrer">View</a>
                  ) : "-"}
                </td>
              </tr>
            ))}
            {!rows.length && (
              <tr><td className="border px-2 py-3 text-center" colSpan={9}>No requests found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
