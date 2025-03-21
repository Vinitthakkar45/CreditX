
import { useEffect, useRef } from "react";

export default function BackgroundEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Circle properties
    interface Circle {
      x: number;
      y: number;
      radius: number;
      color: string;
      velocity: {
        x: number;
        y: number;
      };
      alpha: number;
    }

    // Generate random circles
    const circles: Circle[] = [];
    const colors = ["#3b82f6", "#22c55e", "#8b5cf6", "#f59e0b"];

    for (let i = 0; i < 15; i++) {
      const radius = Math.random() * 100 + 50;
      const x = Math.random() * (canvas.width - radius * 2) + radius;
      const y = Math.random() * (canvas.height - radius * 2) + radius;
      
      circles.push({
        x,
        y,
        radius,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: {
          x: (Math.random() - 0.5) * 0.2,
          y: (Math.random() - 0.5) * 0.2,
        },
        alpha: Math.random() * 0.05 + 0.02,
      });
    }

    // Animation loop
    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw circles
      circles.forEach((circle) => {
        // Update position
        circle.x += circle.velocity.x;
        circle.y += circle.velocity.y;

        // Bounce off walls
        if (circle.x - circle.radius <= 0 || circle.x + circle.radius >= canvas.width) {
          circle.velocity.x *= -1;
        }
        if (circle.y - circle.radius <= 0 || circle.y + circle.radius >= canvas.height) {
          circle.velocity.y *= -1;
        }

        // Draw circle
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          circle.x,
          circle.y,
          0,
          circle.x,
          circle.y,
          circle.radius
        );
        gradient.addColorStop(0, `${circle.color}00`);
        gradient.addColorStop(0.5, `${circle.color}${Math.floor(circle.alpha * 255).toString(16).padStart(2, "0")}`);
        gradient.addColorStop(1, `${circle.color}00`);
        
        ctx.fillStyle = gradient;
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[-1]"
    />
  );
}
