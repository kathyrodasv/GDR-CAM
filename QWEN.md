# QWEN.md - GDR-CAM Project Context

## Project Overview

GDR-CAM is a Progressive Web Application (PWA) for capturing photos with embedded metadata. The application allows users to take photos using their device's camera, fill out an observation form, and store the form data directly in the photo's EXIF metadata. This project was created for the GitHub repository named GDR-CAM.

## Purpose
The application is designed to capture photos with associated observational data and location information, storing all metadata directly in the image file. It's particularly useful for field observations, surveys, or any scenario where photos need to be documented with contextual information.

## Key Features
- Camera access using HTML5 getUserMedia API
- Form with fields: Work Front (Frente de Trabajo), Crown/Cap (Coronamiento), Observation Type (Tipo de Observación), and Performed Activity (Actividad Realizada)
- Automatic GPS location capture
- Offline functionality using Service Workers
- PWA installation capability via Web App Manifest
- Responsive design for mobile and desktop
- Direct saving to device gallery
- EXIF metadata embedding with piexif.js

## Architecture and Technologies

### Frontend
- **HTML5**: Single-page application structure
- **CSS3**: Responsive styling in external style.css file
- **JavaScript**: Client-side logic with ES6+ features

### Libraries and Dependencies
- **piexif.js**: For reading and writing EXIF metadata
- **exif.js**: For additional EXIF functionality
- **Custom save-image.js**: For gallery saving functionality

### Core Files
- `index.html`: Main application file with camera, form, and metadata logic
- `style.css`: Separate CSS file for styling
- `sw.js`: Service Worker for offline functionality
- `manifest.json`: PWA manifest configuration
- `save-image.js`: Custom gallery saving functions
- `exif.js`: EXIF metadata library
- `piexif.js`: EXIF metadata manipulation library
- `test.html`: Functionality testing page

### Key Functionality
1. **Camera Access**: Uses `navigator.mediaDevices.getUserMedia()` with preference for environment (rear) camera
2. **Geolocation**: Uses `navigator.geolocation.getCurrentPosition()` for GPS coordinates
3. **Metadata Storage**: Form data and location are stored in EXIF UserComment field and GPS fields
4. **Gallery Save**: Implements various methods to save images to device gallery
5. **Offline Support**: Service Worker caches core application resources

## Building and Running

This is a static web application that doesn't require building or compilation:

1. **Local Development**: Serve the files through a local web server (e.g., `python -m http.server`, `http-server`, or Live Server in VS Code)
2. **Deployment**: Deploy to any static hosting service (GitHub Pages, Netlify, Vercel, etc.)
3. **Testing**: Access through modern browsers that support Web APIs used (getUserMedia, Geolocation, Service Workers)

### Requirements
- Modern browser supporting getUserMedia API
- Camera access permissions
- Location services permissions (for GPS data)

## Development Conventions

- All code is in Spanish following the original project language
- ES6+ JavaScript features used
- Responsive design with mobile-first approach
- Accessibility considerations for form inputs and buttons
- Error handling for camera access, geolocation, and metadata operations

## Project Structure

```
GDR-CAM/
├── index.html          # Main application file
├── style.css           # Separate CSS styling
├── sw.js               # Service Worker for offline functionality
├── manifest.json       # Web App Manifest for PWA features
├── exif.js             # EXIF reading library
├── piexif.js           # EXIF writing library
├── save-image.js       # Gallery saving functionality
├── test.html           # Functionality testing page
├── QWEN.md             # Current context file
├── README.md           # Project documentation
└── .gitattributes      # Git attributes configuration
```

## Key Code Patterns

1. **Asynchronous Operations**: Heavy use of async/await and Promises for camera access, geolocation, and metadata operations
2. **Error Handling**: Comprehensive try/catch blocks and error callbacks with user feedback
3. **State Management**: DOM element references and application state stored in JavaScript variables
4. **Fallback Strategies**: Multiple approaches for metadata embedding and gallery saving to ensure cross-browser compatibility
5. **User Feedback**: Status messages and loading indicators to improve user experience

## Special Considerations

- Camera and location permissions are required for full functionality
- Some mobile browsers might not fully support all features
- The GPS EXIF format requires conversion from decimal degrees to degrees/minutes/seconds format
- Gallery saving functionality varies by platform (special handling for iOS)
- The application has offline capabilities but requires initial online access to register the service worker