# VideoTEKA+ 📺

Moderna web aplikacija za pregled i upravljanje filmovima i serijama sa TMDB API integracijom.

## 🚀 Značajke

- **Pregled filmova i serija** - Dohvaćanje podataka sa TMDB API-ja
- **Pretraživanje** - Napredna pretraga filmova i serija
- **Korisničke funkcionalnosti**:
  - Registracija i prijava
  - Favoriti (omiljeni naslovi)
  - Watchlist (lista za gledanje)
- **Admin panel** - Upravljanje filmovima u bazi
- **Responsive dizajn** - Prilagođeno za sve uređaje

## 🛠️ Tehnologije

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT autentifikacija
- TMDB API integracija

### Frontend
- React 18
- Vite
- React Router
- Zustand (state management)
- Tailwind CSS
- Axios

## 📦 Instalacija

### 1. Klonirajte repozitorij i instalirajte backend

```bash
npm install
```

### 2. Kreirajte .env file

```bash
cp .env.example .env
```

Uredite `.env` i dodajte svoje podatke:
- MongoDB URI
- JWT secret
- **TMDB API key** (registrirajte se na https://www.themoviedb.org/settings/api)

### 3. Instalirajte frontend

```bash
cd client
npm install
```

## 🎬 Kako dobiti TMDB API Key

1. Idite na https://www.themoviedb.org/
2. Registrirajte se / prijavite se
3. Idite na Settings → API
4. Zatražite API key (besplatno)
5. Kopirajte API key u `.env` file

## 🚀 Pokretanje

### Development mode

**Terminal 1 - Backend:**
```bash
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

Backend: http://localhost:5000
Frontend: http://localhost:3000

### Production build

```bash
cd client
npm run build
```

## 📁 Struktura projekta

```
VideoTEKA-/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/  # React komponente
│   │   ├── pages/       # Stranice
│   │   ├── services/    # API servisi
│   │   ├── store/       # Zustand store
│   │   └── utils/       # Utility funkcije
├── controllers/         # Express controlleri
├── models/             # Mongoose modeli
├── routes/             # API rute
├── middleware/         # Custom middleware
└── server.js          # Entry point

```

## 🔑 API Rute

### Auth
- `POST /api/auth/register` - Registracija
- `POST /api/auth/login` - Prijava
- `GET /api/auth/me` - Trenutni korisnik

### TMDB
- `GET /api/tmdb/trending/:type/:timeWindow`
- `GET /api/tmdb/search`
- `GET /api/tmdb/details/:type/:id`
- `GET /api/tmdb/popular`
- `GET /api/tmdb/top-rated`

### Users (Protected)
- `GET /api/users/favorites`
- `POST /api/users/favorites`
- `DELETE /api/users/favorites/:tmdbId`
- `GET /api/users/watchlist`
- `POST /api/users/watchlist`
- `DELETE /api/users/watchlist/:tmdbId`

### Movies (Admin)
- `GET /api/movies`
- `POST /api/movies`
- `PUT /api/movies/:id`
- `DELETE /api/movies/:id`
- `PATCH /api/movies/:id/featured`

## 👤 Admin račun

Nakon registracije, ručno promijenite `role` na `admin` u MongoDB bazi:

```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## 📝 Licenca

ISC
