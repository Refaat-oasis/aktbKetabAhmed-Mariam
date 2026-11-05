import React, { useMemo } from 'react';

interface CustomQRCodeSVGProps {
  value: string;
  color?: string;
  className?: string;
}

export const CustomQRCodeSVG: React.FC<CustomQRCodeSVGProps> = ({
  value,
  color = '#111111',
  className = 'w-36 h-36 mx-auto bg-white p-2 rounded-xl shadow-inner border border-black/10'
}) => {
  // Generates a deterministic, crisp QR-style matrix based on the URL string
  const matrix = useMemo(() => {
    const size = 21;
    const grid: boolean[][] = Array(size)
      .fill(false)
      .map(() => Array(size).fill(false));

    const drawFinder = (r0: number, c0: number) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          if (
            r === 0 ||
            r === 6 ||
            c === 0 ||
            c === 6 ||
            (r >= 2 && r <= 4 && c >= 2 && c <= 4)
          ) {
            grid[r0 + r][c0 + c] = true;
          }
        }
      }
    };

    drawFinder(0, 0);
    drawFinder(0, size - 7);
    drawFinder(size - 7, 0);

    // Seed hash from value
    let hash = 2166136261;
    for (let i = 0; i < value.length; i++) {
      hash ^= value.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const inTopLeft = r < 8 && c < 8;
        const inTopRight = r < 8 && c >= size - 8;
        const inBottomLeft = r >= size - 8 && c < 8;
        if (!inTopLeft && !inTopRight && !inBottomLeft) {
          const bit = ((r * 31 + c * 17 + Math.abs(hash)) % 7) < 3;
          grid[r][c] = bit;
        }
      }
    }
    return grid;
  }, [value]);

  return (
    <svg viewBox="0 0 25 25" className={className}>
      {matrix.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          cell ? (
            <rect
              key={`${rIdx}-${cIdx}`}
              x={cIdx + 2}
              y={rIdx + 2}
              width="0.92"
              height="0.92"
              rx="0.2"
              fill={color}
            />
          ) : null
        )
      )}
    </svg>
  );
};

export default CustomQRCodeSVG;

