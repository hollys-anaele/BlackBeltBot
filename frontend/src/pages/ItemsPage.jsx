import { useEffect, useState } from "react";
import { api } from "../api/client.js";

const emptyForm = { title: "", body: "" };

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadItems() {
    setError("");
    try {
      const data = await api.listItems();
      setItems(data);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      await api.createItem(form);
      setForm(emptyForm);
      await loadItems();
    } catch (saveError) {
      setError(saveError.message);
    }
  }

  async function handleDelete(id) {
    setError("");
    try {
      await api.deleteItem(id);
      await loadItems();
    } catch (deleteError) {
      setError(deleteError.message);
    }
  }

  return (
    <section className="page">
      <p className="eyebrow">End-to-end check</p>
      <h1>Sample items</h1>
      <p className="lede">
        This page creates and lists rows in the Supabase <code>items</code> table
        through the Java API.
      </p>

      <form className="card form" onSubmit={handleSubmit}>
        <label>
          Title
          <input
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
            required
          />
        </label>
        <label>
          Body
          <textarea
            value={form.body}
            onChange={(event) => setForm({ ...form, body: event.target.value })}
            required
            rows={3}
          />
        </label>
        <button type="submit">Save item</button>
      </form>

      {error ? <p className="status status-warn">{error}</p> : null}

      {loading ? (
        <p>Loading items...</p>
      ) : (
        <ul className="item-list">
          {items.length === 0 ? <li className="card">No items yet.</li> : null}
          {items.map((item) => (
            <li key={item.id} className="card item-row">
              <div>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </div>
              <button type="button" className="ghost" onClick={() => handleDelete(item.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
