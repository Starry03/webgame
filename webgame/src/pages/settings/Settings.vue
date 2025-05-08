<template>
  <div class="master flex flex-column flex-align gap-big">
    <button class="button button-home button-secondary" @click="$router.push('/')">Home</button>
    <h1 class="title">Awakening in the Dark Tower</h1>
    <div class="set flex flex-column flex-center gap-big">
      <h2>Settings</h2>
      <div class="flex flex-column gap-small">
        <h3>Master Volume</h3>
        <input type="range" min="0" max="10" value="5" class="slider" id="vol_range" />
        <h3>SFX Volume</h3>
        <input type="range" min="0" max="10" value="5" class="slider" id="vol_range" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.master {
  background: url('https://i0.wp.com/piziadas.com/wp-content/uploads/2012/05/gears.gif?resize=300%2C200');
  background-size: cover;
  display: flex;
  height: 100svh;
  color: cyan;
  text-align: center;
  padding-top: 40%;
}

@media (orientation: landscape) {
  .master {
    padding-top: 10%;
  }
}

h1,
h2,
h3 {
  text-align: center;
}

.title {
  font-size: var(--font-big);
  text-shadow:
    0 0 10px black,
    0 0 20px black;
  color: darkred;
}

.set {
  display: flex;
}

h2,
h3 {
  font-size: var(--font-mid);
  text-shadow:
    0 0 10px black,
    0 0 20px black;
}

.button-home {
  position: absolute;
  top: 30px;
  left: 20px;
  font-size: var(--font-big);
}

.button-home:hover {
  transform: scale(1.1);
  text-shadow:
    0 0 10px black,
    0 0 20px black;
}
</style>
