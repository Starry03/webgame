const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

function loadMap(map_file) {
    fetch(map_file).then(res => res.json()).then(data => {
        drawMap(data);
    }).catch(e => console.error('Error during map loading:', e));
}

function drawMap(map_data) {
    const map_width = map_data.tilewidth;
    const map_height = map_data.tileheight;

    map_data.layers.forEach(layer => {
        if (layer.type === 'tileLayer') {

        }
    })
}
