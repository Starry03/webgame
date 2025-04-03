<template>
    <div class="master flex flex-column flex-cemter">
        <button class="button button-home button-secondary" @click="$router.push('/')">Home</button>
        <h1 class="title flex flex-row gap-big">Awakening in the Dark Tower</h1>
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

    @media(orientation: portrait) {
        
        h1 {
            font-size: var(--font-big);
            margin-top: 35%;
        }
        
        h2{
            margin-top: 15%;
            margin-bottom: 5%;
        }
        h3{
            margin-top: 2%;
            margin-bottom:3%;
        }

        input{
            margin-bottom: 5%;
        }

        .button {
            font-size: var(--font-small);
        }
    }

    @media(orientation: landscape) {
        h1 {
            margin-top: 5%;
            font-size: var(--font-mid);
            justify-items: center;
            
        }
        
        h3{
            margin-top: 1%;
        }

        input{
            margin-top: 1%;
            margin-bottom: 1%;
        }

        button {
            font-size: var(--font-small);
        }
    }

    .master{
        background: url('https://i0.wp.com/piziadas.com/wp-content/uploads/2012/05/gears.gif?resize=300%2C200');
        background-size: cover;
        display: flex;
        height: 100svh;
        color: red;
        text-align: center;
    }

    h1, h2, h3{
        justify-content: center;
    }

    .title{
        font-size: 2rem;
        text-shadow: 0 0 10px black, 0 0 20px black;
        color: darkred;
    }
    .set{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 10%;
    }

    h2,h3{
        text-shadow: 0 0 10px black, 0 0 20px black;
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

    .button-home{
        position: absolute;
        top: 20px;
        left: 20px;
        font-size: var(--font-mid);
    }

    .button-home:hover {
        transform: scale(1.1);
        text-shadow: 0 0 10px black, 0 0 20px black;
    }
</style>