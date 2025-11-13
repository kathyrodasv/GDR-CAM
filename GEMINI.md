# GEMINI.md - GDR-CAM

## Project Overview

GDR-CAM is a Progressive Web App (PWA) designed for capturing photos and embedding them with EXIF metadata. The application allows users to take a picture, fill out a form with details about the observation, and save the image with the form data and GPS coordinates embedded in the image's EXIF data. The application is designed to work offline.

## Technologies

*   **Frontend:** HTML5, CSS3, JavaScript
*   **Offline:** Service Workers
*   **Camera:** `getUserMedia` API
*   **Metadata:** `piexif.js` and `exif.js` for reading and writing EXIF data.

## Building and Running

This is a static web application and does not have a build process. To run the application, open the `index.html` file in a modern web browser.

For development, it is recommended to use a local web server to avoid potential issues with browser security policies related to file access.

## Development Conventions

*   **Main Logic:** The core application logic is located in `app.js`. This file handles camera initialization, photo capture, form handling, and metadata embedding.
*   **Offline Functionality:** The `sw.js` file contains the service worker implementation, which manages caching of application assets for offline use.
*   **UI:** The user interface is defined in `index.html`.
*   **Styling:** Styles are located in `style.css`.
*   **Data:** The `frentes.json` file contains the list of work fronts for the corresponding dropdown in the form.
*   **Metadata Libraries:** `piexif.js` and `exif.js` are used for manipulating EXIF metadata.
