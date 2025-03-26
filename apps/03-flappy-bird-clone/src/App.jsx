import React from 'react';
import './App.css';
// Yellow bird
import yellowBirdUpFlap from './assets/yellowbird-upflap.png';
import yellowBirdMidFlap from './assets/yellowbird-midflap.png';
import yellowBirdDownFlap from './assets/yellowbird-downflap.png';
// Red bird
import redBirdUpFlap from './assets/redbird-upflap.png';
import redBirdMidFlap from './assets/redbird-midflap.png';
import redBirdDownFlap from './assets/redbird-downflap.png';
// Blue bird
import blueBirdUpFlap from './assets/bluebird-upflap.png';
import blueBirdMidFlap from './assets/bluebird-midflap.png';
import blueBirdDownFlap from './assets/bluebird-downflap.png';
// Pipes
import pipeGreen from './assets/pipe-green.png';
import pipeRed from './assets/pipe-red.png';
// Backgrounds and UI
import backgroundDay from './assets/background-day.png';
import backgroundNight from './assets/background-night.png';
import base from './assets/base.png';
import gameoverMessage from './assets/gameover.png';
import startMessage from './assets/message.png';

const GRAVITY = 0.5;
const FLAP_SPEED = -8;
const PIPE_SPEED = 2;
const PIPE_SPACING = 150;
const PIPE_WIDTH = 52;
const BIRD_WIDTH = 34 * 1.5; // 1.5x bigger
const BIRD_HEIGHT = 24 * 1.5; // 1.5x bigger
const ANIMATION_SPEED = 0.15;
const GROUND_HEIGHT = 112; // Height of the ground sprite
const CLOUD_SPEED = 1;

// Cloud configuration
const CLOUDS = [
  { x: 0, y: 50, width: 100, height: 60, speed: 0.5 },
  { x: 300, y: 100, width: 120, height: 70, speed: 0.7 },
  { x: 600, y: 30, width: 80, height: 50, speed: 0.3 },
];

// Bird color variants
const BIRD_VARIANTS = {
  yellow: {
    up: yellowBirdUpFlap,
    mid: yellowBirdMidFlap,
    down: yellowBirdDownFlap,
  },
  red: {
    up: redBirdUpFlap,
    mid: redBirdMidFlap,
    down: redBirdDownFlap,
  },
  blue: {
    up: blueBirdUpFlap,
    mid: blueBirdMidFlap,
    down: blueBirdDownFlap,
  },
};

const PIPE_VARIANTS = [pipeGreen, pipeRed];

function App() {
  const canvasRef = React.useRef(null);
  const [imagesLoaded, setImagesLoaded] = React.useState(false);
  const [loadedImages, setLoadedImages] = React.useState({});
  const frameRef = React.useRef(0);
  const [currentBirdColor, setCurrentBirdColor] = React.useState('yellow');
  const [currentPipeColor, setCurrentPipeColor] = React.useState(0);
  const [currentBackground, setCurrentBackground] = React.useState('day');
  const cloudsRef = React.useRef([...CLOUDS]);
  
  const gameRef = React.useRef({
    bird: { x: 100, y: 200, velocity: 0 },
    pipes: [],
    groundX: 0,
    score: 0,
    gameStarted: false,
    gameOver: false,
    animationFrame: 0
  });
  
  const [score, setScore] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);

  // Load images
  React.useEffect(() => {
    const birdColors = Object.keys(BIRD_VARIANTS);
    const imageSources = {
      birdUp: BIRD_VARIANTS[currentBirdColor].up,
      birdMid: BIRD_VARIANTS[currentBirdColor].mid,
      birdDown: BIRD_VARIANTS[currentBirdColor].down,
      pipe: PIPE_VARIANTS[currentPipeColor],
      background: currentBackground === 'day' ? backgroundDay : backgroundNight,
      ground: base,
      gameover: gameoverMessage,
      start: startMessage
    };

    const loadedImgs = {};
    let loadCount = 0;
    const totalImages = Object.keys(imageSources).length;

    Object.entries(imageSources).forEach(([key, src]) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedImgs[key] = img;
        loadCount++;
        if (loadCount === totalImages) {
          setLoadedImages(loadedImgs);
          setImagesLoaded(true);
        }
      };
    });
  }, [currentBirdColor, currentPipeColor, currentBackground]);

  // Initialize game state
  const initGame = React.useCallback(() => {
    // Randomly select bird, pipe colors and background
    const birdColors = Object.keys(BIRD_VARIANTS);
    const randomBirdColor = birdColors[Math.floor(Math.random() * birdColors.length)];
    const randomPipeColor = Math.floor(Math.random() * PIPE_VARIANTS.length);
    const randomBackground = Math.random() < 0.5 ? 'day' : 'night';
    
    setCurrentBirdColor(randomBirdColor);
    setCurrentPipeColor(randomPipeColor);
    setCurrentBackground(randomBackground);
    
    cloudsRef.current = [...CLOUDS];
    
    gameRef.current = {
      bird: { x: 100, y: 200, velocity: 0 },
      pipes: [],
      groundX: 0,
      score: 0,
      gameStarted: false,
      gameOver: false,
      animationFrame: 0
    };
    setScore(0);
    setGameOver(false);
  }, []);

  // Draw bird animation
  const drawBird = React.useCallback((ctx, bird) => {
    if (!loadedImages.birdUp) return;

    const frame = Math.floor(frameRef.current) % 3;
    let birdImage;
    
    // Select the appropriate frame
    if (frame === 0) birdImage = loadedImages.birdUp;
    else if (frame === 1) birdImage = loadedImages.birdMid;
    else birdImage = loadedImages.birdDown;
    
    // Calculate rotation based on velocity
    const rotation = Math.min(Math.max(bird.velocity * 0.2, -0.5), 0.5);
    
    ctx.save();
    ctx.translate(bird.x + BIRD_WIDTH/2, bird.y + BIRD_HEIGHT/2);
    ctx.rotate(rotation);
    ctx.drawImage(
      birdImage,
      -BIRD_WIDTH/2,
      -BIRD_HEIGHT/2,
      BIRD_WIDTH,
      BIRD_HEIGHT
    );
    ctx.restore();
  }, [loadedImages]);

  // Draw pipe
  const drawPipe = React.useCallback((ctx, pipe, isTop) => {
    if (!loadedImages.pipe) return;

    ctx.save();
    if (isTop) {
      // Draw top pipe (flipped vertically)
      ctx.translate(pipe.x, pipe.gapY);
      ctx.scale(1, -1);
      ctx.drawImage(
        loadedImages.pipe,
        0,
        0,
        PIPE_WIDTH,
        pipe.gapY
      );
    } else {
      // Draw bottom pipe
      ctx.drawImage(
        loadedImages.pipe,
        pipe.x,
        pipe.gapY + PIPE_SPACING,
        PIPE_WIDTH,
        window.innerHeight - (pipe.gapY + PIPE_SPACING) - GROUND_HEIGHT
      );
    }
    ctx.restore();
  }, [loadedImages]);

  // Generate new pipe
  const generatePipe = React.useCallback(() => {
    const gapY = Math.random() * (window.innerHeight - PIPE_SPACING - GROUND_HEIGHT - 100) + 50;
    return {
      x: window.innerWidth,
      gapY,
      passed: false
    };
  }, []);

  // Handle user input
  const handleInput = React.useCallback(() => {
    const game = gameRef.current;
    if (!game.gameStarted) {
      game.gameStarted = true;
    }
    if (!game.gameOver) {
      game.bird.velocity = FLAP_SPEED;
    }
  }, []);

  // Game loop
  React.useEffect(() => {
    if (!imagesLoaded) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let lastTime = 0;

    const gameLoop = (timestamp) => {
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      
      if (gameRef.current.gameStarted && !gameRef.current.gameOver) {
        frameRef.current += 0.1 * (deltaTime / 16.67);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const game = gameRef.current;

      // Draw background
      ctx.drawImage(loadedImages.background, 0, 0, canvas.width, canvas.height);

      // Draw clouds
      cloudsRef.current.forEach((cloud, index) => {
        // Draw a simple cloud shape
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(cloud.x + cloud.width/4, cloud.y + cloud.height/2, cloud.width/4, 0, Math.PI * 2);
        ctx.arc(cloud.x + cloud.width/2, cloud.y + cloud.height/3, cloud.width/3, 0, Math.PI * 2);
        ctx.arc(cloud.x + (cloud.width*3/4), cloud.y + cloud.height/2, cloud.width/4, 0, Math.PI * 2);
        ctx.fill();
        
        // Update cloud position
        cloud.x -= cloud.speed;
        
        // Reset cloud position when it moves off screen
        if (cloud.x + cloud.width < 0) {
          cloud.x = canvas.width;
        }
      });

      // Update ground position
      game.groundX = (game.groundX - PIPE_SPEED) % GROUND_HEIGHT;
      
      // Calculate how many ground segments we need to fill the screen
      const groundSegments = Math.ceil(canvas.width / GROUND_HEIGHT) + 1;
      
      // Draw ground segments
      for (let i = 0; i < groundSegments; i++) {
        ctx.drawImage(
          loadedImages.ground,
          game.groundX + (i * GROUND_HEIGHT),
          canvas.height - GROUND_HEIGHT,
          GROUND_HEIGHT,
          GROUND_HEIGHT
        );
      }

      if (game.gameStarted && !game.gameOver) {
        game.bird.y += game.bird.velocity;
        game.bird.velocity += GRAVITY;

        // Update pipes
        game.pipes = game.pipes
          .map(pipe => ({ ...pipe, x: pipe.x - PIPE_SPEED }))
          .filter(pipe => pipe.x > -PIPE_WIDTH);

        if (game.pipes.length === 0 || game.pipes[game.pipes.length - 1].x < window.innerWidth - 300) {
          game.pipes.push(generatePipe());
        }

        // Check collisions
        game.pipes.forEach(pipe => {
          if (
            game.bird.x + BIRD_WIDTH * 0.7 > pipe.x &&
            game.bird.x + BIRD_WIDTH * 0.3 < pipe.x + PIPE_WIDTH &&
            (game.bird.y + BIRD_HEIGHT * 0.7 < pipe.gapY || 
             game.bird.y + BIRD_HEIGHT * 0.3 > pipe.gapY + PIPE_SPACING)
          ) {
            game.gameOver = true;
            setGameOver(true);
          }
        });

        // Check if bird hits ground
        if (game.bird.y > canvas.height - GROUND_HEIGHT - BIRD_HEIGHT || game.bird.y < 0) {
          game.gameOver = true;
          setGameOver(true);
        }

        // Update score
        game.pipes.forEach(pipe => {
          if (!pipe.passed && pipe.x < game.bird.x) {
            game.score++;
            setScore(game.score);
            pipe.passed = true;
          }
        });
      }

      // Draw pipes
      game.pipes.forEach(pipe => {
        drawPipe(ctx, pipe, true);
        drawPipe(ctx, pipe, false);
      });

      // Draw bird
      drawBird(ctx, game.bird);

      // Draw score
      ctx.fillStyle = '#FFF';
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 4;
      ctx.font = 'bold 36px Arial';
      const scoreText = game.score.toString();
      const scoreX = canvas.width / 2 - ctx.measureText(scoreText).width / 2;
      ctx.strokeText(scoreText, scoreX, 50);
      ctx.fillText(scoreText, scoreX, 50);

      // Draw game over or start message
      if (game.gameOver) {
        // Draw semi-transparent overlay
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw game over message
        const gameoverImg = loadedImages.gameover;
        const gameoverX = canvas.width / 2 - gameoverImg.width / 2;
        const gameoverY = canvas.height / 2 - gameoverImg.height;
        ctx.drawImage(gameoverImg, gameoverX, gameoverY);
      } else if (!game.gameStarted) {
        // Draw start message
        const startImg = loadedImages.start;
        const startX = canvas.width / 2 - startImg.width / 2;
        const startY = canvas.height / 2 - startImg.height / 2;
        ctx.drawImage(startImg, startX, startY);
      }

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    gameLoop(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [imagesLoaded, generatePipe, drawBird, drawPipe, loadedImages]);

  // Event handlers remain the same...
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (gameRef.current.gameOver) {
          initGame();
        } else {
          handleInput();
        }
      }
    };

    const handleTouch = (e) => {
      e.preventDefault();
      if (gameRef.current.gameOver) {
        initGame();
      } else {
        handleInput();
      }
    };

    const handleClick = (e) => {
      e.preventDefault();
      if (gameRef.current.gameOver) {
        initGame();
      } else {
        handleInput();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('touchstart', handleTouch, { passive: false });
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('click', handleClick);
    };
  }, [handleInput, initGame]);

  return (
    <div className="game-container">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="game-canvas"
      />
    </div>
  );
}

export default App;
