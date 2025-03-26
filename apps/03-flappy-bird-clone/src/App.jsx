import React from 'react';
import './App.css';

const GRAVITY = 0.5;
const FLAP_SPEED = -8;
const PIPE_SPEED = 2;
const PIPE_SPACING = 150;
const PIPE_WIDTH = 60;

function App() {
  const canvasRef = React.useRef(null);
  const gameRef = React.useRef({
    bird: { x: 100, y: 200, velocity: 0 },
    pipes: [],
    score: 0,
    gameStarted: false,
    gameOver: false
  });
  const [score, setScore] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);

  // Initialize game state
  const initGame = React.useCallback(() => {
    gameRef.current = {
      bird: { x: 100, y: 200, velocity: 0 },
      pipes: [],
      score: 0,
      gameStarted: false,
      gameOver: false
    };
    setScore(0);
    setGameOver(false);
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

  // Generate new pipe
  const generatePipe = React.useCallback(() => {
    const gapY = Math.random() * (window.innerHeight - PIPE_SPACING - 100) + 50;
    return {
      x: window.innerWidth,
      gapY,
      passed: false
    };
  }, []);

  // Game loop
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const gameLoop = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Get current game state
      const game = gameRef.current;

      // Update bird position
      if (game.gameStarted && !game.gameOver) {
        game.bird.y += game.bird.velocity;
        game.bird.velocity += GRAVITY;

        // Update pipes
        game.pipes = game.pipes
          .map(pipe => ({ ...pipe, x: pipe.x - PIPE_SPEED }))
          .filter(pipe => pipe.x > -PIPE_WIDTH);

        // Add new pipe if needed
        if (game.pipes.length === 0 || game.pipes[game.pipes.length - 1].x < window.innerWidth - 300) {
          game.pipes.push(generatePipe());
        }

        // Check collisions
        game.pipes.forEach(pipe => {
          if (
            game.bird.x + 30 > pipe.x &&
            game.bird.x < pipe.x + PIPE_WIDTH &&
            (game.bird.y < pipe.gapY || game.bird.y + 30 > pipe.gapY + PIPE_SPACING)
          ) {
            game.gameOver = true;
            setGameOver(true);
          }
        });

        // Check if bird hits ground or ceiling
        if (game.bird.y > window.innerHeight - 30 || game.bird.y < 0) {
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

      // Draw background
      ctx.fillStyle = '#87CEEB';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw bird
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(game.bird.x, game.bird.y, 30, 30);

      // Draw pipes
      ctx.fillStyle = '#2ecc71';
      game.pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.gapY);
        ctx.fillRect(pipe.x, pipe.gapY + PIPE_SPACING, PIPE_WIDTH, window.innerHeight);
      });

      // Draw score
      ctx.fillStyle = '#000';
      ctx.font = '24px Arial';
      ctx.fillText(`Score: ${game.score}`, 20, 40);

      // Draw game over screen
      if (game.gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = '48px Arial';
        ctx.fillText('Game Over!', canvas.width / 2 - 100, canvas.height / 2);
        ctx.font = '24px Arial';
        ctx.fillText('Press Space to Restart', canvas.width / 2 - 100, canvas.height / 2 + 40);
      }

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [generatePipe]);

  // Handle user input
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault(); // Prevent page scrolling
        if (gameRef.current.gameOver) {
          initGame();
        } else {
          handleInput();
        }
      }
    };

    const handleTouch = (e) => {
      e.preventDefault(); // Prevent default touch behavior
      if (gameRef.current.gameOver) {
        initGame();
      } else {
        handleInput();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('touchstart', handleTouch, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('touchstart', handleTouch);
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
