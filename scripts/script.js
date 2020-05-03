var cvs = document.querySelector("#canvas");
var ctx = cvs.getContext("2d");

// Создание объектов картинок и указание их расположения в проекте
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();
var gap = 90;
var score = 0;
bird.src = "./image/flappy_bird_bird.png";
bg.src = "./image/flappy_bird_bg.png";
fg.src = "./image/flappy_bird_fg.png";
pipeUp.src = "./image/flappy_bird_pipeUp.png";
pipeBottom.src = "./image/flappy_bird_pipeBottom.png";

// Звуковые файлы
var fly = new Audio();
var score_audio = new Audio();

fly.src = "./js_game_audio/fly.mp3";
score_audio.src = "./js_game_audio/score.mp3";

// Управление птичкой
document.addEventListener("keydown", moveUp);

 function moveUp() {
  
  yPos -= 40;
  fly.play();

}
 
// создание блоков
var pipe = [];

pipe[0] = {
 x : cvs.width,
 y : 0
}


// Позиция птички

var xPos = 10;
var yPos = 150;
var grav = 2;

//Рисование самих картинок на определенных координатах

function draw() {
 ctx.drawImage(bg, 0, 0);


 for (let i = 0; i < pipe.length; i++){

  ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
  ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

  pipe[i].x--;

  if (pipe[i].x == 125) {
   pipe.push({
    x: cvs.width,
    y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
   })
  }

  //отслеживание позиции 

  if(xPos + bird.width >= pipe[i].x
   && xPos <= pipe[i].x + pipeUp.width
   && (yPos <= pipe[i].y + pipeUp.height
   || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
   location.reload(); // Перезагрузка страницы
  }
  
  if(pipe[i].x == 5) {
   score++;
   score_audio.play();
   }

 };
 
 ctx.drawImage(fg, 0, 400);

 ctx.drawImage(bird, xPos, yPos);

 yPos += grav;

 ctx.fillStyle = "#000";
 ctx.font = "24px Verdana";
 ctx.fillText("Счет: " + score, 10, cvs.height - 20);


//функция для анимации птички и картинки
 requestAnimationFrame(draw);

};

pipeBottom.onload = draw;