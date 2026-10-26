# BlackBeltBot

Template for a web app with:

- **Frontend:** React (JavaScript) + Vite
- **Backend:** Java 17 + Spring Boot
- **Database:** Supabase (Postgres)

The React app calls `/api/*` on Spring Boot. Spring Boot is the only layer that connects to Supabase.

## Project layout

```
frontend/    React UI
backend/     Spring Boot API
supabase/    SQL migrations
```

## 1. Create the database

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run `supabase/migrations/001_init.sql`.
3. Copy the database password and project ref from **Project Settings → Database**.

## 2. Configure the backend

```bash
cd backend
copy .env.example .env
```

Edit `.env`:

```
DATABASE_URL=jdbc:postgresql://db.YOUR_PROJECT_REF.supabase.co:5432/postgres?sslmode=require
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your-database-password
```

Use the **direct** Postgres connection (port 5432), not the pooler URL, unless you have also configured the pooler for JDBC.

Requires **Java 17+** and **Maven**.

```bash
cd backend
mvn spring-boot:run
```

Health check: [http://localhost:8080/api/health](http://localhost:8080/api/health)

## 3. Run the frontend

```bash
cd frontend
copy .env.example .env
npm install
npm run dev
```

UI: [http://localhost:5173](http://localhost:5173)

`VITE_API_BASE_URL` can stay as `http://localhost:8080`. In local Vite, `/api` is also proxied to the Java server.

## API surface

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/health` | API + database status |
| GET | `/api/items` | List sample rows |
| POST | `/api/items` | Create `{ "title", "body" }` |
| PUT | `/api/items/{id}` | Update a row |
| DELETE | `/api/items/{id}` | Delete a row |

Replace `items` with your real domain tables (fighters, clips, analysis) when you are ready to build product features.
