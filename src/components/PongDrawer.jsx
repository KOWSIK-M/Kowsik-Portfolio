import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
  X,
} from "lucide-react";

const WIDTH = 320;
const HEIGHT = 210;
const PADDLE_HEIGHT = 42;
const BALL_RADIUS = 5;
const initialGame = () => ({
  ballX: WIDTH / 2,
  ballY: HEIGHT / 2,
  velocityX: -145,
  velocityY: 70,
  playerY: (HEIGHT - PADDLE_HEIGHT) / 2,
  computerY: (HEIGHT - PADDLE_HEIGHT) / 2,
  playerScore: 0,
  computerScore: 0,
});
const clamp = (value, low, high) => Math.max(low, Math.min(high, value));

export default function PongDrawer() {
  const [open, setOpen] = useState(false);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState([0, 0]);
  const [notice, setNotice] = useState("Move your paddle. First to five wins.");
  const canvasRef = useRef(null);
  const gameRef = useRef(initialGame());
  const handleStartX = useRef(null);
  const ignoreHandleClick = useRef(false);

  useEffect(() => {
    if (!open) return undefined;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!context) return undefined;
    let frame;
    let previousTime;

    const draw = () => {
      const game = gameRef.current;
      context.fillStyle = "#100c1e";
      context.fillRect(0, 0, WIDTH, HEIGHT);
      context.strokeStyle = "#352b50";
      context.setLineDash([4, 7]);
      context.beginPath();
      context.moveTo(WIDTH / 2, 12);
      context.lineTo(WIDTH / 2, HEIGHT - 12);
      context.stroke();
      context.setLineDash([]);
      context.fillStyle = "#b398ff";
      context.fillRect(13, game.playerY, 7, PADDLE_HEIGHT);
      context.fillStyle = "#e278b5";
      context.fillRect(WIDTH - 20, game.computerY, 7, PADDLE_HEIGHT);
      context.fillStyle = "#f5edff";
      context.beginPath();
      context.arc(game.ballX, game.ballY, BALL_RADIUS, 0, Math.PI * 2);
      context.fill();
    };

    const resetBall = (direction) => {
      const game = gameRef.current;
      game.ballX = WIDTH / 2;
      game.ballY = HEIGHT / 2;
      game.velocityX = 145 * direction;
      game.velocityY = (Math.random() > 0.5 ? 1 : -1) * 70;
    };

    const tick = (time) => {
      if (previousTime === undefined) previousTime = time;
      const delta = Math.min((time - previousTime) / 1000, 0.04);
      previousTime = time;
      const game = gameRef.current;
      game.ballX += game.velocityX * delta;
      game.ballY += game.velocityY * delta;
      if (game.ballY <= BALL_RADIUS || game.ballY >= HEIGHT - BALL_RADIUS) {
        game.velocityY *= -1;
        game.ballY = clamp(game.ballY, BALL_RADIUS, HEIGHT - BALL_RADIUS);
      }
      const target = game.ballY - PADDLE_HEIGHT / 2;
      game.computerY += clamp(target - game.computerY, -85 * delta, 85 * delta);
      game.computerY = clamp(game.computerY, 0, HEIGHT - PADDLE_HEIGHT);

      if (game.velocityX < 0 && game.ballX <= 23) {
        if (
          game.ballY >= game.playerY - 5 &&
          game.ballY <= game.playerY + PADDLE_HEIGHT + 5
        ) {
          game.ballX = 23;
          game.velocityX = Math.min(Math.abs(game.velocityX) * 1.055, 260);
          game.velocityY +=
            (game.ballY - game.playerY - PADDLE_HEIGHT / 2) * 1.5;
        } else if (game.ballX < -BALL_RADIUS) {
          game.computerScore += 1;
          setScore([game.playerScore, game.computerScore]);
          resetBall(1);
        }
      }
      if (game.velocityX > 0 && game.ballX >= WIDTH - 23) {
        if (
          game.ballY >= game.computerY - 5 &&
          game.ballY <= game.computerY + PADDLE_HEIGHT + 5
        ) {
          game.ballX = WIDTH - 23;
          game.velocityX = -Math.min(Math.abs(game.velocityX) * 1.055, 260);
          game.velocityY +=
            (game.ballY - game.computerY - PADDLE_HEIGHT / 2) * 1.2;
        } else if (game.ballX > WIDTH + BALL_RADIUS) {
          game.playerScore += 1;
          setScore([game.playerScore, game.computerScore]);
          resetBall(-1);
        }
      }
      draw();
      if (game.playerScore >= 5 || game.computerScore >= 5) {
        setRunning(false);
        setNotice(
          game.playerScore >= 5
            ? "You win. Nicely played."
            : "Computer wins. Try again?",
        );
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    draw();
    if (running) frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [open, running]);

  useEffect(() => {
    if (!open) return undefined;
    const pauseWhenHidden = () => {
      if (document.hidden) setRunning(false);
    };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () =>
      document.removeEventListener("visibilitychange", pauseWhenHidden);
  }, [open]);

  const reset = () => {
    gameRef.current = initialGame();
    setScore([0, 0]);
    setNotice("Move your paddle. First to five wins.");
    setRunning(false);
  };
  const movePaddle = (clientY) => {
    const bounds = canvasRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const y = ((clientY - bounds.top) / bounds.height) * HEIGHT;
    gameRef.current.playerY = clamp(
      y - PADDLE_HEIGHT / 2,
      0,
      HEIGHT - PADDLE_HEIGHT,
    );
  };

  return (
    <aside
      className={`pong-shell ${open ? "is-open" : ""}`}
      aria-label="Mini Pong game"
    >
      <button
        type="button"
        className="pong-handle"
        aria-label={open ? "Close mini game" : "Open mini game"}
        aria-expanded={open}
        onPointerDown={(event) => {
          ignoreHandleClick.current = false;
          handleStartX.current = event.clientX;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={(event) => {
          if (handleStartX.current === null) return;
          const distance = event.clientX - handleStartX.current;
          handleStartX.current = null;
          if (Math.abs(distance) < 35) return;
          ignoreHandleClick.current = true;
          setOpen(distance > 0);
          setRunning(false);
        }}
        onPointerCancel={() => {
          handleStartX.current = null;
        }}
        onClick={() => {
          if (ignoreHandleClick.current) {
            ignoreHandleClick.current = false;
            return;
          }
          setOpen((value) => !value);
          setRunning(false);
        }}
      >
        {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        <span>PLAY</span>
      </button>
      {open && (
        <div className="pong-panel">
          <div className="pong-heading">
            <div>
              <small>SIDE QUEST / 01</small>
              <strong>Mini Pong</strong>
            </div>
            <button
              type="button"
              aria-label="Close mini game"
              onClick={() => {
                setOpen(false);
                setRunning(false);
              }}
            >
              <X size={17} />
            </button>
          </div>
          <div className="pong-score" aria-live="polite">
            <span>YOU {score[0]}</span>
            <span>CPU {score[1]}</span>
          </div>
          <canvas
            ref={canvasRef}
            width={WIDTH}
            height={HEIGHT}
            tabIndex={0}
            aria-label="Pong court. Use Up and Down or W and S to move your paddle. On touchscreens, drag on the court."
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              movePaddle(event.clientY);
              event.currentTarget.focus();
            }}
            onPointerMove={(event) => {
              if (event.buttons || event.pointerType === "touch")
                movePaddle(event.clientY);
            }}
            onKeyDown={(event) => {
              const key = event.key.toLowerCase();
              if (!["arrowup", "arrowdown", "w", "s"].includes(key)) return;
              event.preventDefault();
              gameRef.current.playerY = clamp(
                gameRef.current.playerY +
                  (["arrowup", "w"].includes(key) ? -18 : 18),
                0,
                HEIGHT - PADDLE_HEIGHT,
              );
            }}
          />
          <p className="pong-notice" role="status">
            {notice}
          </p>
          <div className="pong-actions">
            <button
              type="button"
              onClick={() => {
                if (score[0] >= 5 || score[1] >= 5) reset();
                setRunning((value) => !value);
                canvasRef.current?.focus();
              }}
            >
              {running ? <Pause size={14} /> : <Play size={14} />}{" "}
              {running ? "Pause" : "Play"}
            </button>
            <button type="button" onClick={reset}>
              <RotateCcw size={14} /> Reset
            </button>
          </div>
          <small className="pong-help">↑ ↓ / W S · drag paddle on touch</small>
        </div>
      )}
    </aside>
  );
}
