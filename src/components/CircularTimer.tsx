const CIRCUMFERENCE = 226;

interface CircularTimerProps {
  timeLeft: number;
  totalTime: number;
}

export function CircularTimer({ timeLeft, totalTime }: CircularTimerProps) {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg className="w-full h-full -rotate-90">
        <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="4" className="text-muted" />
        <circle
          cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="4"
          className="text-primary transition-all duration-1000"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE - (CIRCUMFERENCE * timeLeft) / totalTime}
        />
      </svg>
      <span className="absolute text-2xl font-black">{timeLeft}</span>
    </div>
  );
}
