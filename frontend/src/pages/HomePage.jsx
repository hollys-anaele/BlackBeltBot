import { useEffect, useState } from "react";
import { api } from "../api/client.js";

export default function HomePage() {
  const [health, setHealth] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .health()
      .then(setHealth)
      .catch(() => setError("Java API is not reachable yet. Start the backend on port 8080."));
  }, []);

  return (
    <section className="page">
      <p className="eyebrow">Full-stack template</p>
      <h1>React, Java, and Supabase in one project.</h1>
      <p className="lede">
        The browser talks only to Spring Boot. Spring Boot owns the database
        connection to Supabase Postgres.
      </p>

      <div className="card-grid">
        <article className="card">
          <h2>Frontend</h2>
          <p>Vite + React (JavaScript) on port 5173.</p>
        </article>
        <article className="card">
          <h2>Backend</h2>
          <p>Spring Boot REST API on port 8080.</p>
        </article>
        <article className="card">
          <h2>Database</h2>
          <p>Supabase Postgres, schema in <code>supabase/migrations</code>.</p>
        </article>
      </div>

      <div className={`status ${error ? "status-warn" : "status-ok"}`}>
        {error
          ? error
          : health
            ? `API ${health.status} · database ${health.database}`
            : "Checking API health..."}
      </div>
    </section>
  );
}
