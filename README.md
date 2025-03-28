# webgame

## Dependencies

### Client

```sh
cd ./webgame
npm i
npm run format
```

### Server

```sh
cd backend
python -m venv .venv
pip install -r /path/to/requirements.txt
```

## Run (devel)

### Client

```sh
cd ./webgame
npm run dev
```

### Server

```sh
# temporary
cd ./backend
# .venv/bin/uvicorn
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

## Info

### Menu

- levels overview

### Game UI

- map preview (small -> big on click)
- players stats

### Player

- hp
- attack
- def
- mana points
- speed
- exp
  
### Objects

- potions
  - health  70%
  - mana    100%
- stat boosters
  - atk     3%
  - def     3%
- compass (default)

### Shop

- enchanments
  - poisoning ( x seconds )
  - paralysis ( 2 seconds )

### Enemies

- wizard
- soldier
- tank
- healer

### Boss

- all-abilities

## To-do

### Ivan

- [ ] page scelta personaggio -> mergiamo
- [ ] statistiche

### Lorenzo

- [ ] login
- [ ] css

### Starry

- [ ] finire database
- [ ] endpoint statistiche
- [ ] endpoint classi
