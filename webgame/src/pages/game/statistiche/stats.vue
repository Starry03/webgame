<template>
    <link
        href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
        rel="stylesheet"
    />
    <section id="level-stats">
        <h1>Game Stats</h1>
        <div class="item-stats">
            <h2>Tempo impiegato</h2>
            <p id="time-taken"> "{{ timeTaken }}" </p>
        </div>
        <div class="item-stats">
            <h2>Level</h2>
            <p id="level">"{{level}}"</p>
        </div>
        <div class="item-stats">
            <label for="esp">Experience</label>
            <input type="range" id="esp" name="esp" min="0" max="100" value="50" />
            <span id="value">1250</span>
        </div>
        <div class="item-stats">
            <label for="health-percentage">Health Percentage</label>
            <input
                type="range"
                id="health-percentage"
                name="healthPercentage"
                min="400"
                max="1000"
                value="700"
            />
            <span id="value">{{healthPercentage}}</span>
        </div>
        <div class="item-stats">
            <label for="mana-percentage">Mana Percentage</label>
            <input
                type="range"
                id="mana-percentage"
                name="manaPercentage"
                min="400"
                max="1200"
                value="700"
            />
            <span id="value">{{manaPercentage}}</span>
        </div>
        <div class="item-stats">
            <h2>Potenziamenti usati</h2>
            <p id="used-enchantments">0</p>
        </div>
        <div class="item-stats">
            <h2>Nemici sconfitti</h2>
            <p id="defeated-enemies">0</p>
        </div>
        <button id="next-step-button">Prosegui</button>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getHealthPercentage, getManaPercentage, getLevel, getTime } from '@/components/StatusBar.vue'

var timeTaken = getTime()
var level = getLevel()
var esp = ref('')
var healthPercentage = getHealthPercentage()
var manaPercentage = getManaPercentage()
var usedEnchantments = ref('')
var defeatedEnemies = ref('')

const showStats = (time, espPoints, hpPoints, enchantments, enemies) => {
    timeTaken = time
    esp = espPoints
    usedEnchantments = enchantments
    defeatedEnemies = enemies

    document.getElementById('level-stats').style.display = 'block'
}

const continueGame = () => {
    document.getElementById('level-stats').style.display = 'none'
    console.log('Starting next level...')
}

const setSliderValue = (slider, val) => {
    val.textContent = slider.value
}

const handleSlider = (id, value) => {
    const slider = document.getElementById(id)
    const val = document.getElementById(value)

    slider.addEventListener('input', () => {
        this.setSliderValue(slider, val)
    })
}
    //inizializzazione slider

onMounted(() => {
    this.handleSlider('esp', 'espValue')
    this.handleSlider('remained-xp-points', 'remainedXpValue')
})

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

h1,
p {
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
}

button,
h1 {
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

#health-percentage:disabled {
    background-color: crimson;
    cursor: not-allowed;
}

#mana-percentage:disabled {
    background-color: cyan;
    cursor: not-allowed;
}
</style>
