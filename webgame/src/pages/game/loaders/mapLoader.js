export async function loadMap(mapName) {
    const path = `/assets/maps/rooms/${mapName}/${mapName}.json`;
  
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Map "${mapName}" not found at ${path}`);
      }
  
      const mapData = await response.json();
  
      console.log(`Loaded map: ${mapName}`, mapData);
  
      return mapData;
    } 
    catch (err) {
      console.error("Failed to load map:", err);
      throw err;
    }
  }
  