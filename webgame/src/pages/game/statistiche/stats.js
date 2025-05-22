function showStats(
  time,
  gained_points,
  esp,
  remained_exp_points,
  used_enchantment,
  defeated_enemies,
) {
  document.getElementById('time-taken').textContent = time
  document.getElementById('gained-points').textContent = gained_points
  document.getElementById('esp').textContent = esp
  document.getElementById('remained-xp-points').textContent = remained_exp_points
  document.getElementById('used-enchantments').textContent = used_enchantment
  document.getElementById('defeated-enemies').textContent = defeated_enemies

  document.getElementById('level-stats').style.display = 'block'

  document.getElementById('next-step-button').addEventListener('click', function () {
    document.getElementById('level-stats').style.display = 'none'
    nextLevel()
  })
}

function nextLevel() {
  // codice per avviare il livello successivo
}

function setSliderValue(slider, val) {
  val.textContent = slider.value
}

function handleSlider(id, value) {
  const slider = document.getElementById(id)
  const val = document.getElementById(value)

  slider.addEventListener('input', function () {
    setSliderValue(slider, val)
  })
}
