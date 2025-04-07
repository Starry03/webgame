# webgame

## Dependencies

### Client

```sh
cd ./webgame
npm i
npm run format
```

### Server

- pip install fastapi jwt cryptography

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

-   levels overview

### Game UI

-   map preview (small -> big on click)
-   players stats

### Player

-   hp
-   attack
-   def
-   mana points
-   speed
-   exp

### Objects

-   potions
    -   health 70%
    -   mana 100%
-   stat boosters
    -   atk 3%
    -   def 3%
-   compass (default)

### Shop

-   enchanments
    -   poisoning ( x seconds )
    -   paralysis ( 2 seconds )

### Enemies

-   wizard
    -   mano() -----> enemy
-   soldier
-   tank
-   healer

### Boss

-   all-abilities

## To-do (Menu)

### Ivan

-   [ ] page scelta personaggio -> mergiamo
-   [x] statistiche (frontend)
-   [ ] statistiche (request)

### Lorenzo

-   [x] login

### Starry

-   [ ] endpoint statistiche
-   [x] endpoint classi
-   [ ] download font

## To-do (Game)

### Ivan

-   [ ] animazioni
-   [ ] generazione
    -   richiesta server items
    -   logica generazione stanza (quantità ecc)
        -   classe Obj()
            -   sprite (in accordo con animazioni)
            -   pos
            -   dim
            -   render(sprite)
            -   animate()
            -   move()
        -   classe Livello
        -   classe stanza (dimensione, lista items, stanze vicine == porte)

### Lorenzo

-   [ ] animazioni
-   [ ] sprite

### Starry

-   [ ] collisioni
-   [ ] gioco orizzontale (mobile)

## Style

-   no margin
-   flex, grid

### Index css

-   font
-   testi
-   button
-   colors

### Vue style

-   responsive
-   altro
