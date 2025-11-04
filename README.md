# GDR-CAM - Aplicación de Captura de Fotos

## Descripción
GDR-CAM es una aplicación web progresiva (PWA) para tomar fotos con metadatos. La aplicación permite:

- Tomar fotos usando la cámara del dispositivo
- Llenar un formulario con información de observación:
  - Frente de trabajo
  - Coronamiento
  - Tipo de observación
  - Actividad realizada
- Almacenar todos los datos como metadatos en la foto
- Guardar la foto directamente en la galería del dispositivo (con soporte especial para iOS)
- Funcionar completamente offline

## Características

- **Aplicación Web Progresiva (PWA)**: Se puede instalar en dispositivos móviles y PCs
- **Funcionamiento Offline**: Funciona sin conexión a internet
- **Almacenamiento de Metadatos**: Información del formulario se incrusta en la foto como metadatos EXIF
- **Diseño Responsivo**: Compatible con móviles, tablets y PCs
- **Fácil de Usar**: Interfaz simple e intuitiva

## Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript
- API de getUserMedia (acceso a cámara)
- EXIF.js y piexif.js (manipulación de metadatos)
- Service Workers (funcionalidad offline)
- Web App Manifest (instalación como app)

## Cómo Usar

1. Abre la aplicación en un navegador web moderno (Chrome, Firefox, Edge, Safari)
2. Permite el acceso a la cámara cuando se solicite
3. Haz clic en "Iniciar Cámara"
4. Toma una foto con "Tomar Foto"
5. Completa el formulario con los detalles de observación
6. Guarda la foto con metadatos usando "Guardar Foto con Metadatos"
7. Puedes previsualizar la foto y descargarla

## Instalación

La aplicación se puede instalar como una aplicación nativa en tu dispositivo:

- **Móviles Android/iOS**: Toca el menú del navegador y selecciona "Agregar a pantalla de inicio"
- **PC**: Toca el ícono de instalación en la barra de direcciones del navegador

## Metadatos Almacenados

La información del formulario y ubicación se almacena en los metadatos EXIF de la imagen, incluyendo:

**Datos del formulario:**
- Frente de trabajo
- Coronamiento
- Tipo de observación
- Actividad realizada

**Datos de ubicación (GPS):**
- Latitud
- Longitud
- Altitud (si está disponible)
- Precisión
- Fecha y hora de captura

## Estructura del Proyecto

```
GDR-CAM/
├── index.html          # Página principal
├── sw.js              # Service Worker para funcionalidad offline
├── manifest.json      # Web App Manifest para instalación
├── exif.js            # Biblioteca para leer metadatos EXIF
├── piexif.js          # Biblioteca para escribir metadatos EXIF
├── test.html          # Página de pruebas
└── README.md          # Documentación
```

## Compatibilidad

- Chrome 50+
- Firefox 54+
- Edge 79+
- Safari 11.1+
- iOS Safari 11.3+
- Chrome para Android 50+
- Firefox para Android 54+

## Desarrollo y Personalización

Para personalizar la aplicación, puedes modificar:

- `index.html`: Interfaz de usuario y lógica principal
- `sw.js`: Comportamiento offline
- `manifest.json`: Configuración de instalación
- Estilos CSS dentro de `index.html`

## Licencia

Este proyecto es de código abierto y puede ser utilizado libremente.