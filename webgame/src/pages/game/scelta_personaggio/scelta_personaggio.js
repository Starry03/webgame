function chooseCharacter(personaggio) {
    alert(`Hai scelto: ${personaggio}`);
    //window.location.href = "game.html?personaggio=" + encodeURIComponent(personaggio);
}

function blockTextArea() {
    document.getElementById("description_section").style.display = "block";
    document.getElementById("close_description").style.display = "block";
}

function closeTextArea() {
    document.getElementById("description_section").style.display = "none";
    document.getElementById("close_description").style.display = "none";
}

function handleDescription(character) {
    var descriptionText = "";
    
    switch(character) {
        case 'warrior':
            descriptionText = "Warrior's description";
            break;
        case 'mage':
            descriptionText = "Mage's description";
            break;
        case 'thief':
            descriptionText = "Thief's description";
            break;
    }
    
    var textarea = document.getElementById("description");
    textarea.value = descriptionText;

    textarea.style.display = "block";

    blockTextArea();

    document.getElementById("close_description").onclick = function() {
        closeTextArea();
    };
}

function startGame(character) {

}
 
function showStartGameButton(character) {
    localStorage.setItem("selected character", character)
    var button = document.getElementById("start_game")
    button.style.display="none"
    document.getElementById("start_game").onclick = function() {
        startGame(character);
    }
}

