import React from 'react';

interface BotanicalProps {
  className?: string;
  flip?: boolean;
}

export function BotanicalLeaf({ className = '', flip = false }: BotanicalProps) {
  return (
    <svg
      viewBox="0 0 160 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${flip ? 'scale-x-[-1]' : ''} ${className}`}
      aria-hidden="true"
    >
      <g opacity="0.45" stroke="#7E8769" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Main Stem */}
        <path d="M10 190 C 40 140, 70 80, 140 10" stroke="#687352" strokeWidth="1.5" />
        
        {/* Leaf 1 */}
        <path d="M40 150 C 30 135, 10 135, 20 120 C 35 110, 50 135, 40 150 Z" fill="#8C9672" fillOpacity="0.4" />
        <path d="M40 150 C 30 135, 20 125, 20 120" stroke="#5E6746" />

        {/* Leaf 2 */}
        <path d="M60 130 C 80 120, 95 130, 90 105 C 80 90, 60 115, 60 130 Z" fill="#7D875F" fillOpacity="0.45" />
        <path d="M60 130 C 75 118, 85 110, 90 105" stroke="#5E6746" />

        {/* Leaf 3 */}
        <path d="M75 100 C 60 85, 45 80, 50 65 C 65 60, 80 85, 75 100 Z" fill="#8C9672" fillOpacity="0.38" />
        <path d="M75 100 C 62 85, 52 75, 50 65" stroke="#5E6746" />

        {/* Leaf 4 */}
        <path d="M98 75 C 120 70, 130 80, 135 60 C 125 45, 105 60, 98 75 Z" fill="#76815B" fillOpacity="0.45" />
        <path d="M98 75 C 115 68, 128 62, 135 60" stroke="#5E6746" />

        {/* Top Tip Leaves */}
        <path d="M115 50 C 110 35, 95 28, 105 15 C 120 15, 125 35, 115 50 Z" fill="#86906C" fillOpacity="0.4" />
        <path d="M130 25 C 145 15, 155 8, 150 2 C 140 2, 130 15, 130 25 Z" fill="#717D56" fillOpacity="0.5" />
      </g>
    </svg>
  );
}
