# VideoTEKA+ - Implementirane funkcionalnosti

## ✅ Završene funkcionalnosti

### 🎬 TMDB API Integracija
- Dohvaćanje trending filmova i serija
- Pretraga filmova i TV serija
- Detaljne informacije o filmovima/serijama
- **YouTube traileri** - automatsko prikazivanje trailera na Details stranici
- Žanrovi i ratings
- Backdrop i poster slike

### 📺 TV Serije
- **Prikaz svih sezona** - grid sa svim sezonama na Details stranici
- Broj epizoda po sezoni
- Datumi objavljivanja sezona
- Status serije (Returning Series, Ended, itd.)

### 👤 Autentifikacija
- Registracija korisnika
- Login sistem
- JWT tokeni
- Admin i obični korisnici
- Protected routes

### ❤️ Korisničke liste
- Dodavanje u omiljene (Favorites)
- Watchlist funkcionalnost
- Prikaz korisničkih favorita
- Uklanjanje iz lista

### 💬 Recenzije i Komentari
- **Dodavanje recenzija** sa ocjenom 1-5 zvjezdica
- **Komentiranje recenzija** - reply sistem
- **Like sistem** - korisnici mogu likeati recenzije
- Prikaz autora i datuma
- Minimum 10 znakova za recenziju
- Nested replies sa odvojenim prikazom

### 🎨 UI/UX Poboljšanja
- **Uklonjeno "Pogledaj" dugme** sa naslovne stranice
- **Popravljeno "Više informacija"** - sada je Link umjesto button
- Responsive design sa Tailwind CSS
- Loading states
- Error handling
- Smooth transitions

### 🔐 Admin Panel
- CRUD operacije za filmove
- Označavanje featured sadržaja
- Admin-only routes

## 🚀 Kako pokrenuti projekt

### Backend
```bash
npm run dev
# Radi na http://localhost:5000
```

### Frontend
```bash
cd client
npm run dev
# Radi na http://localhost:3000
```

## 📦 Tehnologije

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT autentifikacija
- TMDB API (API Key: 238b3868cb0f98251613160cbfe735fd)
- bcryptjs za hash lozinki

### Frontend
- React 18
- Vite
- React Router
- Zustand (state management)
- Tailwind CSS
- Axios

## 🔑 Environment Variables

Kreiraj `.env` file u root direktoriju:

```env
MONGODB_URI=mongodb+srv://dbUser:dbUserpassword@videoteka.hb9tllh.mongodb.net/videoteka
JWT_SECRET=videoteka-super-secret-jwt-key-2024
TMDB_API_KEY=238b3868cb0f98251613160cbfe735fd
TMDB_BASE_URL=https://api.themoviedb.org/3
```

**NAPOMENA**: `.env` file je u `.gitignore` i neće biti pushed na GitHub iz sigurnosnih razloga.

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Registracija
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Dohvati trenutnog usera

### TMDB
- `GET /api/tmdb/trending/:type` - Trending (movie/tv)
- `GET /api/tmdb/popular/:type` - Popular
- `GET /api/tmdb/search/:type?query=...` - Search
- `GET /api/tmdb/details/:type/:id` - Details (uključuje videos/trailers)

### User
- `POST /api/user/favorites` - Dodaj u favorite
- `GET /api/user/favorites` - Dohvati favorite
- `DELETE /api/user/favorites/:tmdbId` - Ukloni iz favorita
- `POST /api/user/watchlist` - Dodaj u watchlist
- `GET /api/user/watchlist` - Dohvati watchlist

### Reviews
- `GET /api/reviews/:type/:tmdbId` - Dohvati sve recenzije
- `POST /api/reviews` - Dodaj recenziju
- `POST /api/reviews/:id/reply` - Odgovori na recenziju
- `PUT /api/reviews/:id/like` - Toggle like
- `DELETE /api/reviews/:id` - Obriši recenziju (samo autor ili admin)

### Admin Movies
- `POST /api/movies` - Dodaj film (admin)
- `GET /api/movies` - Svi filmovi
- `PUT /api/movies/:id` - Ažuriraj film (admin)
- `DELETE /api/movies/:id` - Obriši film (admin)

## 🎯 Posebne funkcionalnosti

### YouTube Trailer Integration
Details stranica automatski:
1. Dohvaća video podatke iz TMDB API-ja
2. Filtrira YouTube trailere
3. Prikazuje embedded YouTube player
4. Responsive aspect-ratio 16:9

### TV Show Seasons Display
Za svaku sezonu prikazuje:
- Poster slike sezona
- Naziv sezone (Season 1, 2, ...)
- Broj epizoda
- Godina izlaska
- Grid layout responsive

### Review System Features
- Star rating slider (1-5)
- Comment validation (min 10 znakova)
- Reply threading
- Like counter
- User info i timestamps
- Sortiranje (najnoviji prvo)

## 🐛 Riješeni Bugovi

1. **dotenv problem** - .env file nije učitavao ENV varijable
   - **Rješenje**: Import dotenv PRIJE svih drugih importa u server.js
   
2. **Duplicate index warning** - tmdbId imao dupli index
   - **Rješenje**: Uklonjeno `movieSchema.index({ tmdbId: 1 })` jer već postoji `unique: true`

3. **"Više informacija" button ne radi**
   - **Rješenje**: Zamijenjen button sa Link komponentom iz react-router-dom

## 🎨 Design Decisions

- **Dark mode** - Tamna tema za bolji viewing experience
- **Red accent** (#dc2626) - Primary boja za call-to-actions
- **Grid layouts** - Responsive grids za movies/seasons
- **Smooth animations** - Hover effects i transitions
- **Loading states** - Spinner za async operacije
