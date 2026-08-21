export function Mark({ size = 26, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      className={`flex-none ${className}`}
    >
      <circle cx="24" cy="24" r="22" fill="var(--sky)" opacity="0.55" />
      <path
        d="M24 8 L26.5 18.5 L37 21 L26.5 23.5 L24 34 L21.5 23.5 L11 21 L21.5 18.5 Z"
        fill="var(--blue)"
      />
      <path
        d="M34 12 L35.2 16.8 L40 18 L35.2 19.2 L34 24 L32.8 19.2 L28 18 L32.8 16.8 Z"
        fill="var(--green)"
      />
      <path
        d="M14 30 L15.4 34.6 L20 36 L15.4 37.4 L14 42 L12.6 37.4 L8 36 L12.6 34.6 Z"
        fill="var(--green)"
      />
    </svg>
  );
}
