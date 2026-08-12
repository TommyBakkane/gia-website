'use client';

import { useEffect, useState } from 'react';

/** Duration of the two-stage flip, in ms — keep in sync with Countdown.css. */
const FLIP_DURATION = 240;
/** Time between cards during the intro roll — must outlast a single flip. */
const ROLL_STEP = 260;

type Phase = 'waiting' | 'rolling' | 'live';

interface FlipDigitProps {
  digit: string;
  /** Staggers the intro roll so the cards spin up left to right, in ms. */
  rollDelay?: number;
}

/**
 * A single split-flap card. The visible digit lives in two static halves; when
 * it changes, the old top half falls forward and the new bottom half drops in.
 *
 * On mount the card rewinds to zero and climbs one digit at a time to its
 * value, so the board spins up on every load. After that it flips straight to
 * whatever the countdown reports.
 */
export const FlipDigit = ({ digit, rollDelay = 0 }: FlipDigitProps) => {
  const [display, setDisplay] = useState(digit);
  const [previous, setPrevious] = useState(digit);
  /** Bumped on every change so the CSS animations restart. */
  const [flipCount, setFlipCount] = useState(0);
  const [phase, setPhase] = useState<Phase>('waiting');
  const [stepsLeft, setStepsLeft] = useState(0);

  const isFlipping = previous !== display;

  // Rewind to zero once hydrated, then climb back up to the real digit. A zero
  // target rolls all the way round rather than sitting still.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('live');
      return;
    }

    const start = setTimeout(() => {
      setDisplay('0');
      setPrevious('0');
      setStepsLeft(Number(digit) === 0 ? 10 : Number(digit));
      setPhase('rolling');
    }, rollDelay);

    return () => clearTimeout(start);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intro runs once
  }, []);

  // Advance the card: one step at a time while rolling, straight there after.
  useEffect(() => {
    if (phase === 'waiting') return;

    if (phase === 'rolling' && stepsLeft === 0) {
      setPhase('live');
      return;
    }

    if (phase === 'live' && display === digit) return;

    const rolling = phase === 'rolling';
    const next = rolling ? String((Number(display) + 1) % 10) : digit;

    const advance = setTimeout(
      () => {
        setPrevious(display);
        setDisplay(next);
        setFlipCount((count) => count + 1);
        if (rolling) setStepsLeft((steps) => steps - 1);
      },
      rolling ? ROLL_STEP : 0,
    );

    return () => clearTimeout(advance);
  }, [phase, stepsLeft, display, digit]);

  // Settle the bottom half onto the new digit once the flip has landed.
  useEffect(() => {
    if (!isFlipping) return;

    const settle = setTimeout(() => setPrevious(display), FLIP_DURATION);

    return () => clearTimeout(settle);
  }, [isFlipping, display]);

  return (
    <span className="flip-card">
      <span className="flip-half flip-half-top">
        <span className="flip-glyph" suppressHydrationWarning>
          {display}
        </span>
      </span>
      <span className="flip-half flip-half-bottom">
        {/* holds the old digit until the falling flap lands on it */}
        <span className="flip-glyph" suppressHydrationWarning>
          {isFlipping ? previous : display}
        </span>
      </span>

      {isFlipping && (
        <>
          <span key={`fall-${flipCount}`} className="flip-flap flip-flap-top">
            <span className="flip-glyph">{previous}</span>
          </span>
          <span
            key={`land-${flipCount}`}
            className="flip-flap flip-flap-bottom"
          >
            <span className="flip-glyph">{display}</span>
          </span>
        </>
      )}
    </span>
  );
};
