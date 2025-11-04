// Función para guardar imagen en la galería del dispositivo
function saveToGallery(imageUrl) {
    // Primero mostrar un mensaje de carga
    downloadPhotoBtn.innerHTML = '<span class="loading"></span> Guardando...';
    downloadPhotoBtn.disabled = true;
    
    // Intentar usar la API de Guardado de Imágenes si está disponible
    if ('saveImage' in navigator) {
        // Intentar usando la API de guardado de imágenes (experimental)
        fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
                return navigator.saveImage(blob);
            })
            .then(() => {
                showStatus('Imagen guardada en la galería', 'success');
            })
            .catch(error => {
                console.error('Error usando navigator.saveImage:', error);
                // Si falla, usar el método alternativo
                saveUsingDownloadAPI(imageUrl);
            })
            .finally(() => {
                // Restablecer el botón
                downloadPhotoBtn.innerHTML = 'Guardar en Galería';
                downloadPhotoBtn.disabled = false;
            });
    } else {
        // Usar el método alternativo para navegadores que no soportan navigator.saveImage
        saveUsingDownloadAPI(imageUrl);
    }
}

// Método alternativo usando la API de descarga
function saveUsingDownloadAPI(imageUrl) {
    try {
        // Crear un elemento de enlace
        const link = document.createElement('a');
        
        // Verificar si es una data URL o una URL de objeto
        if (imageUrl.startsWith('data:')) {
            link.href = imageUrl;
        } else {
            // Convertir la URL de objeto a Blob y luego a data URL
            fetch(imageUrl)
                .then(response => response.blob())
                .then(blob => {
                    const blobUrl = URL.createObjectURL(blob);
                    
                    // Crear enlace para descargar
                    link.href = blobUrl;
                    link.download = `gdr-cam-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.jpg`;
                    
                    // Añadir el enlace temporalmente al DOM
                    document.body.appendChild(link);
                    
                    // Simular clic en el enlace
                    link.click();
                    
                    // Remover el enlace del DOM
                    document.body.removeChild(link);
                    
                    // Liberar el objeto URL
                    URL.revokeObjectURL(blobUrl);
                    
                    showStatus('Imagen descargada a la carpeta de descargas', 'success');
                })
                .catch(error => {
                    console.error('Error al convertir imagen para descarga:', error);
                    showStatus('Error al guardar imagen', 'error');
                })
                .finally(() => {
                    // Restablecer el botón
                    downloadPhotoBtn.innerHTML = 'Guardar en Galería';
                    downloadPhotoBtn.disabled = false;
                });
            return; // Salir para evitar ejecución duplicada
        }
        
        // Si es una data URL, descargar directamente
        link.download = `gdr-cam-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.jpg`;
        
        // Añadir el enlace temporalmente al DOM
        document.body.appendChild(link);
        
        // Simular clic en el enlace
        link.click();
        
        // Remover el enlace del DOM
        document.body.removeChild(link);
        
        showStatus('Imagen descargada a la carpeta de descargas', 'success');
    } catch (error) {
        console.error('Error al guardar imagen:', error);
        showStatus('Error al guardar imagen', 'error');
    } finally {
        // Restablecer el botón
        downloadPhotoBtn.innerHTML = 'Guardar en Galería';
        downloadPhotoBtn.disabled = false;
    }
}

// Compatibilidad con dispositivos iOS (Safari)
function saveToGalleryIOS(imageUrl) {
    // Mostrar instrucciones para iOS
    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
        showStatus('Mantén presionada la imagen y selecciona "Guardar imagen" para guardar en la galería', 'success');
        // Abrir la imagen en una nueva ventana para que el usuario pueda guardarla
        window.open(imageUrl, '_blank');
    }
}