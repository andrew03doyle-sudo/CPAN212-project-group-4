# WatchList API

This is the backend API for our WatchList project. It lets users add, view, update, and delete shows and watchlist entries. We also use the TVmaze API to search for TV shows.

## How to Run

You need Node.js 24 or newer.

Open the project in VS Code, open a terminal, and run:

```bash
cd api
npm install
npm run dev
```

The server runs at `http://localhost:4000`.

## Environment Variables

The `.env.example` file shows the settings used for the API. Copy it into a `.env` file if needed.

| Variable | Default | Purpose |
|---|---|---|
| PORT | 4000 | Port the server runs on |
| TVMAZE_TIMEOUT_MS | 5000 | How long to wait for TVmaze |
| CACHE_TTL_MS | 60000 | How long search results are saved |

TVmaze does not require an API key.

## API Endpoints

### Watchlist

| Method | Endpoint | What it does |
|---|---|---|
| GET | `/api/watchlist` | Get all watchlist entries |
| GET | `/api/watchlist/:id` | Get one entry |
| POST | `/api/watchlist` | Add an entry |
| PUT | `/api/watchlist/:id` | Update an entry |
| DELETE | `/api/watchlist/:id` | Delete an entry |

### Shows

| Method | Endpoint | What it does |
|---|---|---|
| GET | `/api/shows` | Get all shows |
| GET | `/api/shows/:id` | Get one show |
| POST | `/api/shows` | Add a show |
| PUT | `/api/shows/:id` | Update a show |
| DELETE | `/api/shows/:id` | Delete a show |

### TVmaze

| Method | Endpoint | What it does |
|---|---|---|
| GET | `/api/search/shows?q=office` | Search for shows using TVmaze |

The Watchlist and Shows resources are stored in arrays, so the data resets when the server restarts.

We originally planned our resources differently in M1, but for M2 we used Watchlist and Shows.

## Testing

We used curl to test the API. Run these commands in Git Bash with the server running.

### Watchlist Tests

Get all entries — 200:
```bash
curl -i http://localhost:4000/api/watchlist
```

Get one entry — 200:
```bash
curl -i http://localhost:4000/api/watchlist/1
```

Add an entry — 201:
```bash
curl -i -X POST http://localhost:4000/api/watchlist -H "Content-Type: application/json" -d '{"userId":1,"showId":999,"watched":false,"currentSeason":1,"currentEpisode":1,"rating":4}'
```

Update an entry — 200:
```bash
curl -i -X PUT http://localhost:4000/api/watchlist/1 -H "Content-Type: application/json" -d '{"userId":1,"showId":169,"watched":true,"currentSeason":2,"currentEpisode":5,"rating":5}'
```

Delete an entry — 204:
```bash
curl -i -X DELETE http://localhost:4000/api/watchlist/3
```

### Shows Tests

Get all shows — 200:
```bash
curl -i http://localhost:4000/api/shows
```

Get one show — 200:
```bash
curl -i http://localhost:4000/api/shows/1
```

Add a show — 201:
```bash
curl -i -X POST http://localhost:4000/api/shows -H "Content-Type: application/json" -d '{"title":"Lost","genre":"Drama","seasons":6}'
```

Update a show — 200:
```bash
curl -i -X PUT http://localhost:4000/api/shows/1 -H "Content-Type: application/json" -d '{"title":"Breaking Bad","genre":"Crime","seasons":5}'
```

Delete a show — 204:
```bash
curl -i -X DELETE http://localhost:4000/api/shows/3
```

### TVmaze Test

Search for a show — 200:
```bash
curl -i "http://localhost:4000/api/search/shows?q=office"
```

Running the same search twice within 60 seconds should show a cache-hit message in the server terminal.

### Error Tests

Invalid show information — 400:
```bash
curl -i -X POST http://localhost:4000/api/shows -H "Content-Type: application/json" -d '{"title":"","genre":"","seasons":0}'
```

Invalid watchlist information — 400:
```bash
curl -i -X POST http://localhost:4000/api/watchlist -H "Content-Type: application/json" -d '{"userId":0,"showId":0,"watched":"yes","currentSeason":0,"currentEpisode":0}'
```

Show not found — 404:
```bash
curl -i http://localhost:4000/api/shows/99999
```

Watchlist entry not found — 404:
```bash
curl -i http://localhost:4000/api/watchlist/99999
```

Unknown route — 404:
```bash
curl -i http://localhost:4000/api/unknown
```

### TVmaze Error Tests

**502 — TVmaze API error**

We tested this by temporarily using an invalid TVmaze URL in `src/lib/tvmaze.js`.

```bash
curl -i "http://localhost:4000/api/search/shows?q=error-test-987654"
```

This returned a 502 error. The correct TVmaze URL was restored afterward.

**504 — TVmaze timeout**

We temporarily changed `TVMAZE_TIMEOUT_MS` to `1` in `.env` and restarted the server.

```bash
curl -i "http://localhost:4000/api/search/shows?q=timeout-test-987654"
```

This returned a 504 timeout error. We then changed the timeout back to `5000`.

## Status Codes

| Code | Meaning |
|---|---|
| 200 | Request worked |
| 201 | Item created |
| 204 | Item deleted |
| 400 | Invalid information |
| 404 | Item or route not found |
| 502 | TVmaze API error |
| 504 | TVmaze timeout |

## Notes

The API uses Express 5 and Node.js 24. It stores data in memory and uses UUIDs for new records.

TVmaze search results are saved in a temporary cache to avoid making the same request repeatedly.

The Watchlist and Shows routes have their own controllers and validation files.