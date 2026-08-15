# Emoji Mood

> A simple full-stack web application for sharing current moods through emojis.

## Features

- User login
- Select and update current mood using emojis
- View other users' current moods
- Automatic updates every 5 seconds
- Responsive user interface

## Architecture

```text
React + Vite
     │
     │ HTTP / JSON
     ▼
Flask REST API
     │
     ▼
SQLite
```

The frontend uses HTTP polling every five seconds to retrieve the
latest user moods.

## Tech Stack

### Frontend

- React
- Vite
- Material UI
- Axios

### Backend

- Python
- Flask
- Flask-CORS
- SQLite

## Project Structure

```text
emoji-mood/
├── backend/
│   └── app.py
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── main.jsx
│
└── README.md
```

## API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/login` | Authenticate a user |
| POST | `/api/update_emoji` | Update user's mood |
| GET | `/api/users` | Get users and their current moods |

## Running Locally

### Backend

```bash
cd backend
pip install flask flask-cors
python app.py
```

The backend runs on:

```text
http://localhost:5000
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

## Known Limitations

This is a personal learning project and is not intended as a
production-ready authentication system.

- Passwords are currently stored as plain text.
- Authentication does not use sessions or tokens.
- Mood updates use HTTP polling instead of WebSockets.
- SQLite is used as the database.

## Future Improvements

- Secure password hashing
- Proper authentication and user registration
- Real-time updates using WebSockets
- Mood history and timestamps
- Improved validation and error handling
- Automated tests
