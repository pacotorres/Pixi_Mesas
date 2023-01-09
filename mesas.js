// Crea una instancia de PIXI.Application
function aleatorio(inferior,superior){
  numPosibilidades = superior - inferior
  aleat = Math.random() * numPosibilidades
  aleat = Math.floor(aleat)
  return parseInt(inferior) + aleat
}
function dame_color_aleatorio(){
  hexadecimal = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F")
  color_aleatorio = "0xff";
  for (i=0;i<6;i++){
     posarray = aleatorio(0,hexadecimal.length)
     color_aleatorio += hexadecimal[posarray]
  }
  return color_aleatorio
}

console.log(dame_color_aleatorio());

const app = new PIXI.Application({
    width: 1000,
    height: 600,
    background: '#FF6347'
  });
  
  // Agrega la escena a la página web
  document.body.appendChild(app.view);
  
  // Crea una habitación rectangular
  const room = new PIXI.Graphics();
  room.beginFill(0xff1099bb);
  room.drawRect(0, 0, 1000, 600);
  room.endFill();

  const graphics = new PIXI.Graphics();
  for(var i = 0; i < 1000; i++){            
    for(var j = 0; j < 600; j++){    
      //console.log(grid[i][j]);            
      //var cell = this.grid[i][j];                
      graphics.beginFill(parseInt(dame_color_aleatorio()));                
      graphics.drawRect(i*30, j*30, 30, 30);     
    }        
  }        
  
  graphics.endFill();    
  
  // Agrega la habitación a la escena
  app.stage.addChild(room);
  app.stage.addChild(graphics);
  
  // Crea una lista de mesas y sillas
  const furniture = [
    { name: "Table 1", width: 200, height: 100 },
    { name: "Table 2", width: 150, height: 75 },
    { name: "Chair 1", width: 50, height: 50 },
    { name: "Chair 2", width: 50, height: 50 },
    { name: "Chair 3", width: 50, height: 50 },
  ];
  
  // Ordena la lista de mesas y sillas de mayor a menor tamaño
  furniture.sort((a, b) => (a.width * a.height > b.width * b.height ? -1 : 1));
  
  // Coloca las mesas y sillas en la habitación
  let x = 0;
  let y = 0;
  for (const piece of furniture) {
    // Crea una imagen para la mesa o silla
    const image = PIXI.Sprite.from(`https://cdn-icons-png.flaticon.com/512/607/607069.png`);
    image.x = x;
    image.y = y;
    image.width = piece.width;
    image.height = piece.height;

    image.interactive = true
    image.cursor = 'pointer';

    image.on('click', onClickStart, image);
    image.on('pointerdown', onDragStart, image);
  
    // Agrega la mesa o silla a la habitación
    app.stage.addChild(image);
  
    // Actualiza la posición para la siguiente mesa o silla
    x += piece.width;
    if (x + piece.width > room.width) {
      x = 0;
      y += piece.height;
    }

    
  }
  
let dragTarget = null;

app.stage.interactive = true;
app.stage.hitArea = app.screen;
app.stage.on('pointerup', onDragEnd);
app.stage.on('pointerupoutside', onDragEnd);

function onDragMove(event) {
    if (dragTarget) {
        dragTarget.parent.toLocal(event.global, null, dragTarget.position);
    }
}

function onDragStart() {
  console.log('moviendo');
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    console.log(app.stage);
    this.alpha = 0.5;
    dragTarget = this;
    app.stage.on('pointermove', onDragMove);
}

function onDragEnd() {
    if (dragTarget) {
        app.stage.off('pointermove', onDragMove);
        dragTarget.alpha = 1;
        dragTarget = null;
    }
}
  
function onClickStart() {
  console.log('click');
}