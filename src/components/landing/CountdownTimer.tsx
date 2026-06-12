import { useEffect, useState } from 'react';

const STORAGE_KEY = 'greencert_launch_deadline';
const FOUR_HOURS_MS = 4 * 60 * 60 * 1000;

function getDeadline(): number {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const deadline = parseInt(stored, 10);
    if (deadline > Date.now()) return deadline;
  }
  const deadline = Date.now() + FOUR_HOURS_MS;
  localStorage.setItem(STORAGE_KEY, String(deadline));
  return deadline;
}

function calcTimeLeft(deadline: number) {
  const diff = Math.max(0, deadline - Date.now());
  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    expired: diff === 0,
  };
}

export default function CountdownTimer() {
  const [deadline] = useState(getDeadline);
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(deadline));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft(deadline)), 1000);
    return () => clearInterval(id);
  }, [deadline]);

  if (timeLeft.expired) {
    return (
      <div className="bg-red-900/40 border border-red-500 rounded-xl px-6 py-3 text-center">
        <p className="text-red-300 font-bold text-sm uppercase tracking-widest">
          Launch Price Has Expired — Price Now R12,497
        </p>
      </div>
    );
  }

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-yellow-400 text-xs font-semibold uppercase tracking-widest">
        ⚡ Launch Discount Expires In
      </p>
      <div className="flex items-center gap-2">
        {[
          { value: pad(timeLeft.hours), label: 'HRS' },
          { value: pad(timeLeft.minutes), label: 'MIN' },
          { value: pad(timeLeft.seconds), label: 'SEC' },
        ].map((unit, i) => (
          <div key={unit.label} className="flex items-center gap-2">
            <div className="bg-gray-900 border border-yellow-500/40 rounded-lg px-4 py-2 min-w-[64px] text-center">
              <span className="text-yellow-400 font-black text-2xl tabular-nums">{unit.value}</span>
              <p className="text-gray-500 text-[10px] font-bold tracking-wider">{unit.label}</p>
            </div>
            {i < 2 && <span className="text-yellow-400 font-black text-xl">:</span>}
          </div>
        ))}
      </div>
      <p className="text-gray-400 text-xs">After timer ends, price returns to R12,497</p>
    </div>
  );
}
