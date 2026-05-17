# Attendance Management Employee

A simple employee attendance system with:

- Employee login
- Device binding for company laptop verification
- Check-in and check-out with location validation
- Admin panel for employees, office settings, imports, exports, and monthly summary
- PostgreSQL database support
- Render backend deployment
- Vercel/static frontend deployment

## Project Structure

```text
.
|-- backend/        # Node.js API server
|-- frontend/       # Static frontend server and public files
|-- render.yaml     # Render backend + PostgreSQL blueprint
`-- package.json    # Root dev script
```

## Requirements

- Node.js 22 or newer
- PostgreSQL database
- npm

For production deployment:

- Render account for backend and PostgreSQL
- Vercel account for frontend

## Local Setup

Install dependencies:

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

Create a backend environment file:

```bash
cp backend/.env.example backend/.env
```

On Windows PowerShell, you can create/edit the file manually:

```powershell
notepad backend\.env
```

Example `backend/.env`:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000
ADMIN_PASSWORD=admin123
```

Important: use Render's **External Database URL** for local development. The internal Render database URL only works from inside Render.

Run the app:

```bash
npm run dev
```

Local URLs:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:4000/api`
- Health check: `http://localhost:4000/api/health`

## Environment Variables

### Backend

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string. |
| `NODE_ENV` | No | Use `production` on Render, `development` locally. |
| `ADMIN_PASSWORD` | Recommended | Admin login password. If changed, backend syncs it on restart. |
| `ALLOWED_ORIGINS` | Recommended | Comma-separated allowed frontend origins. Use `*` if needed. |
| `OFFICE_ALLOWED_IPS` | No | Comma-separated office IP allowlist for attendance. |

Do not commit `backend/.env`. It is ignored by Git.

## Admin Password

The admin password is controlled by `ADMIN_PASSWORD`.

Locally:

```env
ADMIN_PASSWORD=****
```

On Render:

1. Open the backend service.
2. Go to **Environment**.
3. Add or update `ADMIN_PASSWORD`.
4. Redeploy or restart the backend.

When the backend starts, it updates the stored admin password to match `ADMIN_PASSWORD`.

## Frontend API URL

The frontend API base is configured in:

```text
frontend/public/config.js
```

Local frontend automatically uses:

```text
http://localhost:4000/api
```

Production frontend uses:

```text
https://attendence-management-employee-2.onrender.com/api
```

If your Render backend URL changes, update `frontend/public/config.js`.

## Render Backend Deployment

This project includes `render.yaml`.

Render creates:

- A Node web service from `backend/`
- A PostgreSQL database named `attendance-postgres`
- `DATABASE_URL` wired automatically from the database connection string

Required Render env values:

```env
ADMIN_PASSWORD=your-admin-password
ALLOWED_ORIGINS=*
```

For better security, replace `*` with your Vercel frontend URL:

```env
ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
```

Backend health check:

```text
https://your-render-backend.onrender.com/api/health
```

## Vercel Frontend Deployment

Deploy the `frontend/` folder on Vercel.

Recommended Vercel settings:

- Framework Preset: Other
- Root Directory: `frontend`
- Build Command: leave empty
- Output Directory: `public`

If Vercel asks for a command, use:

```bash
npm install
```

The frontend is static and served from `frontend/public`.

## Common Issues

### `DATABASE_URL: missing`

The backend cannot find `DATABASE_URL`.

Fix:

- Locally: add it to `backend/.env`
- Render: make sure `DATABASE_URL` is wired from the Render database or set in env

### `ECONNREFUSED 127.0.0.1:5432`

The backend is trying to connect to local PostgreSQL.

Fix:

- Add `DATABASE_URL` to `backend/.env`
- Use the External Database URL for local development

### `getaddrinfo ENOTFOUND dpg-...`

You are using Render's internal database hostname locally.

Fix:

- Use Render's External Database URL locally

### Admin login says `Failed to fetch`

Usually caused by CORS or backend being unreachable.

Fix:

- Check backend health URL
- Set `ALLOWED_ORIGINS=*` or your exact Vercel URL in Render
- Redeploy/restart Render backend

### Admin login says `Invalid admin password`

The request reached the backend, but the password is wrong.

Fix:

- Set `ADMIN_PASSWORD` in Render
- Restart/redeploy backend
- Try the new password

## Useful Commands

Run both backend and frontend:

```bash
npm run dev
```

Run backend only:

```bash
npm run dev --prefix backend
```

Run frontend only:

```bash
npm run dev --prefix frontend
```

Check backend health:

```bash
curl http://localhost:4000/api/health
```
