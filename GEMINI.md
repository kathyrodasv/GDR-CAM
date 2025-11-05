# GEMINI.md - GDR-CAM Project

## Project Overview

GDR-CAM is a Progressive Web App (PWA) designed for capturing photos and embedding them with rich metadata. The application allows users to take a picture, fill out an observation form, and automatically add GPS coordinates and a timestamp. The final image, complete with a logo and all collected data stored in its EXIF metadata, can be saved directly to the user's device.

The project is built entirely with client-side web technologies: HTML5, CSS3, and JavaScript. It functions as a static website and can be run without a backend server. Its PWA capabilities, enabled by a Service Worker and a Web App Manifest, allow it to be installed on mobile devices and desktops for offline use.

Key libraries used are `exif.js` for reading and `piexif.js` for writing EXIF metadata to the JPEG images.

## Running the Project

This is a static web project. There is no build process required.

To run the application, you need to serve the project files using a local web server.

1.  **Start a local web server:**
    If you have Python installed, you can run one of the following commands in the project's root directory:
    ```bash
    # For Python 3
    python -m http.server
    ```
    ```bash
    # For Python 2
    python -m SimpleHTTPServer
    ```
    Alternatively, you can use other tools like `npx serve`.

2.  **Access the application:**
    Open your web browser and navigate to the URL provided by the local server (e.g., `http://localhost:8000`).

**Note:** The application requires a secure context (`https://` or `localhost`) to access camera and geolocation features.

## Development Conventions

*   **Code Style:** The JavaScript code is written in a procedural style with a global `appState` object managing the application's state. DOM elements are cached in an `elements` object.
*   **Libraries:** All JavaScript libraries (`exif.js`, `piexif.js`) are included directly via `<script>` tags in `index.html`. There is no package manager like npm or yarn in use.
*   **Metadata Handling:**
    *   Form data is converted to a JSON string and stored in the `UserComment` EXIF tag.
    *   GPS data (latitude, longitude, altitude) is stored in the standard GPS EXIF tags.
    *   A timestamp and a logo (`img/LOGO GDR.jpeg`) are drawn directly onto the image canvas before saving.
*   **Testing:** The project includes a `read_metadata.py` script, which suggests that developers can use it to verify the EXIF data of the generated images locally. To use it, you need to have Python and the `piexif` library installed (`pip install piexif`).
