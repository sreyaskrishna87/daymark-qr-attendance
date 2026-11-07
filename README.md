# Daymark QR Attendance

Daymark is a small web app for part-time office workers. A manager adds workers and shares each person's private check-in link. Workers scan the current QR on the office kiosk when they arrive and leave.

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm start
```

Open `http://localhost:3000` for the manager dashboard and `http://localhost:3000/kiosk` for the optional rotating QR screen. For local production-mode work, set `NODE_ENV=production`, a unique `SECRET_KEY`, and `ADMIN_PASSWORD` in `.env` first. Camera access on phones requires HTTPS; localhost is treated as a secure origin by browsers.

## Deploy to Render

The GitHub repository is [sreyaskrishna87/daymark-qr-attendance](https://github.com/sreyaskrishna87/daymark-qr-attendance). The `render.yaml` blueprint configures a Node web service, a generated QR-signing secret, a manager password prompt, and a persistent disk mounted at `/var/data` for SQLite.

1. Push the latest project files to the repository's deployment branch.
2. Open the [Render Blueprint setup](https://dashboard.render.com/blueprints/new?repo=https://github.com/sreyaskrishna87/daymark-qr-attendance) and sign in.
3. Apply the blueprint. Enter a strong `ADMIN_PASSWORD` when prompted. Render generates `SECRET_KEY` and stores both as environment secrets.
4. Wait for the service to become live. Open its HTTPS URL, sign in to the manager dashboard, then set the office name, GPS coordinates, and geofence radius.
5. Set the office GPS coordinates and strict geofence. Open `/poster`, print the office QR once, and place it at the entrance. Add workers and privately send each one their personal link. Workers scan that poster on arrival and departure.

This Render setup uses a paid web service and a 1 GB persistent disk; the free web-service filesystem is temporary and can lose SQLite records when it restarts or sleeps. Check the current [Render pricing](https://render.com/pricing), [free-service storage limits](https://render.com/docs/free), and [persistent-disk details](https://render.com/docs/disks) before applying the blueprint. A persistent disk protects records across restarts; it is not a backup, so arrange regular backups before relying on the app for payroll.

## Attendance checks and limits

- The permanent poster is signed by the server and works without an office display or daily reprinting. Each scan still requires the worker's private link.
- Production scans require configured office coordinates and strict GPS enforcement. Scans reporting a location outside the geofence are rejected.
- The permanent QR does not expire and copies look identical to the office poster. GPS helps reject remote copies, but phone location can be spoofed, so this setup cannot prove physical presence in every case.
- If you later have a phone that can stay at the entrance, `/kiosk` can show the optional rotating QR instead. A rotating code rejects older photos and printouts.
- Worker links act like passwords. Share each one privately; delete and recreate a worker if a link is exposed.

In production, the manager dashboard is protected by the `ADMIN_PASSWORD` secret. Manager APIs do not allow unauthenticated worker creation, deletion, roster access, or location changes.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `PORT` | Web server port; supplied automatically by Render. |
| `SECRET_KEY` | Private HMAC signing key for office QR challenges. Required in production. |
| `ADMIN_PASSWORD` | Manager password. Required in production; keep it private. |
| `OFFICE_ID` | Identifier for this office. |
| `QR_INTERVAL_SEC` | Rotating QR lifetime in seconds; defaults to 25. |
| `DB_PATH` | SQLite file path. Render uses `/var/data/attendance.db` on its persistent disk. |
