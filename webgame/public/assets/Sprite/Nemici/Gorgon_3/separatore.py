from PIL import Image

# Carica lo sprite sheet
sprite_sheet = Image.open('Dead.png')

# Specifica le dimensioni di ogni frame e il numero di colonne/righe
sprite_width = 128  # Larghezza di ogni sprite
sprite_height = 128  # Altezza di ogni sprite
columns = 10  # Numero di colonne nello sprite sheet
rows = 1  # Numero di righe nello sprite sheet

# Itera su tutte le righe e colonne per estrarre i frame
for row in range(rows):
    for col in range(columns):
        left = col * sprite_width
        top = row * sprite_height
        right = left + sprite_width
        bottom = top + sprite_height

        # Ritaglia il frame
        frame = sprite_sheet.crop((left, top, right, bottom))

        # Salva il frame con un nome unico
        frame.save(f'frame_{row}_{col}.png')

print("I frame sono stati salvati con successo!")
