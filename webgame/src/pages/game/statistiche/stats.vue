<template>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <section id="level-stats">
        <h2>Statistiche del livello</h2>
        <div class="item-stats">
            <h1>Tempo impiegato </h1>
            <p id="time-taken">00:00</p>
        </div>
        <div class="item-stats">
            <h1>Punti guadagnati</h1>
            <p id="gained-points">0</p>
        </div>
        <div class="item-stats">
            <h1> Livello attuale personaggio</h1>
            <p id="current-level">0</p>
        </div>
        <div class="item-stats">
            <label for = "esp">Esperienza</label>
            <input type="range" id="esp" name="esp" min="0" max="100" value="50">
            <span id="value">50</span>
        </div>
        <div class="item-stats">
            <label for="remained-xp-points">Punti vita rimanenti</label>
            <input type="range" id="remained-xp-points" name="remained-xp-points" min="400" max="1000" value="700">
            <span id="value">700</span>
        </div>
        <div class="item-stats">
            <h1>Potenziamenti usati</h1>
            <p id="used-enchantments">0</p>
        </div>
        <div class="item-stats">
            <h1>Nemici sconfitti</h1>
            <p id="defeated-enemies">0</p>
        </div>
        <button id="next-step-button">Prosegui</button>
    </section>
</template>
  
<script>
export default {
  data() {
    return {
      timeTaken: '00:00',          
      gainedPoints: 0,             
      currentLevel: 0,             
      esp: 50,                     
      remainedXpPoints: 700,       
      usedEnchantments: 0,         
      defeatedEnemies: 0,          
    };
  },
  methods: {
    showStats(time, gainedPoints, esp, remainedXpPoints, usedEnchantments, defeatedEnemies) {
      this.timeTaken = time;
      this.gainedPoints = gainedPoints;
      this.esp = esp;
      this.remainedXpPoints = remainedXpPoints;
      this.usedEnchantments = usedEnchantments;
      this.defeatedEnemies = defeatedEnemies;

      document.getElementById("level-stats").style.display = "block";
    },

    prosegui() {
        document.getElementById("level-stats").style.display = "none";

        console.log("Starting next level...");
        // Qui potresti aggiungere qualsiasi altra logica necessaria per il livello successivo
    },

    setSliderValue(slider, val) {
      val.textContent = slider.value;
    },

    handleSlider(id, value) {
        const slider = document.getElementById(id);
        const val = document.getElementById(value);

        slider.addEventListener("input", () => {
            this.setSliderValue(slider, val);
        });
    }
  },

  //inizializzazione slider
  mounted() {
    this.handleSlider('esp', 'espValue');
    this.handleSlider('remained-xp-points', 'remainedXpValue');
  }
};
</script>
  
<style scoped>
    #level-stats {
    background-color: black;
    color: white;
    padding: 30px;
    border-radius: 10px;
    width: 80%;
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /*display: none;  Nascondi il modulo inizialmente */
    z-index: 1000; 
    }

    h2 {
    font-size: 1.5em;
    margin-bottom: 20px;
    }

    h1 {
        font-weight: bold;
        color: white;
        font-size: 1.2em;
    }

    label {
        font-weight: bold;
        color: white;
        font-size: 1.2em;
    }

    h1, p {
        display: inline-block;
        margin-right: 10px;
        margin-bottom: 10px;
    }

    button, h1{
    font-family: 'Press Start 2P', cursive;
    }

    .item-stats {
    margin-bottom: 15px;
    }

    button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: lightgreen;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1em;
    }

    button:hover {
    background-color: darkgreen;
    }

    body {
    background-color: white;
    color: black;
    font-family: 'Times New Roman', Times, serif;
    font-weight: normal;
    margin: 20px;
    padding: 20px;
    display: flex;
    position: relative;
    text-align: center;
    justify-content: center; 
    height: 100vh; 
    }
    #esp:disabled {
        background-color: lightgreen;
        cursor: not-allowed; 
    }

    #remained-xp-points:disabled {
        background-color: red;
        cursor: not-allowed; 
    }
</style>
  