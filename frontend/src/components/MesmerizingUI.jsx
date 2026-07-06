import React, { useEffect, useState, useRef } from "react";
import { Terminal, Shield, RefreshCw } from "lucide-react";

// 1. Live Telemetry Console (Dynamic scrolling console feed)
export function LiveTelemetryConsole() {
  const [logs, setLogs] = useState([
    "System ready. Awaiting connection...",
    "Telemetry established. Operational sync complete.",
  ]);
  const containerRef = useRef(null);

  const mockEvents = [
    "PARSER: Ingested CV for candidate Jane Doe (Fit: 94%)",
    "OKR: Completed milestone 'UI Redesign V2' (+15% progress)",
    "LEAVE: Processing leave request recommendations...",
    "COMPLIANCE: Privacy guidelines audited and certified",
    "POLICY: Command-R+ queried regarding remote office guidelines",
    "ROSTER: Active staff count increased to maximum capacity",
    "METRICS: Recalculated company recruitment score",
    "INTERVIEW: Generated structured questions for Frontend Senior title",
    "OKR: Overdue warning issued on milestone 'System Migration'",
    "TELEMETRY: Background synchronization successful.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString();
      const randomEvent = mockEvents[Math.floor(Math.random() * mockEvents.length)];
      setLogs((prev) => [...prev.slice(-30), `[${time}] ${randomEvent}`]);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="border border-cohere-black bg-primary text-emerald-400 p-5 rounded-sm font-mono text-[11px] shadow-lg flex flex-col h-72">
      <div className="flex items-center justify-between pb-3 border-b border-emerald-950 mb-3 text-emerald-500 font-bold uppercase tracking-wider text-[10px]">
        <span className="flex items-center gap-1.5">
          <Terminal className="h-3.5 w-3.5" /> Live Operational Log Feed
        </span>
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
      </div>
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto space-y-1.5 pr-2 scrollbar-thin scrollbar-thumb-emerald-950"
      >
        {logs.map((log, index) => (
          <div key={index} className="leading-relaxed whitespace-pre-wrap select-all">
            <span className="text-emerald-600">&gt;&gt;</span> {log}
          </div>
        ))}
      </div>
    </div>
  );
}

// 2. Candidate Radar Sweep (Canvas Radar Animation)
export function CandidateRadarSweep() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let angle = 0;

    // Fixed mockup candidate positions
    const blips = [
      { x: 0.3, y: 0.4, size: 4, opacity: 0, label: "JD" },
      { x: 0.7, y: 0.3, size: 5, opacity: 0, label: "JS" },
      { x: 0.5, y: 0.8, size: 3, opacity: 0, label: "SM" },
      { x: 0.25, y: 0.7, size: 4, opacity: 0, label: "AL" },
      { x: 0.8, y: 0.65, size: 6, opacity: 0, label: "KT" },
    ];

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = 200;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(cx, cy) - 10;

      // Clear with dark tech background
      ctx.fillStyle = "#17171c";
      ctx.fillRect(0, 0, w, h);

      // Draw outer target bounds
      ctx.strokeStyle = "rgba(0, 60, 51, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.6, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.2, 0, Math.PI * 2);
      ctx.stroke();

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(cx - radius, cy);
      ctx.lineTo(cx + radius, cy);
      ctx.moveTo(cx, cy - radius);
      ctx.lineTo(cx, cy + radius);
      ctx.stroke();

      // Sweep gradient line
      angle += 0.015;
      const sweepX = cx + Math.cos(angle) * radius;
      const sweepY = cy + Math.sin(angle) * radius;

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0, "rgba(0, 60, 51, 0)");
      grad.addColorStop(1, "rgba(0, 60, 51, 0.15)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, angle - 0.4, angle);
      ctx.closePath();
      ctx.fill();

      // Sweep beam line
      ctx.strokeStyle = "#ff7759"; // --color-coral sweep beam indicator
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(sweepX, sweepY);
      ctx.stroke();

      // Update and render Blips
      blips.forEach((blip) => {
        const bx = cx + (blip.x - 0.5) * radius * 1.8;
        const by = cy + (blip.y - 0.5) * radius * 1.8;

        // Calculate angle of this blip relative to center
        const blipAngle = Math.atan2(by - cy, bx - cx);
        let normAngle = angle % (Math.PI * 2);
        if (normAngle < 0) normAngle += Math.PI * 2;
        let normBlipAngle = blipAngle;
        if (normBlipAngle < 0) normBlipAngle += Math.PI * 2;

        // If the sweep line hits the blip, light it up
        const diff = Math.abs(normAngle - normBlipAngle);
        if (diff < 0.08) {
          blip.opacity = 1.0;
        } else {
          blip.opacity = Math.max(0, blip.opacity - 0.01);
        }

        if (blip.opacity > 0) {
          // Draw Glowing blip
          ctx.shadowBlur = 10;
          ctx.shadowColor = "rgba(255, 119, 89, 0.8)";
          ctx.fillStyle = `rgba(255, 119, 89, ${blip.opacity})`;
          ctx.beginPath();
          ctx.arc(bx, by, blip.size, 0, Math.PI * 2);
          ctx.fill();

          // Blip Label
          ctx.shadowBlur = 0;
          ctx.fillStyle = `rgba(117, 117, 138, ${blip.opacity})`;
          ctx.font = "8px 'Space Mono'";
          ctx.fillText(blip.label, bx + 8, by + 3);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="border border-hairline bg-canvas p-6 rounded-sm flex flex-col justify-between h-80">
      <div className="pb-3 border-b border-hairline flex items-center justify-between">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
            Recruitment Radar Scan
          </h2>
          <p className="font-body text-[10px] text-slate mt-0.5">Active parser query search bounds</p>
        </div>
      </div>
      <div className="relative flex-1 flex items-center justify-center overflow-hidden py-4">
        <canvas ref={canvasRef} className="block rounded-sm w-full h-full" />
      </div>
    </div>
  );
}

// 3. Telemetry Gauge (SVG animated dial gauge)
export function TelemetryGauge({ value = 75, label = "Average Score" }) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);

  const strokeWidth = 10;
  const radius = 50;
  const circumference = Math.PI * radius; // Half circle (semi-circular gauge)
  const offset = circumference - (animatedValue / 100) * circumference;

  return (
    <div className="border border-hairline bg-canvas p-6 rounded-sm flex flex-col items-center justify-between h-full hover:border-action-blue transition-all duration-300">
      <div className="pb-3 border-b border-hairline w-full self-start">
        <h2 className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
          Recruitment Alignment
        </h2>
        <p className="font-body text-[10px] text-slate mt-0.5">Average fit score telemetry</p>
      </div>

      <div className="relative flex flex-col items-center justify-center py-4 mt-2">
        <svg width="160" height="90" viewBox="0 0 120 70">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff7759" /> {/* Coral */}
              <stop offset="50%" stopColor="#1863dc" /> {/* Action Blue */}
              <stop offset="100%" stopColor="#003c33" /> {/* Deep Green */}
            </linearGradient>
          </defs>
          
          {/* Base Gray Arc */}
          <path
            d="M 10 60 A 50 50 0 0 1 110 60"
            fill="none"
            stroke="#eeece7" // --color-soft-stone
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Active Gradient Filled Arc */}
          <path
            d="M 10 60 A 50 50 0 0 1 110 60"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1.5s ease-out-in" }}
          />
        </svg>

        {/* Center Percentage Display */}
        <div className="absolute top-[52px] text-center">
          <span className="font-mono text-3xl font-bold tracking-tight text-primary">
            {animatedValue}%
          </span>
          <span className="font-mono text-[9px] uppercase tracking-wider text-slate block">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
