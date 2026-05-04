<div align="center">

<br />

```
 ███████╗██╗  ██╗ ██████╗ ██╗    ██╗    ██████╗ ██████╗  ██████╗ 
 ██╔════╝██║  ██║██╔═══██╗██║    ██║    ██╔══██╗██╔══██╗██╔═══██╗
 ███████╗███████║██║   ██║██║ █╗ ██║    ██████╔╝██████╔╝██║   ██║
 ╚════██║██╔══██║██║   ██║██║███╗██║    ██╔═══╝ ██╔══██╗██║   ██║
 ███████║██║  ██║╚██████╔╝╚███╔███╔╝    ██║     ██║  ██║╚██████╔╝
 ╚══════╝╚═╝  ╚═╝ ╚═════╝  ╚══╝╚══╝    ╚═╝     ╚═╝  ╚═╝ ╚═════╝ 
```

**Showcase your projects. Discover great work. Build your developer profile.**

<br />

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![React Router](https://img.shields.io/badge/React_Router-v7-CA4245?style=flat-square&logo=react-router&logoColor=white)](https://reactrouter.com)
[![Axios](https://img.shields.io/badge/Axios-1.x-5A29E4?style=flat-square&logo=axios&logoColor=white)](https://axios-http.com)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://show-pro.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

<br />

🔗 **[Live Demo → show-pro.vercel.app](https://show-pro.vercel.app)**

<br />

</div>

---

## Table of Contents

- [What is ShowPro?](#what-is-showpro)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Dependencies](#dependencies)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Available Scripts](#available-scripts)
- [How It Works](#how-it-works)
  - [Authentication Flow](#authentication-flow)
  - [Project Feed](#project-feed)
  - [Creating a Project](#creating-a-project)
  - [Public Profiles](#public-profiles)
  - [Likes System](#likes-system)
- [Connecting to the Backend](#connecting-to-the-backend)
- [API Integration](#api-integration)
- [Deployment](#deployment)
- [Full-Stack Architecture](#full-stack-architecture)
- [Contributing](#contributing)
- [License](#license)

---

## What is ShowPro?

**ShowPro** is a full-stack developer portfolio and project showcase platform. It gives every developer a space to:

- 📢 **Publish projects** with a title, description, tech stack, preview image, GitHub link, and live demo link
- 🧑‍💻 **Build a public profile** with a bio and a curated list of their work
- 🌍 **Discover projects** from the wider developer community
- ❤️ **Like and engage** with work that inspires them

Think of it as a lightweight, developer-focused showcase platform — somewhere between a portfolio builder and a project feed.

This repo contains the **React frontend**. It handles all user interaction: auth forms, the project feed, profile pages, project creation, and the likes system — all powered by the REST API in the backend repo.

> 🔧 Backend API → [Show-pro-back](https://github.com/Puskar2Sora/Show-pro-back)

---

## Features

### 🔐 Authentication
- User registration with name, email, and password
- Login with JWT token returned from the backend
- Token persisted in `localStorage` for session continuity
- Protected routes — unauthenticated users are redirected to login
- Logout clears the stored token and resets application state

### 🏠 Community Project Feed
- Scrollable feed of all published projects from every developer
- Each project card displays: preview image, title, description excerpt, tech stack, and like count
- Click through to the author's public profile directly from any card

### 🗂️ Project Management
- Create a new project with a rich form: title, description, tech stack, GitHub URL, live demo URL, and image URL
- View your own projects on your profile page
- Delete projects you own with a single click
- All mutations give instant toast feedback via `react-hot-toast`

### ❤️ Likes System
- Like or unlike any project — one click toggles
- Like count updates immediately in the UI (optimistic update pattern)
- Likes are tracked per user — you can only like a project once

### 👤 Public Profiles
- Every registered user has a public profile page at `/profile/:id`
- Displays the user's name, bio, and all of their published projects
- Anyone (logged in or not) can browse profiles

### 🔔 Toast Notifications
- Powered by `react-hot-toast`
- Success and error feedback for every action: login, register, create project, delete, like
- Non-blocking UI — toasts appear and disappear without interrupting the user

### 🎨 Custom Styling
- Fully custom CSS — no UI framework or component library
- Responsive layout for desktop and mobile viewports
- Clean card-based design for the project feed

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| UI Framework | React | 19.x |
| Build Tool | Vite | 8.x |
| Routing | React Router DOM | v7 |
| HTTP Client | Axios | 1.x |
| Icons | Lucide React | 1.x |
| Toast Notifications | React Hot Toast | 2.x |
| Styling | Custom CSS | — |
| Linting | ESLint | 10.x |
| Deployment | Vercel | — |

---

## Dependencies

### Production

| Package | Version | Purpose |
|---|---|---|
| `react` | ^19.2.5 | Core UI library |
| `react-dom` | ^19.2.5 | DOM rendering for React |
| `react-router-dom` | ^7.14.2 | Client-side routing |
| `axios` | ^1.16.0 | HTTP requests to the REST API |
| `lucide-react` | ^1.14.0 | Icon set used throughout the UI |
| `react-hot-toast` | ^2.6.0 | Non-blocking toast notifications |

### Development

| Package | Version | Purpose |
|---|---|---|
| `vite` | ^8.0.10 | Dev server and production bundler |
| `@vitejs/plugin-react` | ^6.0.1 | Vite plugin for React (uses Oxc transform) |
| `eslint` | ^10.2.1 | Code linting |
| `eslint-plugin-react-hooks` | ^7.1.1 | Linting rules for React hooks |
| `eslint-plugin-react-refresh` | ^0.5.2 | Linting for Vite's HMR compatibility |
| `globals` | ^17.5.0 | Global variable definitions for ESLint |
| `@types/react` | ^19.2.14 | TypeScript types for React (IDE support) |
| `@types/react-dom` | ^19.2.3 | TypeScript types for React DOM |

---

## Project Structure

```
ShowPro/
│
├── public/
│   └── favicon.svg              # App favicon
│
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── Navbar.jsx           # Top navigation bar with auth links
│   │   ├── ProjectCard.jsx      # Card component for the project feed
│   │   ├── LikeButton.jsx       # Like / unlike toggle button
│   │   └── ProtectedRoute.jsx   # Wrapper for auth-gated routes
│   │
│   ├── pages/                   # Top-level route components
│   │   ├── Home.jsx             # Community project feed
│   │   ├── Login.jsx            # Login form
│   │   ├── Register.jsx         # Registration form
│   │   ├── CreateProject.jsx    # New project form
│   │   └── Profile.jsx          # Public user profile + their projects
│   │
│   ├── context/
│   │   └── AuthContext.jsx      # Auth state: user, token, login(), logout()
│   │
│   ├── utils/
│   │   └── api.js               # Axios instance with base URL + auth header
│   │
│   ├── App.jsx                  # Root component — router + route definitions
│   └── main.jsx                 # Entry point — renders <App /> into #root
│
├── .env                         # Environment variables (VITE_API_URL)
├── .gitignore
├── eslint.config.js             # ESLint flat config
├── index.html                   # HTML shell — mounts React at #root
├── package.json
└── vite.config.js               # Vite config with React plugin
```

---

## Pages & Routes

| Route | Component | Auth Required | Description |
|---|---|---|---|
| `/` | `Home` | ✅ Yes | Community feed — all published projects |
| `/login` | `Login` | ❌ No | Login form — redirects to `/` on success |
| `/register` | `Register` | ❌ No | Registration form — redirects to `/login` |
| `/create` | `CreateProject` | ✅ Yes | Form to publish a new project |
| `/profile/:id` | `Profile` | ❌ No | Public developer profile + their projects |

Protected routes (marked ✅) redirect unauthenticated users to `/login` via the `ProtectedRoute` component.

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** — version 18 or higher ([download](https://nodejs.org))
- **npm** — comes with Node.js (or use `yarn` / `pnpm`)
- **ShowPro Backend** — running locally or deployed ([backend repo](https://github.com/Puskar2Sora/Show-pro-back))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Puskar2Sora/ShowPro.git

# 2. Navigate into the project directory
cd ShowPro

# 3. Install all dependencies
npm install
```

### Environment Variables

The app reads its API URL from an environment variable. Create or edit the `.env` file in the project root:

```env
# .env
VITE_API_URL=http://localhost:5000
```

> **Important:** All Vite environment variables must be prefixed with `VITE_` to be accessible inside the browser bundle. Never store secrets or private keys in frontend env files.

For production builds, replace the value with your deployed backend URL:

```env
VITE_API_URL=https://your-backend.up.railway.app
```

### Running the App

```bash
# Start the Vite dev server with Hot Module Replacement
npm run dev
```

The app will be available at **`http://localhost:5173`** by default.

> ⚠️ Make sure the ShowPro backend is also running at the URL you specified in `VITE_API_URL`. Without it, all API calls will fail and the app won't function.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR at `localhost:5173` |
| `npm run build` | Build the app for production into the `dist/` folder |
| `npm run preview` | Serve the production build locally for final testing before deploy |
| `npm run lint` | Run ESLint across all source files and report any issues |

---

## How It Works

### Authentication Flow

ShowPro uses a JWT-based auth system backed by the API. Here's the full flow:

1. **Register** — User submits the registration form → `POST /api/auth/register` → account is created in MongoDB
2. **Login** — User submits the login form → `POST /api/auth/login` → API returns a signed JWT token
3. **Token storage** — The token is saved to `localStorage` and loaded into `AuthContext` on page load
4. **Authenticated requests** — The Axios instance in `utils/api.js` attaches the token automatically on every outgoing request via an interceptor
5. **Logout** — The token is removed from `localStorage`, auth state resets, and the user is redirected to `/login`

```js
// utils/api.js — Axios instance with auto-injected auth header
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

The `AuthContext` wraps the entire app and exposes the current `user`, `token`, `login()`, and `logout()` functions to any component that needs them via `useContext`.

---

### Project Feed

The **Home** page fetches all projects from `GET /api/projects` when the component mounts. Each project is rendered as a `ProjectCard`, which displays:

- Preview image (with graceful fallback if none is provided)
- Project title and truncated description
- Tech stack displayed as tags
- Like count and a like/unlike button
- Author's name — clicking navigates to their `/profile/:id` page

The feed is a flat list of all projects from all users, ordered by creation date. It is the social heart of the platform — where community members discover each other's work.

---

### Creating a Project

The **CreateProject** page is protected — only logged-in users can access it. The form collects:

| Field | Required | Description |
|---|---|---|
| Title | ✅ | Name of the project |
| Description | ✅ | What the project does |
| Tech Stack | ✅ | Technologies used (free text, e.g. "React, Node.js") |
| GitHub Link | ❌ | Link to the source code repository |
| Live Link | ❌ | Link to the deployed project |
| Image URL | ❌ | Preview image shown on the project card |

On submit, the form sends:

```json
POST /api/projects
Authorization: Bearer <token>

{
  "title": "My Awesome App",
  "description": "What it does and why it matters...",
  "techStack": "React, Node.js, MongoDB",
  "githubLink": "https://github.com/user/repo",
  "liveLink": "https://myapp.com",
  "imageUrl": "https://example.com/preview.png"
}
```

On success → success toast fires and the user is redirected to their profile.
On failure → error toast shows the message returned by the API.

---

### Public Profiles

The **Profile** page at `/profile/:id` is publicly accessible — no login required. It fetches two endpoints in parallel:

- `GET /api/users/:id` — returns the user's name and bio
- `GET /api/projects/user/:id` — returns all projects published by that user

These are combined into a single profile view showing the developer's info at the top and their project grid below. Profile pages are shareable — any developer can link to their profile from anywhere.

---

### Likes System

The likes system uses an **optimistic UI** pattern for a snappy, responsive feel:

1. User clicks the ❤️ button on a project card
2. The UI **immediately** updates — counter increments/decrements, icon state toggles
3. `PUT /api/projects/:id/like` is sent to the backend in the background
4. If the request **succeeds** → the update is confirmed
5. If the request **fails** → the UI rolls back to its previous state and shows an error toast

This means the interface always feels instant, even on slower connections, while still staying in sync with the database.

Each user can like a project once. Clicking again unlikes it. The toggle state is determined by whether the current user's ID exists in the project's `likes` array returned by the API.

---

## Connecting to the Backend

The ShowPro frontend is designed to work exclusively with the [Show-pro-back](https://github.com/Puskar2Sora/Show-pro-back) REST API. The two repos are intentionally decoupled — the frontend doesn't know or care about the database; it just talks to the API.

**Local full-stack setup:**

```bash
# Terminal 1 — Start the backend
cd Show-pro-back
npm run dev
# → Running at http://localhost:5000

# Terminal 2 — Start the frontend
cd ShowPro
npm run dev
# → Running at http://localhost:5173
```

Ensure your `.env` has:
```env
VITE_API_URL=http://localhost:5000
```

**Production setup:**

Deploy the backend first (Railway, Render, etc.), get its public URL, then set that as `VITE_API_URL` in your frontend deployment's environment settings.

---

## API Integration

Here is a full reference for the API endpoints this frontend consumes:

| Method | Endpoint | Used In | Auth Required | What It Does |
|---|---|---|---|---|
| `POST` | `/api/auth/register` | Register page | ❌ | Create a new user account |
| `POST` | `/api/auth/login` | Login page | ❌ | Authenticate and return a JWT token |
| `GET` | `/api/projects` | Home feed | ✅ | Fetch all projects from all users |
| `POST` | `/api/projects` | Create project page | ✅ | Publish a new project |
| `DELETE` | `/api/projects/:id` | Profile page | ✅ | Delete a project (owner only) |
| `PUT` | `/api/projects/:id/like` | Project card | ✅ | Toggle like / unlike on a project |
| `GET` | `/api/projects/user/:id` | Profile page | ✅ | Fetch all projects by a specific user |
| `GET` | `/api/users/:id` | Profile page | ✅ | Fetch a user's public profile info |

All authenticated requests include the `Authorization: Bearer <token>` header, injected automatically by the Axios interceptor in `utils/api.js`.

---

## Deployment

The live frontend is hosted on **[Vercel](https://vercel.com)** at [show-pro.vercel.app](https://show-pro.vercel.app).

### Deploy your own fork to Vercel

1. **Fork** this repository to your GitHub account
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your fork
3. In **Environment Variables**, add:
   - Key: `VITE_API_URL`
   - Value: your deployed backend URL
4. Vercel auto-detects Vite — build command is `npm run build`, output dir is `dist`
5. Click **Deploy** — your frontend is live in minutes

Vercel will also auto-deploy every time you push to `main`. 

### Other hosting options

| Platform | Notes |
|---|---|
| **Netlify** | Connect GitHub repo, set `VITE_API_URL` env var. Add a `_redirects` file (`/* /index.html 200`) for SPA routing. |
| **Cloudflare Pages** | Excellent performance on the free tier. Supports Vite natively. Set `VITE_API_URL` in Pages settings. |
| **GitHub Pages** | Free, but requires setting `base` in `vite.config.js` to your repo name. Good for demos. |
| **Fly.io** | Containerize with Docker and deploy anywhere. Overkill for a static frontend but works. |

> **SPA Routing Note:** React Router handles routing on the client side. When deploying to any static host, configure it to serve `index.html` for all routes — otherwise direct URL access (e.g. visiting `/profile/123`) will return a 404 from the host before React Router can handle it.

---

## Full-Stack Architecture

```
┌─────────────────────────────────────────┐
│              Browser / Client           │
│                                         │
│   React 19 + Vite 8                     │
│   React Router v7  (client-side SPA)    │
│   Axios            (HTTP client)        │
│   react-hot-toast  (notifications)      │
│   lucide-react     (icons)              │
│   Custom CSS       (styling)            │
│                                         │
│   Deployed → Vercel                     │
└──────────────────┬──────────────────────┘
                   │
                   │  REST API (JSON over HTTPS)
                   │  Authorization: Bearer <JWT>
                   │
                   ▼
┌─────────────────────────────────────────┐
│           ShowPro Backend API           │
│                                         │
│   Node.js + Express.js                  │
│   JWT Auth + bcrypt                     │
│   Mongoose ODM                          │
│   CORS configured for frontend          │
│                                         │
│   Deployed → Railway / Render / Fly.io  │
└──────────────────┬──────────────────────┘
                   │
                   │  Mongoose queries
                   │
                   ▼
┌─────────────────────────────────────────┐
│              MongoDB Atlas              │
│                                         │
│   users       collection                │
│   projects    collection                │
│                                         │
│   Hosted → MongoDB Atlas (cloud)        │
└─────────────────────────────────────────┘
```

---

## Contributing

Contributions, bug reports, and feature suggestions are all welcome. Here's how to get involved:

1. **Fork** this repository
2. **Create a feature branch** off `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** and write clear commit messages
   ```bash
   git commit -m "feat: add search bar to project feed"
   ```
4. **Push** your branch to your fork
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request** — describe what you changed, why, and how to test it

For large or breaking changes, please open an issue first to discuss before writing code.

### Ideas for contributions

Here are some features that would make great additions to the platform:

- 🔍 **Search & filter** — search projects by title, description, or tech stack keyword
- 🏷️ **Tag system** — categorize projects by type (Web App, CLI Tool, API, etc.)
- 🌙 **Dark mode** — toggle between light and dark themes
- 📄 **Pagination / infinite scroll** — handle large numbers of projects gracefully
- 🖼️ **Image upload** — replace URL input with direct file upload (e.g. via Cloudinary)
- ✏️ **Edit project** — update a project's details after publishing
- 🔔 **Notifications** — alert users when someone likes their project
- 🧭 **Explore page** — filter feed by most liked, newest, or by tech stack

---

## License

[MIT](LICENSE) — free to use, modify, and distribute.

---

<div align="center">

Made with ☕ by [Puskar Sora](https://github.com/Puskar2Sora)

<br />

⭐ Star the repo if you find it useful — it helps others discover the project!

</div>
