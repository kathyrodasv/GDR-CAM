import piexif
import json
import os

# Check if file exists
image_path = r"C:\Users\LojanoE\Documents\GitHub\GDR-CAM\IMG_4343.JPG"
print(f"File exists: {os.path.exists(image_path)}")

if os.path.exists(image_path):
    try:
        exif_dict = piexif.load(image_path)
        print("EXIF data loaded successfully")
        print(f"Keys in exif_dict: {list(exif_dict.keys())}")
        
        # Print GPS data
        if "GPS" in exif_dict and exif_dict["GPS"]:
            print("\nGPS Data:")
            for key, value in exif_dict["GPS"].items():
                print(f"  {key}: {value}")
        else:
            print("\nNo GPS data found")
            
        # Print Exif data
        if "Exif" in exif_dict and exif_dict["Exif"]:
            print("\nExif Data (first 10 entries):")
            count = 0
            for key, value in exif_dict["Exif"].items():
                if count >= 10:
                    break
                print(f"  {key}: {value}")
                count += 1
        else:
            print("\nNo Exif data found")
    
    except Exception as e:
        print(f"Error reading EXIF data: {e}")
else:
    print("File does not exist")