import piexif
import json

def display_exif_data(image_path):
    """
    Reads and displays EXIF data from an image file,
    focusing on GPS and UserComment.
    """
    try:
        exif_dict = piexif.load(image_path)

        print(f"--- Metadatos EXIF para: {image_path} ---")

        # Display UserComment (form data)
        if "Exif" in exif_dict and piexif.ExifIFD.UserComment in exif_dict["Exif"]:
            user_comment_bytes = exif_dict["Exif"][piexif.ExifIFD.UserComment]
            try:
                # Decode the user comment (often stored as unicode or ASCII)
                # Piexif stores it as bytes, so we try to decode
                if isinstance(user_comment_bytes, bytes):
                    # Check if it starts with ASCII/UNICODE identifier
                    user_comment_str = user_comment_bytes.decode("utf-8", errors="ignore")
                else:
                    user_comment_str = str(user_comment_bytes)
                    
                print("\n--- Datos del Formulario (UserComment) ---")
                try:
                    # Try to parse as JSON if possible
                    json_data = json.loads(user_comment_str)
                    print(json.dumps(json_data, indent=2))
                except json.JSONDecodeError:
                    print("No es un JSON válido en UserComment:")
                    print(user_comment_str)
            except UnicodeDecodeError:
                print("\n--- Datos del Formulario (UserComment - no se pudo decodificar) ---")
                print(user_comment_bytes)
        else:
            print("\n--- No se encontraron datos del formulario (UserComment) ---")

        # Display GPS data
        if "GPS" in exif_dict and exif_dict["GPS"]:
            print("\n--- Datos GPS ---")
            for key, value in exif_dict["GPS"].items():
                tag_name = piexif.TAGS["GPS"].get(key, f"Unknown Tag ({key})")
                if isinstance(value, tuple) and len(value) == 2 and isinstance(value[0], int) and isinstance(value[1], int):
                    # Handle rational numbers (numerator, denominator)
                    if value[1] != 0:
                        print(f"{tag_name}: {value[0] / value[1]}")
                    else:
                        print(f"{tag_name}: {value}")
                else:
                    print(f"{tag_name}: {value}")
        else:
            print("\n--- No se encontraron datos GPS ---")

        # Display DateTime
        if "Exif" in exif_dict and piexif.ExifIFD.DateTimeOriginal in exif_dict["Exif"]:
            print(f"\n--- Fecha y Hora Original ---")
            print(exif_dict["Exif"][piexif.ExifIFD.DateTimeOriginal])
        elif "0th" in exif_dict and piexif.ImageIFD.DateTime in exif_dict["0th"]:
            print(f"\n--- Fecha y Hora ---")
            print(exif_dict["0th"][piexif.ImageIFD.DateTime])

    except piexif.InvalidImageDataError:
        print(f"Error: El archivo '{image_path}' no contiene datos EXIF válidos o no es un formato de imagen compatible.")
    except FileNotFoundError:
        print(f"Error: El archivo '{image_path}' no fue encontrado.")
    except Exception as e:
        print(f"Ocurrió un error inesperado: {e}")

if __name__ == "__main__":
    # Path to the specific image
    image_path = r"C:\Users\LojanoE\Documents\GitHub\GDR-CAM\IMG_4343.JPG"
    print(f"Verificando archivo: {image_path}")
    import os
    if os.path.exists(image_path):
        print("Archivo encontrado, leyendo metadatos...")
        display_exif_data(image_path)
    else:
        print("Archivo no encontrado")
        # List files in the directory to check what's available
        print("Archivos en el directorio:")
        for file in os.listdir(r"C:\Users\LojanoE\Documents\GitHub\GDR-CAM"):
            if file.lower().endswith(('.jpg', '.jpeg', '.png', '.tiff', '.tif')):
                print(f"  - {file}")