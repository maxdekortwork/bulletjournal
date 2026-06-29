# Bullet journal TB-instroom

Digitale bullet-journalwebsite voor Technische Bedrijfskunde Tilburg, jaar 1 periode 4.

## Lokaal draaien

```bash
npm install
npm run dev
```

Open daarna `http://127.0.0.1:5173`.

## Controleren

```bash
npm run lint
npm run build
```

## Deploy naar Vercel

1. Upload of push deze map als projectroot: `bullet-journal-site`.
2. Kies in Vercel het framework `Vite`.
3. Build command: `npm run build`.
4. Output directory: `dist`.

Alle bewijsbestanden staan in `public/evidence`, waardoor ze na deploy zichtbaar en downloadbaar blijven.
