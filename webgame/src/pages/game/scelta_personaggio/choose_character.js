function chooseCharacter(personaggio) {
    //alert(`Hai scelto: ${personaggio}`);

    localStorage.setItem("selectedCharacter",personaggio)

    showStartGameButton()
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
    document.getElementById("start_game").style.display="none";     /* nascondo il bottone "Avvia Gioco" in caso di precedente pressione di un bottone di uno dei personaggi  */

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

function startGame() {
    const selectedCharacter = localStorage.getItem("selectedCharacter");

   /* if (selectedCharacter) {
        window.location.href = "game.html";
    } else {
        alert("Seleziona un personaggio per iniziare il gioco!");
    }*/
}
 
function showStartGameButton() {
    var button = document.getElementById("start_game")
    button.style.display="inline-block"
    button.onclick = function() {
        startGame();
    };
}

