function selezionaPersonaggio(personaggio) {
    alert(`Hai scelto: ${personaggio}`);
    window.location.href = "game.html?personaggio=" + encodeURIComponent(personaggio);
}

function showDescription(character) {
    var descriptionText = "";
    
    switch(character) {
        case 'warrior':
            descriptionText = "Warrior's description";
            break;
        case 'mago':
            descriptionText = "Mage's description";
            break;
        case 'thief':
            descriptionText = "Thief's description";
            break;
    }
    
    var textarea = document.getElementById("description");
    textarea.value = descriptionText;

    textarea.style.display = "block"; 
}