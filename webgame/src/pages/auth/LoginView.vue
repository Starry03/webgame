<script setup>
</script>

<template>
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
  <div class="master">
    <button class="button button-home" @click="$router.push('/')">🏠Home</button><br><br>      

      <div class="container flex flex-column flex-center gap-big">
        <img src="../../style/disegno.webp" alt="Logo" class="logo">
        <h2>Awakening in the Dark Tower</h2>
        
        <div class="forma">
          <form @submit.prevent="login">
            
            <input class="in1" id="username" type="text" placeholder="Username">
            <input class="in2" id="password" type="password" placeholder="Password">
            <br><br><br>
            <div class="bot flex flex-center gap-big">
              <button class="btn-regist" type="submit">SIGN UP</button>
              <button class="btn-login" type="submit">SIGN IN</button>
            </div>
            
          </form>
        </div>
        
      </div>

  </div>
</template>

<style scoped>

  .master{
    background: linear-gradient(135deg, #8a0576, #120446);
    background-color: blueviolet;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
  }

  .container{
    background: #0e0e1a;
    width: 320px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
  }

  .logo{
    width: 100%;
    margin-bottom: 15px;
  }

  h2{
      font-family: 'Press Start 2P', cursive;
      justify-content: center;
      margin-bottom: 20px;
      width: 100%;
      text-shadow: 0 0 10px red, 0 0 20px red;
  }

  .btn-login, .btn-regist{
    background: linear-gradient(135deg, #8a0576, #120446);
    background-color: blueviolet;
    color: black;
    text-shadow: 0 0 1px red, 0 0 20px red;
    padding: 10px;
    border: none;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
  }

  .btn-login:hover, .btn-regist:hover{
    transform: scale(1.1);
  }

  input{
    padding: 10px;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-family: 'Press Start 2P', cursive;
  }

  button{
    font-family: 'Press Start 2P', cursive;
  }

  .bot{
    width: 100%;
  }

  .button-home{
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 1rem;
    background-color: rgb(148, 20, 60);
  }
  
  .button-home:hover{
    transform: scale(1.1);
    text-shadow: 0 0 10px black, 0 0 20px black;
  }

</style>