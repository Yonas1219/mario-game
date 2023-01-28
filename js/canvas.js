import platform from "../image/platform.png";
import hills from "../image/hills.png";
import background from "../image/background.png";
import platformSmallTall from "../image/platformSmallTall.png";

import spriteRunLeft from "../image/spriteRunLeft.png";
import spriteRunRight from "../image/spriteRunRight.png";
import spriteStandLeft from "../image/spriteStandLeft.png";
import spriteStandRight from "../image/spriteStandRight.png";
import win from '../audio/win.wav';
// import coinimage from '../image/coin.jpeg';
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const gravity = 1.5;
// let gameWon = false;
// let soundEffect = document.getElementById("sound_effect");
// var scorebtn = document.getElementById("score");
// var scoreBtn = document.getElementById("score_btn");
var restartButton = document.getElementById("restart-button");
var winSound = new Audio(win.wav);
class Player {
  
  constructor() {
    this.speed = 10;
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 66;
    this.height = 150;
    this.image = createImage(spriteStandRight);
    this.frames = 0;
    this.sprites = {
      stand: {
        right: createImage(spriteStandRight),
        left: createImage(spriteStandLeft),
        cropWidth: 177,
        width: 66,
      },
      run: {
        right: createImage(spriteRunRight),
        left: createImage(spriteRunLeft),
        cropWidth: 341,
        width: 127.875,
      },
    };
    this.currentSprite = this.sprites.stand.right;
    this.currentCropWidth = 177;
  }

  draw() {
    c.drawImage(
      this.currentSprite,
      this.currentCropWidth * this.frames,
      0,
      this.currentCropWidth, ///////////////////////// to make the avatar one
      400,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.frames++; ////////// to get the next avatar
    if (
      this.frames > 59 &&
      (this.currentSprite === this.sprites.stand.right ||
        this.currentSprite === this.sprites.stand.left)
    )
      this.frames = 0;
    else if (
      this.frames > 29 &&
      (this.currentSprite === this.sprites.run.right ||
        this.currentSprite === this.sprites.run.left)
    )
      this.frames = 0;
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
   
    if (scrollOffset > platformImage.width * 5 + 300 - 2) {
      restartButton.style.display = "block";
      // scorebtn.style.display = "none";
      // this.score += 5;
      // passObstacle()
    }
    
    else{
      restartButton.style.display = "none";
      // score()
    }
}
}
  //////////////////////////////////////////// reset the game
  restartButton.addEventListener("click", function () {
    // reset game state
    gameWon = false;
    player.speed = 10;
    player.position.x = 0;
    player.position.y = 0;
    player.velocity.x = 0;
    player.velocity.y = 0;
    player.frames = 0;
    restartButton.style.display = "none";
  
    // re-initialize and start game
    init();
    draw();
  });
  
////////////////////////////////////////////////////////// score /
// function score(){
//   scorebtn.style.display = "block";
//   let score = 0;
//   setInterval(() => {
//       score++;
//       console.log(score);
//   }, 1000);
// }


 
  


// scoreBtn.addEventListener("click", function(){
//   score += 10;
//   document.getElementById("score").innerHTML = score
// });

  ////////////////////////////////////////////////////////////////

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };

    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}



// class Coin{
//   constructor ({ x, y, image }) {
//     this.speed = 0;
//     this.position = {
//       x,
//       y
//     };
//     this.image = image;
//     this.width = image.width;
//     this.height = image.height;
//     this.velocity = {
//       x,
//       y
//     }
//   }
//   draw() {
//     c.drawImage(this.image, this.position.x, this.position.y);
//   }
//   undraw(){
//     let backgroundImg = createImage(background);
//     c.clearRect(this.position.x, this.position.y, this.width, this.height);
//     c.drawImage(this.position.x, this.position.y,backgroundImg);
//   }
 

// } 

class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y
    };

    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

//////////////////////////////////////////////// play sound
function playSound() {
    soundEffect.currentTime = 0;
    soundEffect.volume = 0.5;
    soundEffect.play();
}


function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
}

let platformImage = createImage(platform);
let platformSmallTallImage = createImage(platformSmallTall);
let player = new Player();
let platforms = [];
let genericObjects = [];
let lastKey;
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

let scrollOffset = 0;

function init() {
  platformImage = createImage(platform);
  player = new Player();
  platforms = [
    new Platform({
      x:platformImage.width * 4 +
        300 -
        2 +
        platformImage.width -
        platformSmallTallImage.width,
      y: 270,
      image: createImage(platformSmallTall),
    }),
    new Platform({
      x: -1,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width - 3,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 2 + 100,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 3 + 300,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 4 + 300 - 2,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 5 + 700 - 2,
      y: 470,
      image: platformImage,
    }),
  ];

  genericObjects = [
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage(background),
    }),

    new GenericObject({
      x: -1,
      y: -1,
      image: createImage(hills),
    }),
  ];

  scrollOffset = 0;
}
let score = 0;
let highScore = 0;
function drawScore(){
if(player.velocity.y !== 0 && keys.right.pressed){
  score += 1;
  c.fillStyle = "white";
  c.font = "20px Verdana";
  c.fillText("score:"+ score, canvas.width-105, 20 )
  console.log(score);
}
else{
c.fillStyle = "white";
c.font = "20px Verdana";
c.fillText("score:"+ score, canvas.width-105, 20 )

}

}
// drawScore();
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);
  
  
  genericObjects.forEach((genericObjects) => {
    genericObjects.draw();
  });
  
  
  
  platforms.forEach((platform) => {
    platform.draw();
  });
  
  player.update();
  
  
  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = player.speed;
  } else if (
    (keys.left.pressed && player.position.x > 100) ||
    (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
    ) {
      player.velocity.x = -player.speed;
    } else {
      player.velocity.x = 0;
    if (keys.right.pressed) {
      scrollOffset += player.speed;
      platforms.forEach((platform) => {
        platform.position.x -= player.speed;
      });
      genericObjects.forEach((genericObject) => {
        genericObject.position.x -= player.speed * 0.66;
      });
    } else if (keys.left.pressed && scrollOffset > 0) {
      scrollOffset -= player.speed;
      platforms.forEach((platform) => {
        platform.position.x += player.speed;
      });
      genericObjects.forEach((genericObject) => {
        genericObject.position.x += player.speed * 0.66;
      });
    }
  }

  // ////////////////////    coin collision detection


  ////////////////////    platform collision detection

  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });


  //////////// sprite switching
  if (
    keys.right.pressed &&
    lastKey === "right" &&
    player.currentSprite !== player.sprites.run.right
  ) {
    player.frames = 1;
    player.currentSprite = player.sprites.run.right;
    player.currentCropWidth = player.sprites.run.cropWidth;
    player.width = player.sprites.run.width;
  } else if (
    keys.left.pressed &&
    lastKey === "left" &&
    player.currentSprite !== player.sprites.run.left
  ) {
    player.currentSprite = player.sprites.run.left;
    player.currentCropWidth = player.sprites.run.cropWidth;
    player.width = player.sprites.run.width;
  } else if (
    !keys.left.pressed &&
    lastKey === "left" &&
    player.currentSprite !== player.sprites.stand.left
  ) {
    player.currentSprite = player.sprites.stand.left;
    player.currentCropWidth = player.sprites.stand.cropWidth;
    player.width = player.sprites.stand.width;
  } else if (
    !keys.right.pressed &&
    lastKey === "right" &&
    player.currentSprite !== player.sprites.stand.right
  ) {
    player.currentSprite = player.sprites.stand.right;
    player.currentCropWidth = player.sprites.stand.cropWidth;
    player.width = player.sprites.stand.width;
  }

  drawScore();

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function winCelebration() {
    // Stop the game loop
    winSound.play();
    cancelAnimationFrame(animate);

    // Play a victory jingle

    // Show a "win" animation on player
    player.image = player.sprites.stand.right;
    player.currentCropWidth = 177;
    player.frames = 30;

    // Create an array to store the fireworks
    let fireworks = [];

    // Create a function to draw the fireworks
    function drawFireworks() {
      c.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < fireworks.length; i++) {
        let firework = fireworks[i];
        firework.draw();
        firework.update();
        if (firework.position.y > canvas.height) {
          fireworks.splice(i, 1);
        }
      }
    }

    // Create a class for the fireworks
    class Firework {
      constructor() {
        this.position = {
          x: Math.random() * canvas.width,
          y: canvas.height,
        };
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.radius = Math.random() * 10 + 5;
        this.velocity = {
          x: Math.random() * 2 - 1,
          y: Math.random() * -10 - 5,
        };
      }

      draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
        // Draw the win message
        c.fillStyle = "white";
        c.font = "40px Arial";
        c.fillText(`you win! score is ${score}`, 300, 300);

        
  
      }
      update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
      }
    }

    // Create an interval to add new fireworks
    let interval = setInterval(function () {
      fireworks.push(new Firework());
    }, 100);

    // Create a loop to animate the fireworks
    function animateFireworks() {
      drawFireworks();
      requestAnimationFrame(animateFireworks);
    }
    animateFireworks();

    ////////////////

    // Set a timeout to stop the animation and clear the interval
    setTimeout(function () {
      clearInterval(interval);
      c.clearRect(0, 0, canvas.width, canvas.height);
    }, 3000);
  }



  ////////////////////win condition
  if (scrollOffset > platformImage.width * 5 + 300 - 2) {
    winCelebration();

    // score = 0;
    // requestAnimationFrame(animate)
  }
  
  if (player.position.y > canvas.height) {

    setTimeout(function () {
      clearInterval(interval);
      c.clearRect(0, 0, canvas.width, canvas.height);
    }, 3000);

    c.fillStyle = "white";
        c.font = "40px Arial";
        c.fillText(" you lose!", 300, 300);
    init();
  }

  // /////////////////////////lose condition
  // if (player.position.y > canvas.height) {

  // }
}

init();
animate();

addEventListener("keydown", ({ keyCode }) => {
  // console.log(keyCode)
  switch (keyCode) {
    case 65:
      keys.left.pressed = true;
      lastKey = "left";
      break;
    case 83:
      console.log("down");
      break;
    case 68:
      console.log("right");
      keys.right.pressed = true;
      lastKey = "right";
      break;
    case 87:
      console.log("up");
      player.velocity.y -= 25;
      break;
  }
});

addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = false;
      break;
    case 83:
      console.log("down");
      break;
    case 68:
      console.log("right");
      keys.right.pressed = false;

      break;
    case 87:
      console.log("up");

      break;
  }

  // console.log(keys.right.pressed)
});
