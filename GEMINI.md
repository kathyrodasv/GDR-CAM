# Project Overview

This project is a Progressive Web App (PWA) named GDR-CAM, designed for capturing photos and embedding them with EXIF metadata. The application is built using vanilla HTML, CSS, and JavaScript. It allows users to take pictures, fill out a form with observational data, and save the image with the collected information stored as EXIF metadata. The app is designed to work offline and is installable on mobile devices and PCs.

## Key Technologies

*   **Frontend:** HTML5, CSS3, JavaScript
*   **Camera Access:** `getUserMedia` API
*   **Metadata:** `exif.js` and `piexif.js` libraries for reading and writing EXIF data.
*   **Offline Functionality:** Service Workers (`sw.js`)
*   **PWA:** Web App Manifest (`manifest.json`)

## Architecture

The application follows a simple single-page application (SPA) architecture.

*   `index.html`: Defines the UI structure, including the camera view, a form for metadata, and a preview section.
*   `style.css`: Contains all the styles for the application.
*   `app.js`: This is the core of the application. It manages the application state, handles user interactions, and orchestrates the process of capturing images, getting GPS data, and embedding metadata.
*   `exif.js` & `piexif.js`: These are third-party libraries used for handling EXIF metadata.
*   `sw.js`: The service worker enables offline functionality by caching application assets.
*   `manifest.json`: This file provides the necessary information for the web app to be installed as a PWA.

# Building and Running

This is a client-side web application. There is no build process. To run the project, you need to serve the files using a local web server.

1.  **Start a local web server:**
    You can use any simple web server. For example, if you have Python installed, you can run:

    ```bash
    python -m http.server
    ```

    Or, if you have Node.js installed, you can use `http-server`:

    ```bash
    npx http-server
    ```

2.  **Open the application:**
    Open your web browser and navigate to the address provided by the web server (e.g., `http://localhost:8000`).

# Development Conventions

*   **Code Style:** The JavaScript code is written in a procedural style with a global `appState` object to manage the application's state. DOM elements are cached in an `elements` object.
*   **Modularity:** The code is organized into functions with specific responsibilities, such as `startCamera`, `takePhoto`, `addMetadataToImage`, etc.
*   **Error Handling:** The code includes error handling for camera access, GPS, and other asynchronous operations. Status messages are displayed to the user.
*   **Dependencies:** The project uses a few external libraries (`exif.js`, `piexif.js`) which are included directly in the project.
