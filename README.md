# Movie Explorer – Discover Your Favorite Films

Movie Explorer is a dynamic and responsive React web application that allows users to explore, search, and view detailed information about movies using real-time data fetched from the TMDb (The Movie Database) API. This app was built with the goal of providing an intuitive and engaging user experience for discovering new and trending films.

## Features

- User login interface with username and password.
- Search bar to find movies by name.
- Display of movie posters in a grid with title, release year, and rating.
- Detailed movie view with overview, genre, cast, and trailer.
- Trending movies section on the homepage.
- Infinite scroll with "Load More" button.
- Light mode and dark mode toggle.
- Save favorite movies locally and view in a separate Favorites page.
- Search filters by genre, year, and rating.
- Embedded YouTube trailers.

## Technologies Used

- **React** (with Create React App)
- **React Router** for navigation
- **Axios** for API requests
- **Material-UI (MUI)** for UI design
- **TMDb API** for movie data and trailers
- **React Context API** for state management
- **LocalStorage** for storing last search and favorites

## Getting Started

1. Clone the repository:
2. Navigate to the project folder:
3. Install dependencies:
4. Create a `.env` file in the root and add your TMDb API key:
5. Start the app:


## 🌐 Live Demo

Try the live app here:  
👉 [https://Movie-Explorer.netlify.app](https://Movie-Explorer.netlify.app)

## 📁 Folder Structure

- `src/components/` – Reusable components like MovieCard, SearchBar, etc.
- `src/pages/` – Main pages: Home, Favorites, Movie Details.
- `src/context/` – Context API for global state.
- `src/utility/` – Utility functions for API requests and helpers.

## Extra Features

- YouTube trailer integration using TMDb video keys.
- Movie filtering system.
- Friendly error handling for API issues.

## Author
Keanusha Shanmugarajah



