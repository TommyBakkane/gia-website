'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FlipDigit } from './FlipDigit';
import './Countdown.css';

interface CountdownProps {
  targetDate?: string;
  label?: string;
  title?: string;
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/** Head start between cards, so the board spins up left to right, in ms. */
const ROLL_STAGGER = 120;

const HOUR = 1000 * 60 * 60;
const DAY = HOUR * 24;

const getRemaining = (target: number) => {
  const diff = target - Date.now();

  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / DAY),
    hours: Math.floor((diff % DAY) / HOUR),
  };
};

const formatReleaseDate = (isoDate: string) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(isoDate);

  if (!match) return '';

  const [, year, month, day] = match;

  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
};

const toDigits = (value: number) => String(value).padStart(2, '0').split('');

export const Countdown = ({
  targetDate = '2026-08-28T00:00:00+02:00',
  label = 'New album',
  title = 'You Bound',
}: CountdownProps) => {
  const target = new Date(targetDate).getTime();
  const [remaining, setRemaining] = useState(() => getRemaining(target));

  useEffect(() => {
    setRemaining(getRemaining(target));

    const interval = setInterval(() => {
      setRemaining(getRemaining(target));
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  return (
    <section className="countdown" id="home">
      <div className="countdown-container">
        <div className="countdown-logo">
          <Image
            src="/favicon.svg"
            alt="GIA Logo"
            width={400}
            height={400}
            priority
          />
        </div>

        <div className="countdown-header">
          <p className="countdown-label">{label}</p>
          <h1 className="countdown-title">{title}</h1>
        </div>

        <div className="countdown-content">
          {remaining ? (
            <div className="countdown-clock">
              <div className="countdown-row">
                <div className="countdown-group">
                  {toDigits(remaining.days).map((digit, index) => (
                    <FlipDigit
                      key={`days-${index}`}
                      digit={digit}
                      rollDelay={index * ROLL_STAGGER}
                    />
                  ))}
                </div>
                <span className="countdown-colon">:</span>
                <div className="countdown-group">
                  {toDigits(remaining.hours).map((digit, index) => (
                    <FlipDigit
                      key={`hours-${index}`}
                      digit={digit}
                      rollDelay={(index + 2) * ROLL_STAGGER}
                    />
                  ))}
                </div>
              </div>

              <div className="countdown-units">
                <span className="countdown-unit">Days</span>
                <span className="countdown-unit-spacer" aria-hidden="true" />
                <span className="countdown-unit">Hours</span>
              </div>
            </div>
          ) : (
            <p className="countdown-out-now">Out now</p>
          )}

          <p className="countdown-date">{formatReleaseDate(targetDate)}</p>
        </div>
      </div>
    </section>
  );
};
