<script setup>
</script>

<template>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <div class="master flex flex-column flex-cemter">
        <div>
            <button>indietro</button><button>mute</button>
        </div>
        <h1 class="title flex flex-row gap-big">Awakening in the Dark Tower</h1><br>
        <div class="set">
            <h2>Settings</h2>
            <h3>Master Volume</h3>
            <input type="range" min="0" max="10" value="5" class="slider" id="vol_range">
            <h3>SFX Volume</h3>
            <input type="range" min="0" max="10" value="5" class="slider" id="vol_range">
        </div>
        
        
    </div>
</template>

<style scoped>
    .master{
        background: url('https://i0.wp.com/piziadas.com/wp-content/uploads/2012/05/gears.gif?resize=300%2C200');
        background-size: cover;
        display: flex;
        height: 100vh;
        color: cyan;
        text-align: center;
    }

    h1, h2, h3{
        font-family: 'Press Start 2P', cursive;
        justify-content: center;
    }
    
    /*button{
        border: none;
        background-color: transparent;
        color: white;
    }*/

    .title{
        font-size: 2rem;
        text-shadow: 0 0 10px black, 0 0 20px black;
        color: darkred;
    }

    .set{
        padding-top: 7%;
    }

    h1{
        padding-top: 7%;
    }

    h2{
        padding-bottom: 3%;
    }

</style>