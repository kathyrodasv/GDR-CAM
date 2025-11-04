// Función para guardar imagen en la galería del dispositivo
async function saveToGallery(imageUrl) {
    downloadPhotoBtn.innerHTML = '<span class="loading"></span> Guardando...';
    downloadPhotoBtn.disabled = true;

    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const filename = `gdr-cam-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.jpg`;
        const file = new File([blob], filename, { type: blob.type });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                files: [file],
                title: 'Guardar imagen',
                text: 'Guardar la foto capturada en la galería.',
            });
            showStatus('La imagen se ha compartido con éxito.', 'success');
        } else {
            saveUsingDownloadAPI(imageUrl);
        }
    } catch (error) {
        if (error.name !== 'AbortError') {
            console.error('Error al compartir la imagen:', error);
            showStatus('Error al guardar la imagen. Intentando método alternativo.', 'error');
            saveUsingDownloadAPI(imageUrl);
        } else {
            showStatus('Guardado cancelado por el usuario.', 'success');
        }
    } finally {
        downloadPhotoBtn.innerHTML = 'Guardar en Galería';
        downloadPhotoBtn.disabled = false;
    }
}

// Método alternativo usando la API de descarga
function saveUsingDownloadAPI(imageUrl) {
    try {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `gdr-cam-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showStatus('Imagen descargada a la carpeta de descargas.', 'success');
    } catch (error) {
        console.error('Error al guardar imagen con el método de descarga:', error);
        showStatus('Error al guardar la imagen.', 'error');
    }
}
