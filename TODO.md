# TODO - Render Postgres configuration

- [ ] Verify current Render `render.yaml` already contains `DATABASE_URL` value.
- [ ] Ensure backend connection logic uses `DATABASE_URL` when set (confirm in `backend/src/db.js`).
- [ ] Ensure Render is deploying backend from `backend/` rootDir with correct startCommand.
- [ ] Run backend init locally (optional) or via logs to confirm schema creation succeeds.
- [ ] Update any missing env var wiring for SSL (if required by Postgres provider).
