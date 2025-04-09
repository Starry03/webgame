<template>
    <section class="container">
        <h1>Scegli il tuo personaggio</h1>
        <div class="menu">
            <div class="personaggio">
                <button type="button" id="warrior" onclick="showStartGameButton('warrior')">Warrior</button>
                <button type="button" name="warrior_desc" onclick="handleDescription('warrior')" >Show</button>
            </div>
            <div class="personaggio">
                <button type="button" id="mage" onclick="showStartGameButton('mage')">Mage</button>
                <button type="button" name="mage_desc" onclick="handleDescription('mage')">Show</button>
            </div>
            <div class="personaggio">
                <button type="button" id="thief" onclick="showStartGameButton('thief')">Thief</button>
                <button type="button" name="thief_desc" onclick="handleDescription('thief')">Show</button>
            </div>
        </div>
        <div id="description_section" style="display: none;">
            <textarea id="description" style="display: none;" rows="4" cols="80" readonly></textarea>
            <br>
            <button id="close_description" onclick="closeTextArea()">Close</button>
        </div>
        <br>
        <button type="button" style="display: none;" id="start_game" onclick="startGame()">Avvia Gioco</button>
    </section>
  </template>
  
<script setup>
	import {ref} from 'vue'
	import {RequestWrapper} from '@/internal/cryptoutils'

	const showDescription = ref();
	const selectedCharacter = ref();
	const descriptionText = ref("");
	const showStartButton = ref();

  	const chooseCharacter = (personaggio) => {
		alert(`Hai scelto: ${personaggio}`);
		selectedCharacter = personaggio;
        handleDescription(personaggio);
        showStartButton = true;
	}

	const handleDescription = (character) => {
        showStartButton = false
        switch (character) {
          case "warrior":
            descriptionText = "Warrior's description";
            break;
          case "mage":
            descriptionText = "Mage's description";
            break;
          case "thief":
            descriptionText = "Thief's description";
            break;
          default:
            descriptionText = "";
        }
        showDescription = true;
    }

	const closeTextArea = () => {
        showDescription = false;
    }

	const startGame = (character) => {
        localStorage.setItem("selectedCharacter", character);
        alert(`Il gioco inizia con ${character}`);
        // Puoi fare un redirect a un'altra pagina Vue con Vue Router
        // this.$router.push({ path: "/game", query: { personaggio: character } });
    }
	
	const current_player = ref();

	async function requestPlayers() {
        try {
            const req = await fetch("http://127.0.0.1:8000/game/data/classes", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return await req.json();
        }catch (error) {
            console.error("Errore nel recupero dei personaggi:", error);
        }
    }

    async function makeChoice(selectedCharacter) {
        try {
            const req = await RequestWrapper.cryptedFetch("http://127.0.0.1:8000/game/data/classes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ character: selectedCharacter })
            });
            if (!req.ok) {
                throw new Error(`Errore HTTP: ${req.status}`);
            }
            const res = await req.json();
            return res;
        } catch (error) {
            console.error("Errore nell'invio della scelta:", error);
            return null;
        }
    }
    
    async function handleChoice(selectedCharacter) {
        const players = await requestPlayers();
        console.log("Personaggi disponibili:", players);

        const response = await makeChoice(selectedCharacter);
        console.log("Risultato della scelta:", response);
    }


</script>
  
  <style scoped>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #121212;
        color: white;
        font-family: Arial, sans-serif;
    }

    .container {
        width: 700px;
        height: 400px;
        overflow: hidden;
        resize: none;
        margin: 0 auto;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
        color: black;
        gap: 30px;
    }

    h1 {
        text-align: center;
        margin-bottom: 20px;
    }

    button, h1{
        font-family: 'Press Start 2P', cursive;
    }

    .menu {
        display: flex;
        gap: 30px;
        margin-bottom: 5px;
    }

    .personaggio {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .personaggio button:first-child {
        margin-bottom: 10px;
    }

    button {
        padding: 10px;
        background-color: #333;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        width: 150px;
    }

    button:hover {
        background-color: #555;
    }

    textarea {
        width: 100%;
        resize: none;
        display: none;
    }

    #description_section {
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 80%;
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        color: white;
        text-align: center;
    }

    #close_description {
        padding: 10px;
        background-color: red;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        width: 150px;
        margin-top: 10px;
        margin-left: auto; 
        margin-right: auto;
    }


    #close_description:hover {
        background-color: #555;
    }
    #description {
        display: block;
        border-radius: 5px;
        box-sizing: border-box; 
    }
  </style>
  