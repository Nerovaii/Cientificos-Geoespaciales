import os
import rasterio
import numpy as np
import json

def tif_to_json(tif_file, json_file):
    # Abrir el archivo TIFF
    with rasterio.open(tif_file) as src:
        # Leer la imagen como un array
        data = src.read(1)  # Leer la primera banda
        # Obtener la transformación y las dimensiones
        transform = src.transform
        width = src.width
        height = src.height

    # Crear un diccionario para almacenar la información
    geojson_data = {
        "type": "Raster",
        "width": width,
        "height": height,
        "transform": {
            "a": transform[0],  # escala x
            "b": transform[1],  # rotación x
            "c": transform[2],  # traslación x
            "d": transform[3],  # rotación y
            "e": transform[4],  # escala y
            "f": transform[5]   # traslación y
        },
        "data": data.tolist()  # Convertir el array a lista
    }

    # Guardar el diccionario como un archivo JSON
    with open(json_file, 'w') as f:
        json.dump(geojson_data, f)

def convert_all_tifs_to_json(tif_folder, json_folder):
    # Asegurarse de que el directorio de JSON existe
    os.makedirs(json_folder, exist_ok=True)

    # Iterar sobre todos los archivos en la carpeta TIFF
    for file_name in os.listdir(tif_folder):
        if file_name.endswith('.tif'):
            tif_path = os.path.join(tif_folder, file_name)
            json_file_name = file_name.replace('.tif', '.json')
            json_path = os.path.join(json_folder, json_file_name)

            # Verificar si el archivo JSON ya existe
            if not os.path.exists(json_path):
                print(f'Convirtiendo: {tif_path} a {json_path}')
                tif_to_json(tif_path, json_path)
            else:
                print(f'El archivo JSON ya existe: {json_path}')


tif_folder = 'cientificos-geoespaciales/backend/data/tif'
json_folder = 'cientificos-geoespaciales/backend/data/json'
convert_all_tifs_to_json(tif_folder, json_folder)
