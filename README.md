# Vanilla Asteroids

Pequeno clon de **Asteroids** hecho con **JavaScript vanilla**, **HTML5 Canvas** y **CSS**.

Desarrollado por Jaime Sebastian Chavarria Fuertes y David Eduardo Chavez Totora.

## Demo del gameplay

- Pantalla de inicio con boton `Play Game`

- ****Antes de nada, hacer click en cualquier parte de la pantalla antes de darle al boton Play Game (por inconvenientes con el audio de fondo).****

- Nave controlada con teclado (WASD)
- Apuntado hacia la posicion del mouse (en realidad a la proyeccion de la posicion en el borde del canvas)
- Disparo con clic izquierdo


## Tecnologias

- HTML
- CSS
- JavaScript modular
- Canvas 2D API
- Web Audio API

## Como ejecutarlo **(IMPORTANTE!!!)** 

No conviene abrir `index.html` haciendo doble clic. Como el proyecto usa `type="module"` y carga audio con `fetch`, lo correcto es servirlo por HTTP local.

### Con Python

```bash
python3 -m http.server 8000
```

Luego abre:

```text
http://localhost:8000
```

## Reglas del juego

- La partida empieza al pulsar `Play Game`.
- Se generan **10 asteroides** al iniciar.
- Los asteroides pueden ser `big`, `medium` o `small`.
- Los asteroides `big` y `medium` se dividen en dos al ser destruidos.
- Los asteroides pequenos desaparecen definitivamente.
- La nave empieza con **3 vidas**.
- Cuando la nave recibe dano y aun quedan vidas, vuelve al centro.
- Tras recibir dano, la nave entra en un breve tiempo de invulnerabilidad.
- Si las vidas llegan a cero, aparece la pantalla de `GAME OVER`.
- Actualmente, para volver a jugar hay que **recargar la pagina**.

## Audio

El proyecto incluye:

- musica de fondo
- sonido de disparo
- sonido de explosion
- sonido de dano
- sonido de fin de partida

La musica se inicia tras la primera interaccion del usuario, siguiendo las restricciones normales del navegador para reproducir audio. Es por eso que es importante darle click si o si a cualquier parte de la pantalla para poder recien darle click al boton de play game para no tener inconsistencias con el sonido
Creditos de la musica a [Solid State Scouter Gameboy - 8 bits](https://www.youtube.com/watch?v=ZaaeKhIZnNo).